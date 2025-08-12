import { useState } from "react";
import { Music, Plus, Pencil, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Genre {
    id: string;
    name: string;
}

export const Genres = () => {
    const [genres, setGenres] = useState<Genre[]>([
        { id: "1", name: "Romance" },
        { id: "2", name: "Mystery" },
        { id: "3", name: "Fantasy" },
        { id: "4", name: "Thriller" },
        { id: "5", name: "Adventure" },
        { id: "6", name: "Historical" },
    ]);

    const [newGenre, setNewGenre] = useState("");
    const [editingGenre, setEditingGenre] = useState<Genre | null>(null);

    // Add new genre
    const handleAddGenre = () => {
        if (newGenre.trim()) {
            if (editingGenre) {
                // Update existing genre
                setGenres(genres.map(genre =>
                    genre.id === editingGenre.id
                        ? { ...genre, name: newGenre }
                        : genre
                ));
                setEditingGenre(null);
            } else {
                // Add new genre
                const newGenreItem: Genre = {
                    id: (genres.length + 1).toString(),
                    name: newGenre,
                };
                setGenres([...genres, newGenreItem]);
            }
            setNewGenre("");
        }
    };

    // Start editing genre
    const handleEditGenre = (genre: Genre) => {
        setEditingGenre(genre);
        setNewGenre(genre.name);
    };

    // Delete genre
    const handleDeleteGenre = (id: string) => {
        setGenres(genres.filter(genre => genre.id !== id));
    };

    return (
        <div className="relative z-0 p-6">
            {/* Header */}
            <div className="relative z-10 flex items-center justify-center mb-8">
                <div className="text-center">
                    <div className="relative z-10 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Music className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="relative z-10 text-4xl font-bold text-yellow-400 mb-2">Add Genres</h1>
                    <p className="relative z-10 text-gray-400">Organize content by genres and themes</p>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add New Genre Section */}
                <Card className="relative z-20 p-6 bg-[#1c2632] border-[#364253]">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Genre
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-yellow-400 font-medium mb-2">Genre Name</label>
                            <Input
                                placeholder="e.g., Romance, Mystery, Fantasy"
                                value={newGenre}
                                onChange={(e) => setNewGenre(e.target.value)}
                                className="bg-[#131920] border-[#364253] text-gray-200"
                            />
                        </div>

                        <Button
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                            onClick={handleAddGenre}
                        >
                            {editingGenre ? (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Update Genre
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Genre
                                </>
                            )}
                        </Button>
                    </div>
                </Card>

                {/* Existing Genres Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                        <Music className="w-5 h-5 mr-2" />
                        Existing Genres
                    </h2>

                    <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {genres.map((genre) => (
                            <Card
                                key={genre.id}
                                className="group relative bg-[#1c2632] border-[#364253] p-4 hover:bg-[#1c2632]/80"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-yellow-400 font-semibold">{genre.name}</h3>
                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-yellow-400 hover:text-yellow-500 hover:bg-[#131920]"
                                            onClick={() => handleEditGenre(genre)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-400 hover:text-red-500 hover:bg-[#131920]"
                                            onClick={() => handleDeleteGenre(genre.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Total Genres */}
                    <Card className="relative z-20 p-4 bg-[#1c2632] border-[#364253]">
                        <h3 className="text-gray-400">Total Genres</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl font-bold text-yellow-400">{genres.length}</span>
                            <span className="text-gray-400 text-sm">Manage content genres</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
