import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Clock, Plus } from "lucide-react";

export const AllMovies = () => {
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-cms-primary mb-2">All Movies</h1>
          <p className="text-cms-text-secondary">Manage your movie collection</p>
        </div>
        <Button className="cms-button">
          <Plus className="w-4 h-4 mr-2" />
          Upload New Movie
        </Button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Card key={movie.id} className="cms-card group hover:scale-105 transition-transform duration-300">
            <div className="aspect-[2/3] bg-cms-card-muted rounded-lg mb-4 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-cms-card-muted to-cms-card-muted/50 flex items-center justify-center">
                <div className="text-cms-text-muted">Movie Poster</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {/* Rating and Duration */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-cms-primary fill-current" />
                  <span className="text-cms-primary font-medium">{movie.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-cms-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration} mins</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-cms-text text-lg leading-tight line-clamp-2">
                {movie.title}
              </h3>

              {/* Description */}
              <p className="text-cms-text-secondary text-sm line-clamp-2">
                {movie.description}
              </p>

              {/* Genre and Year */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-cms-primary font-medium">Genre: {movie.genre}</span>
                <span className="text-cms-text-secondary">{movie.year}</span>
              </div>

              {/* View Details Button */}
              <Button 
                variant="outline" 
                className="w-full cms-button-outline mt-4 group-hover:bg-cms-primary group-hover:text-black group-hover:border-cms-primary transition-colors"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};