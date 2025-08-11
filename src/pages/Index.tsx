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
        <Route path="upload-episode" element={<UploadEpisode />} />
        <Route path="upload-trailer" element={<UploadTrailer />} />
      </Route>
    </Routes>
  );
};

export default Index;
