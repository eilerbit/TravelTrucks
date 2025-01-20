import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Campers of your dreams</h1>
          <p>You can find everything you want in our catalog</p>
          <Link to="/catalog" className="hero-button">
            View Now
          </Link>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
