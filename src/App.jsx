import { Fragment, useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';

import { 
  Login,
  Home
} from "./UI";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
{/*        <Route path="/index" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/home" element={<Index />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/genres" element={<Genre />} />
        <Route path="/age" element={<WatchAge />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/contents" element={<Content />} />
        <Route path="/webseries" element={<WebSeries />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/season/:series_id" element={<Season />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/edit/:id/:type" element={<EditContent />} />
        <Route path="/trailers/:id/:type" element={<UploadTrailer />} />
        <Route path="/videos/:id/:type" element={<UploadVideo />} />*/}
      </Routes>
    </Fragment>
  )
}

export default App
