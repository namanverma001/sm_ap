import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Save, Image, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AddCollection = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [collectionType, setCollectionType] = useState("");
    const [totalMovies, setTotalMovies] = useState("0");
    const [startYear, setStartYear] = useState("2025");
    const [rating, setRating] = useState([5]);
    const [genre, setGenre] = useState("");
    const [ageRating, setAgeRating] = useState("");
    const [studio, setStudio] = useState("");
    const [tags, setTags] = useState("");

    return (
        <div className="relative z-0 p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="relative z-10 flex items-center mb-6">
                <Button
                    variant="ghost"
                    className="relative z-10 mr-4 text-gray-400 hover:text-yellow-400"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-yellow-400 mb-2">Add New Collection</h1>
                    <p className="text-gray-400">Create a new movie collection</p>
                </div>
            </div>

            {/* Form */}
            <form className="relative z-20 space-y-6 bg-opacity-95">
                {/* Title */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-2">Collection Title *</label>
                    <Input
                        placeholder="Enter collection title (e.g., Marvel Cinematic Universe)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-[#1c2632] border-[#364253] text-gray-200"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-2">Description *</label>
                    <div className="relative">
                        <Textarea
                            placeholder="Enter collection description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-[#1c2632] border-[#364253] text-gray-200 min-h-[120px]"
                        />
                        {!description && (
                            <div className="absolute top-2 right-2 flex items-center text-yellow-400">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-xs">Please fill out this field.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Collection Poster and Backdrop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Collection Poster</label>
                        <div className="relative z-10 border-2 border-dashed border-[#364253] rounded-lg p-6 text-center bg-[#1c2632]">
                            <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-300 mb-1">Choose collection poster</p>
                            <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                            <p className="text-xs text-yellow-400 mt-2 cursor-pointer hover:underline">
                                Click to browse or drag & drop
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Backdrop Image</label>
                        <div className="relative z-10 border-2 border-dashed border-[#364253] rounded-lg p-6 text-center bg-[#1c2632]">
                            <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-300 mb-1">Choose backdrop image</p>
                            <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                            <p className="text-xs text-yellow-400 mt-2 cursor-pointer hover:underline">
                                Click to browse or drag & drop
                            </p>
                        </div>
                    </div>
                </div>

                {/* Collection Type, Total Movies, and Start Year */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Collection Type *</label>
                        <Select value={collectionType} onValueChange={setCollectionType}>
                            <SelectTrigger className="bg-[#1c2632] border-[#364253] text-gray-200">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c2632] border-[#364253]">
                                <SelectItem value="movie">Movie</SelectItem>
                                <SelectItem value="series">Series</SelectItem>
                                <SelectItem value="mixed">Mixed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Total Movies</label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={totalMovies}
                            onChange={(e) => setTotalMovies(e.target.value)}
                            className="bg-[#1c2632] border-[#364253] text-gray-200"
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Start Year</label>
                        <Input
                            type="number"
                            placeholder="e.g., 2025"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            className="bg-[#1c2632] border-[#364253] text-gray-200"
                        />
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-2">Average Rating (1-10)</label>
                    <div className="flex items-center space-x-4">
                        <Slider
                            value={rating}
                            onValueChange={setRating}
                            max={10}
                            min={1}
                            step={0.1}
                            className="flex-1"
                        />
                        <div className="flex items-center space-x-1 min-w-[60px]">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-gray-200 font-medium">{rating[0]}</span>
                        </div>
                    </div>
                </div>

                {/* Genre, Age Rating, and Studio */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Primary Genre</label>
                        <Select value={genre} onValueChange={setGenre}>
                            <SelectTrigger className="bg-[#1c2632] border-[#364253] text-gray-200">
                                <SelectValue placeholder="Select Genre" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c2632] border-[#364253]">
                                <SelectItem value="action">Action</SelectItem>
                                <SelectItem value="adventure">Adventure</SelectItem>
                                <SelectItem value="comedy">Comedy</SelectItem>
                                <SelectItem value="drama">Drama</SelectItem>
                                <SelectItem value="horror">Horror</SelectItem>
                                <SelectItem value="thriller">Thriller</SelectItem>
                                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                                <SelectItem value="fantasy">Fantasy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Age Rating</label>
                        <Select value={ageRating} onValueChange={setAgeRating}>
                            <SelectTrigger className="bg-[#1c2632] border-[#364253] text-gray-200">
                                <SelectValue placeholder="Select Rating" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c2632] border-[#364253]">
                                <SelectItem value="G">G</SelectItem>
                                <SelectItem value="PG">PG</SelectItem>
                                <SelectItem value="PG-13">PG-13</SelectItem>
                                <SelectItem value="R">R</SelectItem>
                                <SelectItem value="NC-17">NC-17</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Studio/Publisher</label>
                        <Input
                            placeholder="e.g., Marvel Studios, Disney"
                            value={studio}
                            onChange={(e) => setStudio(e.target.value)}
                            className="bg-[#1c2632] border-[#364253] text-gray-200"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-2">Tags</label>
                    <Input
                        placeholder="Enter tags separated by commas (e.g., superhero, action, blockbuster)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="bg-[#1c2632] border-[#364253] text-gray-200"
                    />
                    <p className="text-xs text-gray-400 mt-1">Separate multiple tags with commas</p>
                </div>

                {/* Submit Buttons */}
                <div className="relative z-10 flex justify-end space-x-4 mt-8">
                    <Button
                        type="button"
                        variant="outline"
                        className="relative z-10 border-[#364253] text-gray-200 hover:bg-[#364253]"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="relative z-10 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        onClick={(e) => {
                            e.preventDefault();
                            // Validate required fields
                            if (!title || !description || !collectionType) {
                                // Show error message
                                return;
                            }
                            // Add your form submission logic here
                        }}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Create Collection
                    </Button>
                </div>
            </form>
        </div>
    );
};
