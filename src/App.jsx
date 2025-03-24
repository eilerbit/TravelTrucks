import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

// Lazy load components
const HomePage = lazy(() => import("./pages/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const CamperDetailsPage = lazy(() => import("./pages/CamperDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CamperDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
