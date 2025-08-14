import { Button } from "@/components/ui/button";
import { Star, Plus, Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const ViewSeries = () => {
    const navigate = useNavigate();
    const series = [
        {
            id: 1,
            title: "Dramatic Twist Series",
            description: "A compelling drama series.",
            genre: "Drama",
            year: 2023,
            rating: 8.5,
            seasons: 2,
            episodes: 24,
            poster: "/placeholder.svg"
        },
        {
            id: 2,
            title: "Horror Anthology",
            description: "A series of chilling horror stories.",
            genre: "Horror",
            year: 2023,
            rating: 7.8,
            seasons: 1,
            episodes: 10,
            poster: "/placeholder.svg"
        }
    ];

    return (
        <div className="p-6">

            {/* Header with Upload Webseries Button */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-yellow-400 mb-2">All Series</h1>
                    <p className="text-gray-400">Manage your TV series collection</p>
                </div>
                <Button
                    type="button"
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 cursor-pointer"
                    onClick={() => navigate('/upload-content?type=webseries')}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Webseries
                </Button>
            </div>

            {/* Series Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {series.map((show) => (
                    <div key={show.id} className="relative overflow-hidden rounded-lg bg-[#1c2632] border border-[#364253]">
                        {/* Series Thumbnail */}
                        <div className="aspect-video w-full overflow-hidden bg-[#242f3d]">
                            <img
                                src={show.poster}
                                alt={show.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* Rating and Seasons */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-gray-200">{show.rating}</span>
                                </div>
                                <div className="text-gray-400">
                                    <span>{show.seasons} Seasons</span>
                                </div>
                            </div>

                            {/* Title and Description */}
                            <h3 className="text-lg font-semibold text-gray-200 mb-2">{show.title}</h3>
                            <p className="text-sm text-gray-400 mb-3">{show.description}</p>

                            {/* Genre and Year */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-yellow-400 text-sm">Genre: {show.genre}</span>
                                <span className="text-gray-400 text-sm">{show.year}</span>
                            </div>

                            {/* Episodes Count */}
                            <div className="text-sm text-gray-400 mb-4">
                                {show.episodes} Episodes • {show.seasons} Seasons
                            </div>

                            {/* View Series Button */}
                            <Button
                                className="w-full bg-[#363f4c] hover:bg-[#4a5563] text-gray-200"
                                variant="secondary"
                                onClick={() => navigate(`/series/${show.id}/details`)}
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                View Series
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
