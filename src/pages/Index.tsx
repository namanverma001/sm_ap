import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/pages/Dashboard";
import { BrowseContent } from "@/pages/BrowseContent";
import { UploadTrailer } from "@/pages/UploadTrailer";
import { UploadMovie } from "@/pages/UploadMovie";
import { UploadEpisode } from "@/pages/UploadEpisode";
import { AllMovies } from "@/pages/AllMovies";
import { AllCollections } from "@/pages/AllCollections";
import { UpdateMovie } from "@/pages/UpdateMovie";
import { ViewSeries } from "@/pages/ViewSeries";
import UploadContent from "@/pages/UploadContent";
import { AddSeries } from "@/pages/AddSeries";
import { AddCollection } from "@/pages/AddCollection";
import { CategoryManagement } from "@/pages/CategoryManagement";
import { WatchAge } from "@/pages/WatchAge";
import { Genres } from "@/pages/Genres";
import { ContentTypes } from "@/pages/ContentTypes";
import { ApiTest } from "@/pages/ApiTest";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard onLogout={handleLogout} />}>
        <Route index element={<Navigate to="/browse" replace />} />
        <Route path="browse" element={<BrowseContent />} />
        <Route path="all-movies" element={<AllMovies />} />
        <Route path="all-collections" element={<AllCollections />} />
        <Route path="upload-movie" element={<UploadMovie />} />
        <Route path="update-movie/:id" element={<UpdateMovie />} />
        <Route path="upload-episode" element={<UploadEpisode />} />
        <Route path="view-series" element={<ViewSeries />} />
        <Route path="add-series" element={<AddSeries />} />
        <Route path="add-collection" element={<AddCollection />} />
        <Route path="upload-trailer" element={<UploadTrailer />} />
        <Route path="upload-content" element={<UploadContent />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="watch-age" element={<WatchAge />} />
        <Route path="genres" element={<Genres />} />
        <Route path="content-types" element={<ContentTypes />} />
        <Route path="api-test" element={<ApiTest />} />
      </Route>
    </Routes>
  );
};

export default Index;
