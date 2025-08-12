import { Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MovieCardProps {
    title: string;
    description: string;
    rating: number;
    duration: number;
    genre: string;
    year: string;
    imageUrl: string;
    id: string;
}

export const MovieCard = ({
    title,
    description,
    rating,
    duration,
    genre,
    year,
    imageUrl,
    id
}: MovieCardProps) => {
    return (
        <div className="relative overflow-hidden rounded-lg bg-[#1c2632] border border-[#364253]">
            {/* Movie Thumbnail */}
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Rating and Duration */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-200">{rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{duration} mins</span>
                    </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg font-semibold text-gray-200 mb-2">{title}</h3>
                <p className="text-sm text-gray-400 mb-3">{description}</p>

                {/* Genre and Year */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-400 text-sm">Genre: {genre}</span>
                    <span className="text-gray-400 text-sm">{year}</span>
                </div>

                {/* View Details Button */}
                <Link to={`/movie/${id}/details`}>
                    <Button
                        className="w-full bg-[#363f4c] hover:bg-[#4a5563] text-gray-200"
                        variant="secondary"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};
