import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/slices/favoritesSlice";
import { formatPrice } from "../utils/helpers";
import HeartIcon from "./HeartIcon";
import "../styles/components/CamperCard.css";

import locationIcon from "../assets/icons/location.svg";
import starIcon from "../assets/icons/star.svg";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === camper.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeItem(camper));
    } else {
      dispatch(addItem(camper));
    }
  };

  return (
    <article className="camper-card">
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
            <button
              className="heart-button"
              onClick={toggleFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <HeartIcon
                className={`heart-icon ${isFavorite ? "favorite" : ""}`}
              />
            </button>
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

        <ul className="features-list" aria-label="Camper features">
          {["Automatic", "Petrol", "Kitchen", "AC"].map((feature, idx) => (
            <li key={idx} className="feature-item">
              {feature}
            </li>
          ))}
        </ul>

        <div className="card-actions">
          <Link to={`/catalog/${camper.id}`} className="show-more">
            Show More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CamperCard;
