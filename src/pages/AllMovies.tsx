import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Clock, Plus, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const AllMovies = () => {
  const navigate = useNavigate();
  const movies = [
    {
      id: 1,
      title: "Epic Adventure: The Full Movie",
      description: "The complete thrilling journey.",
      genre: "Action",
      year: 2023,
      rating: 8.7,
      duration: 120,
      poster: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Laugh Out Loud: The Feature",
      description: "The full-length comedy.",
      genre: "Comedy",
      year: 2022,
      rating: 7.5,
      duration: 95,
      poster: "/placeholder.svg"
    }
  ];

  return (
    <div className="p-6">
      {/* Header with Upload Movies Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">All Movies</h1>
          <p className="text-gray-400">Manage your movie collection</p>
        </div>
        <Button
          type="button"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 cursor-pointer"
          onClick={() => navigate('/upload-content?type=movie')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Movies
        </Button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="relative overflow-hidden rounded-lg bg-[#1c2632] border border-[#364253]">
            {/* Movie Thumbnail */}
            <div className="aspect-video w-full overflow-hidden bg-[#242f3d]">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Rating and Duration */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-200">{movie.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration} mins</span>
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="text-lg font-semibold text-gray-200 mb-2">{movie.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{movie.description}</p>

              {/* Genre and Year */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-400 text-sm">Genre: {movie.genre}</span>
                <span className="text-gray-400 text-sm">{movie.year}</span>
              </div>

              {/* View Details Button */}
              <Button
                className="w-full bg-[#363f4c] hover:bg-[#4a5563] text-gray-200"
                variant="secondary"
                onClick={() => navigate(`/movie/${movie.id}/details`)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};