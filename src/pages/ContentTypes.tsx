import { useState } from "react";
import { Monitor, Plus, Pencil, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ContentType {
    id: string;
    name: string;
}

export const ContentTypes = () => {
    const [contentTypes, setContentTypes] = useState<ContentType[]>([
        { id: "1", name: "Movie" },
        { id: "2", name: "TV Series" },
        { id: "3", name: "Documentary" },
        { id: "4", name: "Short Film" },
        { id: "5", name: "Web Series" },
        { id: "6", name: "Animation" },
    ]);

    const [newContentType, setNewContentType] = useState("");
    const [editingContentType, setEditingContentType] = useState<ContentType | null>(null);

    // Add new content type
    const handleAddContentType = () => {
        if (newContentType.trim()) {
            if (editingContentType) {
                // Update existing content type
                setContentTypes(contentTypes.map(type =>
                    type.id === editingContentType.id
                        ? { ...type, name: newContentType }
                        : type
                ));
                setEditingContentType(null);
            } else {
                // Add new content type
                const newType: ContentType = {
                    id: (contentTypes.length + 1).toString(),
                    name: newContentType,
                };
                setContentTypes([...contentTypes, newType]);
            }
            setNewContentType("");
        }
    };

    // Start editing content type
    const handleEditContentType = (contentType: ContentType) => {
        setEditingContentType(contentType);
        setNewContentType(contentType.name);
    };

    // Delete content type
    const handleDeleteContentType = (id: string) => {
        setContentTypes(contentTypes.filter(type => type.id !== id));
    };

    return (
        <div className="relative z-0 p-6">
            {/* Header */}
            <div className="relative z-10 flex items-center justify-center mb-8">
                <div className="text-center">
                    <div className="relative z-10 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Monitor className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="relative z-10 text-4xl font-bold text-yellow-400 mb-2">Add Content Type</h1>
                    <p className="relative z-10 text-gray-400">Manage different types of content and media</p>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add New Content Type Section */}
                <Card className="relative z-20 p-6 bg-[#1c2632] border-[#364253]">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Content Type
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-yellow-400 font-medium mb-2">Content Type Name</label>
                            <Input
                                placeholder="e.g., Movie, TV Series, Podcast"
                                value={newContentType}
                                onChange={(e) => setNewContentType(e.target.value)}
                                className="bg-[#131920] border-[#364253] text-gray-200"
                            />
                        </div>

                        <Button
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                            onClick={handleAddContentType}
                        >
                            {editingContentType ? (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Update Content Type
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Content Type
                                </>
                            )}
                        </Button>
                    </div>
                </Card>

                {/* Existing Content Types Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                        <Monitor className="w-5 h-5 mr-2" />
                        Existing Content Types
                    </h2>

                    <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {contentTypes.map((type) => (
                            <Card
                                key={type.id}
                                className="group relative bg-[#1c2632] border-[#364253] p-4 hover:bg-[#1c2632]/80"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-yellow-400 font-semibold">{type.name}</h3>
                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-yellow-400 hover:text-yellow-500 hover:bg-[#131920]"
                                            onClick={() => handleEditContentType(type)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-400 hover:text-red-500 hover:bg-[#131920]"
                                            onClick={() => handleDeleteContentType(type.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Total Content Types */}
                    <Card className="relative z-20 p-4 bg-[#1c2632] border-[#364253]">
                        <h3 className="text-gray-400">Total Content Types</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl font-bold text-yellow-400">{contentTypes.length}</span>
                            <span className="text-gray-400 text-sm">Manage content classifications</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
