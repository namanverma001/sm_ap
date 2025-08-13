import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Upload, Image, Video } from "lucide-react";

export const UploadMovie = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState([5]);

  return (
    <div className="p-6 flex flex-col items-center min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-cms-primary mb-2">Upload New Movie</h1>
        <p className="text-cms-text-secondary">Add a new movie to your content library</p>
      </div>

      <div className="w-full max-w-4xl">
        <Card className="cms-card">
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-cms-primary font-medium mb-2">Title</label>
              <Input
                placeholder="Enter movie title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="cms-input"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-cms-primary font-medium mb-2">Description</label>
              <Textarea
                placeholder="Enter movie description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="cms-input min-h-[120px] resize-none"
              />
            </div>

            {/* File Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Poster Image */}
              <div>
                <label className="block text-cms-primary font-medium mb-2">Poster Image</label>
                <div className="cms-upload-area">
                  <Image className="w-8 h-8 text-cms-primary mb-2" />
                  <p className="text-sm text-cms-text-secondary mb-1">Choose poster image</p>
                  <p className="text-xs text-cms-text-muted">PNG, JPG, WEBP up to 10MB</p>
                  <p className="text-xs text-cms-primary mt-2 cursor-pointer hover:underline">
                    Click to browse or drag & drop
                  </p>
                </div>
              </div>

              {/* Backdrop Image */}
              <div>
                <label className="block text-cms-primary font-medium mb-2">Backdrop Image</label>
                <div className="cms-upload-area">
                  <Image className="w-8 h-8 text-cms-primary mb-2" />
                  <p className="text-sm text-cms-text-secondary mb-1">Choose backdrop image</p>
                  <p className="text-xs text-cms-text-muted">PNG, JPG, WEBP up to 10MB</p>
                  <p className="text-xs text-cms-primary mt-2 cursor-pointer hover:underline">
                    Click to browse or drag & drop
                  </p>
                </div>
              </div>

              {/* Video File */}
              <div>
                <label className="block text-cms-primary font-medium mb-2">Video File</label>
                <div className="cms-upload-area">
                  <Video className="w-8 h-8 text-cms-primary mb-2" />
                  <p className="text-sm text-cms-text-secondary mb-1">Choose video file</p>
                  <p className="text-xs text-cms-text-muted">MP4, AVI, MOV, WEBM up to 500MB</p>
                  <p className="text-xs text-cms-primary mt-2 cursor-pointer hover:underline">
                    Click to browse or drag & drop
                  </p>
                </div>
              </div>
            </div>

            {/* Duration and Release Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cms-primary font-medium mb-2">Duration (minutes)</label>
                <Input
                  placeholder="e.g., 120"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="cms-input"
                />
              </div>
              <div>
                <label className="block text-cms-primary font-medium mb-2">Release Year</label>
                <Input
                  placeholder="e.g., 2024"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                  className="cms-input"
                />
              </div>
            </div>

            {/* Rating Slider */}
            <div>
              <label className="block text-cms-primary font-medium mb-3">
                Average Rating (1-5)
              </label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  max={5}
                  min={1}
                  step={0.1}
                  className="flex-1"
                />
                <div className="flex items-center space-x-1 min-w-[60px]">
                  <Star className="w-4 h-4 text-cms-primary fill-current" />
                  <span className="text-cms-primary font-medium">{rating[0]}</span>
                </div>
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-cms-primary font-medium mb-2">Watch Age Rating</label>
                <Select>
                  <SelectTrigger className="cms-select">
                    <SelectValue placeholder="Select Age Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g">G</SelectItem>
                    <SelectItem value="pg">PG</SelectItem>
                    <SelectItem value="pg13">PG-13</SelectItem>
                    <SelectItem value="r">R</SelectItem>
                    <SelectItem value="nc17">NC-17</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-cms-primary font-medium mb-2">Genre Category</label>
                <Select>
                  <SelectTrigger className="cms-select">
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="thriller">Thriller</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-cms-primary font-medium mb-2">Category</label>
                <Select>
                  <SelectTrigger className="cms-select">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theatrical">Theatrical</SelectItem>
                    <SelectItem value="streaming">Streaming</SelectItem>
                    <SelectItem value="dvd">DVD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button className="w-full cms-button">
              <Upload className="w-4 h-4 mr-2" />
              Upload Movie
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};