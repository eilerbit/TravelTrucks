import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import "../styles/components/CamperCard.css";

import heart from "../assets/icons/heart.svg";
import locationIcon from "../assets/icons/location.svg"; // Add location icon
import starIcon from "../assets/icons/star.svg"; // Add star icon for rating

const CamperCard = ({ camper }) => {
  return (
    <div className="camper-card">
      <img
        src={camper.gallery[0]?.thumb}
        alt={camper.name}
        className="camper-image"
      />
      <div className="card-content">
        <div className="card-header">
          <h3>{camper.name}</h3>
          <div className="card-header-right">
            <h3>{formatPrice(camper.price)}</h3>
            <img src={heart} alt="Heart Icon" className="heart-icon" />
          </div>
        </div>

        <div className="rating-location">
          <div className="rating">
            <img src={starIcon} alt="Star Icon" className="star-icon" />
            <span>
              {camper.rating} ({camper.reviews_count} Reviews)
            </span>
          </div>
          <div className="location">
            <img
              src={locationIcon}
              alt="Location Icon"
              className="location-icon"
            />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className="description">
          {camper.description.length > 80
            ? `${camper.description.slice(0, 80)}...`
            : camper.description}
        </p>

        <div className="features">
          {["Automatic", "Petrol", "Kitchen", "AC"].map((feature, idx) => (
            <div key={idx} className="feature-icon">
              {feature}
            </div>
          ))}
        </div>

        <div className="card-actions">
          <Link to={`/catalog/${camper.id}`} className="show-more">
            Show More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CamperCard;
