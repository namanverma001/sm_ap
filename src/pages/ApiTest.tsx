import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Play, Book, Film, Clock, Database, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ApiEndpoint {
    name: string;
    status: "ready" | "failed" | "unavailable";
    count: number;
    endpoint: string;
    error?: string;
}

interface SystemStatus {
    apiBaseUrl: {
        status: "connected" | "disconnected";
    };
    authentication: {
        status: "available" | "unavailable";
    };
    contentManagement: {
        status: "operational" | "down";
    };
    settings: {
        status: "operational" | "down";
    };
}

export const ApiTest = () => {
    const navigate = useNavigate();
    const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([
        {
            name: "Authentication",
            status: "unavailable",
            count: 0,
            endpoint: "POST /api/v1/auth/sign-in",
            error: "Auth endpoint temporarily not found (404)"
        },
        {
            name: "Movies",
            status: "ready",
            count: 0,
            endpoint: "GET/POST /api/v1/admin/movies",
        },
        {
            name: "Series",
            status: "ready",
            count: 0,
            endpoint: "GET/POST /api/v1/admin/series",
        },
        {
            name: "Episodes",
            status: "ready",
            count: 0,
            endpoint: "GET/POST /api/v1/admin/episodes",
        },
        {
            name: "Trailers",
            status: "failed",
            count: 0,
            endpoint: "GET /api/v1/admin/trailers",
            error: "Network error - please check your internet connection"
        },
        {
            name: "Categories",
            status: "ready",
            count: 0,
            endpoint: "GET/POST /api/v1/admin/categories"
        },
        {
            name: "Genres",
            status: "ready",
            count: 0,
            endpoint: "GET/POST /api/v1/admin/genres"
        },
        {
            name: "Age Ratings",
            status: "ready",
            count: 0,
            endpoint: "GET /api/v1/admin/age"
        }
    ]); const [systemStatus, setSystemStatus] = useState<SystemStatus>({
        apiBaseUrl: { status: "connected" },
        authentication: { status: "unavailable" },
        contentManagement: { status: "operational" },
        settings: { status: "operational" }
    });

    // Function to test authentication endpoint
    const testEndpoint = async (name: string) => {
        try {
            // Simulating API call with loading state
            setEndpoints(prev => prev.map(ep =>
                ep.name === name
                    ? { ...ep, status: "unavailable", error: "Testing endpoint..." }
                    : ep
            ));

            // Simulate API request
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Randomly succeed or fail for demonstration
            const success = Math.random() > 0.3;

            if (success) {
                setEndpoints(prev => prev.map(ep =>
                    ep.name === name
                        ? {
                            ...ep,
                            status: "ready",
                            error: undefined,
                            count: Math.floor(Math.random() * 50) + 1 // Random count between 1-50
                        }
                        : ep
                ));

                if (name === "Authentication") {
                    setSystemStatus(prev => ({
                        ...prev,
                        authentication: { status: "available" }
                    }));
                }
            } else {
                throw new Error(`${name} endpoint test failed`);
            }
        } catch (error) {
            setEndpoints(prev => prev.map(ep =>
                ep.name === name
                    ? { ...ep, status: "failed", error: error.message || `${name} test failed` }
                    : ep
            ));

            if (name === "Authentication") {
                setSystemStatus(prev => ({
                    ...prev,
                    authentication: { status: "unavailable" }
                }));
            }
        }
    };

    // Function to test category CRUD operations
    const testCategoryCRUD = async () => {
        try {
            // Simulating API calls for Category CRUD operations
            const operations = ['CREATE', 'READ', 'UPDATE', 'DELETE'];
            for (const op of operations) {
                // Simulated delay to show progress
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            setEndpoints(prev => prev.map(ep =>
                ep.name === "Categories"
                    ? { ...ep, count: 4, status: "ready" }
                    : ep
            ));
        } catch (error) {
            setEndpoints(prev => prev.map(ep =>
                ep.name === "Categories"
                    ? { ...ep, status: "failed", error: "CRUD operations failed" }
                    : ep
            ));
        }
    };

    // Function to test genre CRUD operations
    const testGenreCRUD = async () => {
        try {
            const operations = ['CREATE', 'READ', 'UPDATE', 'DELETE'];
            for (const op of operations) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            setEndpoints(prev => prev.map(ep =>
                ep.name === "Genres"
                    ? { ...ep, count: 6, status: "ready" }
                    : ep
            ));
        } catch (error) {
            setEndpoints(prev => prev.map(ep =>
                ep.name === "Genres"
                    ? { ...ep, status: "failed", error: "CRUD operations failed" }
                    : ep
            ));
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "ready":
            case "operational":
            case "connected":
            case "available":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "failed":
            case "down":
            case "disconnected":
            case "unavailable":
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
        }
    };

    const getEndpointIcon = (name: string) => {
        switch (name) {
            case "Authentication":
                return <User className="w-5 h-5" />;
            case "Movies":
                return <Film className="w-5 h-5" />;
            case "Series":
                return <Play className="w-5 h-5" />;
            case "Episodes":
                return <Database className="w-5 h-5" />;
            case "Trailers":
                return <Play className="w-5 h-5" />;
            case "Categories":
                return <Book className="w-5 h-5" />;
            case "Genres":
                return <Film className="w-5 h-5" />;
            case "Age Ratings":
                return <Clock className="w-5 h-5" />;
            default:
                return <AlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <div className="relative z-0 p-6">
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-yellow-400 mb-2">API Integration Dashboard</h1>
                    <p className="text-gray-400">Monitor and test API connections to Global Network backend</p>
                </div>
                <Button
                    variant="outline"
                    className="border-[#364253] text-gray-200 hover:bg-[#1c2632]"
                    onClick={() => navigate('/browse')}
                >
                    Back to Browse Content
                </Button>
            </div>

            {/* API Endpoints Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {endpoints.map((endpoint) => (
                    <Card
                        key={endpoint.name}
                        className="relative z-20 p-6 bg-[#1c2632] border-[#364253]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                {getEndpointIcon(endpoint.name)}
                                <h3 className="text-lg font-semibold text-yellow-400">{endpoint.name}</h3>
                            </div>
                            {getStatusIcon(endpoint.status)}
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className={endpoint.status === "ready" ? "text-green-500" : "text-red-500"}>
                                    {endpoint.status === "ready" ? "Ready" : endpoint.status === "failed" ? "Failed" : "Unavailable"}
                                </span>
                            </div>
                            {endpoint.count > 0 && (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Count:</span>
                                    <span className="text-gray-200">{endpoint.count} {endpoint.name.toLowerCase()}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Endpoint:</span>
                                <span className="text-gray-200">{endpoint.endpoint}</span>
                            </div>
                        </div>

                        {endpoint.error && (
                            <div className="text-red-400 text-sm mb-4">
                                Error: {endpoint.error}
                            </div>
                        )}

                        <Button
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                            onClick={() => testEndpoint(endpoint.name)}
                        >
                            {endpoint.name === "Authentication" ? "Test Auth" :
                                endpoint.name === "Categories" ? "Test Category CRUD" :
                                    endpoint.name === "Genres" ? "Test Genre CRUD" :
                                        `Test ${endpoint.name}`}
                        </Button>
                    </Card>
                ))}
            </div>

            {/* System Status */}
            <Card className="relative z-20 p-6 bg-[#1c2632] border-[#364253]">
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">System Status</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">API Base URL:</span>
                        <div className="flex items-center space-x-2">
                            <span className={systemStatus.apiBaseUrl.status === "connected" ? "text-green-500" : "text-red-500"}>
                                {systemStatus.apiBaseUrl.status === "connected" ? "Connected" : "Disconnected"}
                            </span>
                            {getStatusIcon(systemStatus.apiBaseUrl.status)}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Authentication:</span>
                        <div className="flex items-center space-x-2">
                            <span className={systemStatus.authentication.status === "available" ? "text-green-500" : "text-red-500"}>
                                {systemStatus.authentication.status === "available" ? "Available" : "Endpoint Unavailable"}
                            </span>
                            {getStatusIcon(systemStatus.authentication.status)}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Content Management:</span>
                        <div className="flex items-center space-x-2">
                            <span className={systemStatus.contentManagement.status === "operational" ? "text-green-500" : "text-red-500"}>
                                {systemStatus.contentManagement.status === "operational" ? "Operational" : "Down"}
                            </span>
                            {getStatusIcon(systemStatus.contentManagement.status)}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Settings:</span>
                        <div className="flex items-center space-x-2">
                            <span className={systemStatus.settings.status === "operational" ? "text-green-500" : "text-red-500"}>
                                {systemStatus.settings.status === "operational" ? "Operational" : "Down"}
                            </span>
                            {getStatusIcon(systemStatus.settings.status)}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
