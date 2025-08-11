import { useState } from "react";
import { Search, Filter, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export const BrowseContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasError, setHasError] = useState(true); // Simulating network error like in screenshots

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cms-primary mb-2">Browse Content</h1>
        <p className="text-cms-text-secondary">Discover and manage all your trailers and content</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-3 w-5 h-5 text-cms-text-muted" />
          <Input
            placeholder="Search trailers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cms-input pl-10"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-cms-text-secondary mb-2">Filter by Genre</label>
          <Select>
            <SelectTrigger className="cms-input">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent className="bg-cms-surface border-cms-border">
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="drama">Drama</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-secondary mb-2">Filter by Age Rating</label>
          <Select>
            <SelectTrigger className="cms-input">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-cms-surface border-cms-border">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pg">PG</SelectItem>
              <SelectItem value="pg13">PG-13</SelectItem>
              <SelectItem value="r">R</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-secondary mb-2">Filter by Year</label>
          <Select>
            <SelectTrigger className="cms-input">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-cms-surface border-cms-border">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-secondary mb-2">Filter by Content Type</label>
          <Select>
            <SelectTrigger className="cms-input">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-cms-surface border-cms-border">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="series">Series</SelectItem>
              <SelectItem value="trailer">Trailer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-secondary mb-2">Filter by Release Type</label>
          <Select>
            <SelectTrigger className="cms-input">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-cms-surface border-cms-border">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="theatrical">Theatrical</SelectItem>
              <SelectItem value="streaming">Streaming</SelectItem>
              <SelectItem value="dvd">DVD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Area */}
      <Card className="cms-card min-h-[400px] flex items-center justify-center">
        {hasError ? (
          <div className="text-center">
            <div className="text-cms-error text-lg font-semibold mb-2">Error loading content</div>
            <p className="text-cms-text-secondary mb-6">Network error - please check your internet connection</p>
            <Button 
              onClick={() => setHasError(false)}
              className="cms-button-primary"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-cms-text-secondary mb-4">No content found</div>
            <Button className="cms-button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add New Content
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};