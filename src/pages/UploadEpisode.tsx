import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Image, Video } from "lucide-react";

import { PageWrapper } from "@/components/PageWrapper";

export const UploadEpisode = () => {
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  return (
    <PageWrapper>
      <div className="flex flex-col items-center">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-cms-primary mb-2">Upload New Episode</h1>
          <p className="text-cms-text-secondary">Add a new episode to your series</p>
        </div>

        <div className="w-full max-w-4xl">
          <Card className="cms-card p-6 border-2 border-cms-border rounded-lg shadow-lg">
            <form className="space-y-6">
              {/* Episode Number and Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cms-primary font-medium mb-2">Episode Number</label>
                  <Input
                    placeholder="e.g., 1"
                    value={episodeNumber}
                    onChange={(e) => setEpisodeNumber(e.target.value)}
                    className="cms-input"
                  />
                </div>
                <div>
                  <label className="block text-cms-primary font-medium mb-2">Episode Title</label>
                  <Input
                    placeholder="e.g., Episode 1: The Pilot"
                    value={episodeTitle}
                    onChange={(e) => setEpisodeTitle(e.target.value)}
                    className="cms-input"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-cms-primary font-medium mb-2">Description</label>
                <Textarea
                  placeholder="Enter episode description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="cms-input min-h-[120px] resize-none"
                />
              </div>

              {/* Series and Season Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cms-primary font-medium mb-2">Series</label>
                  <Select>
                    <SelectTrigger className="cms-select">
                      <SelectValue placeholder="Select Series" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breaking-bad">Breaking Bad</SelectItem>
                      <SelectItem value="stranger-things">Stranger Things</SelectItem>
                      <SelectItem value="the-office">The Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-cms-primary font-medium mb-2">Season</label>
                  <Select>
                    <SelectTrigger className="cms-select">
                      <SelectValue placeholder="Select Season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Season 1</SelectItem>
                      <SelectItem value="2">Season 2</SelectItem>
                      <SelectItem value="3">Season 3</SelectItem>
                      <SelectItem value="4">Season 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Poster Image */}
                <div>
                  <label className="block text-cms-primary font-medium mb-2">Poster Image</label>
                  <div className="cms-upload-area">
                    <Image className="w-8 h-8 text-cms-primary mb-2" />
                    <p className="text-sm text-cms-text-secondary mb-1">Choose File</p>
                    <p className="text-xs text-cms-text-muted">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Backdrop Image */}
                <div>
                  <label className="block text-cms-primary font-medium mb-2">Backdrop Image</label>
                  <div className="cms-upload-area">
                    <Image className="w-8 h-8 text-cms-primary mb-2" />
                    <p className="text-sm text-cms-text-secondary mb-1">Choose File</p>
                    <p className="text-xs text-cms-text-muted">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Video File */}
                <div>
                  <label className="block text-cms-primary font-medium mb-2">Video File</label>
                  <div className="cms-upload-area">
                    <Video className="w-8 h-8 text-cms-primary mb-2" />
                    <p className="text-sm text-cms-text-secondary mb-1">Choose File</p>
                    <p className="text-xs text-cms-text-muted">MP4, MOV up to 2GB</p>
                  </div>
                </div>
              </div>

              {/* Duration and Release Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cms-primary font-medium mb-2">Duration (minutes)</label>
                  <Input
                    placeholder="e.g., 45"
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

              {/* Submit Button */}
              <Button className="w-full cms-button">
                <Upload className="w-4 h-4 mr-2" />
                Add Episode
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};