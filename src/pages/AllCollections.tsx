import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Plus } from "lucide-react";

export const AllCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Marvel Cinematic Universe",
      description: "The complete MCU collection",
      year: 2023,
      rating: 8.9,
      movieCount: 30,
      poster: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Star Wars Saga",
      description: "All Star Wars movies",
      year: 2023,
      rating: 8.5,
      movieCount: 12,
      poster: "/placeholder.svg"
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-cms-primary mb-2">All Collections</h1>
          <p className="text-cms-text-secondary">Manage your movie collections</p>
        </div>
        <Button className="cms-button">
          <Plus className="w-4 h-4 mr-2" />
          Add New Collection
        </Button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collections.map((collection) => (
          <Card key={collection.id} className="cms-card group hover:scale-105 transition-transform duration-300">
            <div className="aspect-[2/3] bg-cms-card-muted rounded-lg mb-4 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-cms-card-muted to-cms-card-muted/50 flex items-center justify-center">
                <div className="text-cms-text-muted">Collection Poster</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {/* Rating and Movie Count */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-cms-primary fill-current" />
                  <span className="text-cms-primary font-medium">{collection.rating}</span>
                </div>
                <div className="text-cms-text-secondary">
                  {collection.movieCount} Movies
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-cms-text text-lg leading-tight line-clamp-2">
                {collection.title}
              </h3>

              {/* Description */}
              <p className="text-cms-text-secondary text-sm line-clamp-2">
                {collection.description}
              </p>

              {/* Year */}
              <div className="text-cms-text-secondary text-sm">
                {collection.year}
              </div>

              {/* View Collection Button */}
              <Button 
                variant="outline" 
                className="w-full cms-button-outline mt-4 group-hover:bg-cms-primary group-hover:text-black group-hover:border-cms-primary transition-colors"
              >
                View Collection
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};