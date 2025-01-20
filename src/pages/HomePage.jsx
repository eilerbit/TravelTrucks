import React from "react";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Campers of your dreams</h1>
          <p>You can find everything you want in our catalog</p>
          <a href="/catalog" className="hero-button">
            View Now
          </a>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
