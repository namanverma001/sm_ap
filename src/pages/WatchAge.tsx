import { useState } from "react";
import { Clock, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface AgeRating {
    id: string;
    name: string;
    description: string;
}

export const WatchAge = () => {
    const [ageRatings, setAgeRatings] = useState<AgeRating[]>([
        { id: "1", name: "13+ - Teen and above", description: "Suitable for teenagers and above" },
        { id: "2", name: "16+ - Young adult and above", description: "Young adult content" },
        { id: "3", name: "18+ - Adult content", description: "Mature themes and content" },
        { id: "4", name: "All Ages - Suitable for everyone", description: "Family-friendly content" },
        { id: "5", name: "7+ - Children and above", description: "Suitable for children 7 years and older" },
        { id: "6", name: "21+ - Mature adult content", description: "Explicit content for mature audiences" },
    ]);

    const [newRating, setNewRating] = useState("");
    const [newDescription, setNewDescription] = useState("");

    // Add new age rating
    const handleAddAgeRating = () => {
        if (newRating.trim() && newDescription.trim()) {
            const newAgeRating: AgeRating = {
                id: (ageRatings.length + 1).toString(),
                name: newRating,
                description: newDescription,
            };
            setAgeRatings([...ageRatings, newAgeRating]);
            setNewRating("");
            setNewDescription("");
        }
    };

    // Delete age rating
    const handleDeleteRating = (id: string) => {
        setAgeRatings(ageRatings.filter(rating => rating.id !== id));
    };

    return (
        <div className="relative z-0 p-6">
            {/* Header */}
            <div className="relative z-10 flex items-center justify-center mb-8">
                <div className="text-center">
                    <div className="relative z-10 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="relative z-10 text-4xl font-bold text-yellow-400 mb-2">Add Watch Age</h1>
                    <p className="relative z-10 text-gray-400">Manage age restrictions and content ratings</p>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add New Watch Age Section */}
                <Card className="relative z-20 p-6 bg-[#1c2632] border-[#364253]">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Watch Age
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-yellow-400 font-medium mb-2">Age Rating</label>
                            <Input
                                placeholder="e.g., 13+, 18+, All Ages"
                                value={newRating}
                                onChange={(e) => setNewRating(e.target.value)}
                                className="bg-[#131920] border-[#364253] text-gray-200"
                            />
                        </div>

                        <div>
                            <label className="block text-yellow-400 font-medium mb-2">Description</label>
                            <Textarea
                                placeholder="e.g., Teen and above, Adult content"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="bg-[#131920] border-[#364253] text-gray-200 min-h-[100px]"
                            />
                        </div>

                        <Button
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                            onClick={handleAddAgeRating}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Age Rating
                        </Button>
                    </div>
                </Card>

                {/* Existing Age Ratings Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Existing Age Ratings
                    </h2>

                    <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ageRatings.map((rating) => (
                            <Card
                                key={rating.id}
                                className="group relative bg-[#1c2632] border-[#364253] p-4 hover:bg-[#1c2632]/80"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-yellow-400 font-semibold">{rating.name}</h3>
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-yellow-400 hover:text-yellow-500 hover:bg-[#131920]"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-400 hover:text-red-500 hover:bg-[#131920]"
                                                onClick={() => handleDeleteRating(rating.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm">{rating.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Total Age Ratings */}
                    <Card className="relative z-20 p-4 bg-[#1c2632] border-[#364253]">
                        <h3 className="text-gray-400 text-sm">Total Age Ratings</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl font-bold text-yellow-400">{ageRatings.length}</span>
                            <span className="text-gray-400 text-sm">Manage content age restrictions</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
