import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Save, Image, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AddSeries = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [totalSeasons, setTotalSeasons] = useState("1");
    const [releaseYear, setReleaseYear] = useState("2025");
    const [rating, setRating] = useState([5]);

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
                    <h1 className="text-3xl font-bold text-yellow-400 mb-2">Add New Series</h1>
                    <p className="text-gray-400">Create a new TV series in your collection</p>
                </div>
            </div>

            {/* Form */}
            <form className="relative z-20 space-y-6 bg-opacity-95">
                {/* Title */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-2">Series Title *</label>
                    <Input
                        placeholder="Enter series title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-[#1c2632] border-[#364253] text-gray-200"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-2">Description *</label>
                    <Textarea
                        placeholder="Enter series description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-[#1c2632] border-[#364253] text-gray-200 min-h-[120px]"
                    />
                </div>

                {/* Image Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Poster Image */}
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Poster Image</label>
                        <div className="border-2 border-dashed border-[#364253] rounded-lg p-6 text-center bg-[#1c2632]">
                            <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-300 mb-1">Choose poster image</p>
                            <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                            <p className="text-xs text-yellow-400 mt-2 cursor-pointer hover:underline">
                                Click to browse or drag & drop
                            </p>
                        </div>
                    </div>

                    {/* Backdrop Image */}
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Backdrop Image</label>
                        <div className="border-2 border-dashed border-[#364253] rounded-lg p-6 text-center bg-[#1c2632]">
                            <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-300 mb-1">Choose backdrop image</p>
                            <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                            <p className="text-xs text-yellow-400 mt-2 cursor-pointer hover:underline">
                                Click to browse or drag & drop
                            </p>
                        </div>
                    </div>
                </div>

                {/* Total Seasons and Release Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Total Seasons</label>
                        <Input
                            type="number"
                            placeholder="e.g., 1"
                            value={totalSeasons}
                            onChange={(e) => setTotalSeasons(e.target.value)}
                            className="bg-[#1c2632] border-[#364253] text-gray-200"
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Release Year</label>
                        <Input
                            type="number"
                            placeholder="e.g., 2025"
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value)}
                            className="bg-[#1c2632] border-[#364253] text-gray-200"
                        />
                    </div>
                </div>

                {/* Rating Slider */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-3">
                        Average Rating (1-10)
                    </label>
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

                {/* Dropdowns */}
                <div className="relative z-30 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative z-30">
                        <label className="block text-yellow-400 font-medium mb-2">Genre *</label>
                        <Select>
                            <SelectTrigger className="relative z-30 bg-[#1c2632] border-[#364253] text-gray-200">
                                <SelectValue placeholder="Select Genre" />
                            </SelectTrigger>
                            <SelectContent className="relative z-50 bg-[#1c2632] border-[#364253]">
                                <SelectItem value="drama">Drama</SelectItem>
                                <SelectItem value="comedy">Comedy</SelectItem>
                                <SelectItem value="action">Action</SelectItem>
                                <SelectItem value="horror">Horror</SelectItem>
                                <SelectItem value="thriller">Thriller</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Age Rating</label>
                        <Select>
                            <SelectTrigger className="bg-[#1c2632] border-[#364253] text-gray-200">
                                <SelectValue placeholder="Select Age Rating" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c2632] border-[#364253]">
                                <SelectItem value="g">G</SelectItem>
                                <SelectItem value="pg">PG</SelectItem>
                                <SelectItem value="pg13">PG-13</SelectItem>
                                <SelectItem value="r">R</SelectItem>
                                <SelectItem value="nc17">NC-17</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-yellow-400 font-medium mb-2">Status</label>
                        <Select>
                            <SelectTrigger className="bg-[#1c2632] border-[#364253] text-gray-200">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c2632] border-[#364253]">
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Network */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-2">Network</label>
                    <Input
                        placeholder="e.g., Netflix, HBO"
                        className="bg-[#1c2632] border-[#364253] text-gray-200"
                    />
                </div>

                {/* Creator */}
                <div>
                    <label className="block text-yellow-400 font-medium mb-2">Creator</label>
                    <Input
                        placeholder="Series creator"
                        className="bg-[#1c2632] border-[#364253] text-gray-200"
                    />
                </div>

                {/* Submit Button */}
                <div className="relative z-10 flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="relative z-10 border-[#364253] text-gray-200 hover:bg-[#364253]"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="relative z-10 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        onClick={(e) => {
                            e.preventDefault();
                            // Add your form submission logic here
                        }}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Create Series
                    </Button>
                </div>
            </form>
        </div>
    );
};
