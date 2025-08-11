import { useState } from "react";
import { Upload, Image, Video, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export const UploadTrailer = () => {
  const [rating, setRating] = useState([5]);

  return (
    <div className="p-6 flex flex-col items-center min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-cms-primary mb-2">Upload New Trailer</h1>
        <p className="text-cms-text-secondary">Add a new trailer to your content library</p>
      </div>

      <div className="w-full max-w-4xl">
        <Card className="cms-card">
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-cms-primary mb-2">Title</label>
              <Input
                placeholder="Enter trailer title"
                className="cms-input"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-cms-primary mb-2">Description</label>
              <Textarea
                placeholder="Enter trailer description"
                className="cms-input min-h-[120px] resize-none"
              />
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Poster Image */}
              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Poster Image</label>
                <div className="border-2 border-dashed border-cms-border rounded-lg p-6 text-center hover:border-cms-primary transition-colors cursor-pointer">
                  <Image className="w-8 h-8 text-cms-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-cms-text-primary mb-1">Choose poster image</div>
                  <div className="text-xs text-cms-text-muted">PNG, JPG up to 10MB</div>
                  <div className="text-xs text-cms-text-muted">Click to browse or drag & drop</div>
                </div>
              </div>

              {/* Backdrop Image */}
              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Backdrop Image</label>
                <div className="border-2 border-dashed border-cms-border rounded-lg p-6 text-center hover:border-cms-primary transition-colors cursor-pointer">
                  <Image className="w-8 h-8 text-cms-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-cms-text-primary mb-1">Choose backdrop image</div>
                  <div className="text-xs text-cms-text-muted">PNG, JPG up to 10MB</div>
                  <div className="text-xs text-cms-text-muted">Click to browse or drag & drop</div>
                </div>
              </div>

              {/* Video File */}
              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Video File</label>
                <div className="border-2 border-dashed border-cms-border rounded-lg p-6 text-center hover:border-cms-primary transition-colors cursor-pointer">
                  <Video className="w-8 h-8 text-cms-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-cms-text-primary mb-1">Choose video file</div>
                  <div className="text-xs text-cms-text-muted">MP4, MOV, AVI up to 500MB</div>
                  <div className="text-xs text-cms-text-muted">Click to browse or drag & drop</div>
                </div>
              </div>
            </div>

            {/* Duration and Created At */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Duration (minutes)</label>
                <Input
                  placeholder="e.g. 2.5"
                  className="cms-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Created At</label>
                <Input
                  placeholder="dd-mm-yyyy"
                  className="cms-input"
                />
              </div>
            </div>

            {/* Rating Slider */}
            <div>
              <label className="block text-sm font-medium text-cms-primary mb-2">
                Average Rating (1-10)
              </label>
              <div className="px-3">
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  max={10}
                  min={1}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-cms-text-muted mt-1">
                  <span>1</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-cms-primary text-cms-primary" />
                    {rating[0]}
                  </span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Selects */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Watch Age Rating</label>
                <Select>
                  <SelectTrigger className="cms-input">
                    <SelectValue placeholder="Select Age Rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-cms-surface border-cms-border">
                    <SelectItem value="g">G</SelectItem>
                    <SelectItem value="pg">PG</SelectItem>
                    <SelectItem value="pg13">PG-13</SelectItem>
                    <SelectItem value="r">R</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Genre Category</label>
                <Select>
                  <SelectTrigger className="cms-input">
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-cms-surface border-cms-border">
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Content Type</label>
                <Select>
                  <SelectTrigger className="cms-input">
                    <SelectValue placeholder="Select Content Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-cms-surface border-cms-border">
                    <SelectItem value="trailer">Trailer</SelectItem>
                    <SelectItem value="teaser">Teaser</SelectItem>
                    <SelectItem value="behind-scenes">Behind the Scenes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-cms-primary mb-2">Release Type</label>
                <Select>
                  <SelectTrigger className="cms-input">
                    <SelectValue placeholder="Select Release Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-cms-surface border-cms-border">
                    <SelectItem value="theatrical">Theatrical</SelectItem>
                    <SelectItem value="streaming">Streaming</SelectItem>
                    <SelectItem value="dvd">DVD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button className="w-full cms-button-primary">
              <Upload className="w-5 h-5 mr-2" />
              Upload Trailer
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};