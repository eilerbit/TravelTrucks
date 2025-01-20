import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCampers } from "../redux/slices/campersSlice";
import Loader from "../components/Loader";
import { formatPrice } from "../utils/helpers";
import "../styles/components/Tab.css";
import "../styles/components/Reviews.css";
import "../styles/components/Booking-form.css";
import "../styles/CampersDetailsPage.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.campers);
  const camper = list.find((camper) => camper.id === id);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    if (!camper) {
      dispatch(fetchCampers());
    }
  }, [dispatch, camper]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (status === "loading") return <Loader />;
  if (!camper) return <p>Camper not found.</p>;

  return (
    <div className="camper-details">
      <h1>{camper.name}</h1>
      <div className="gallery">
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.original}
            alt={`${camper.name} ${index + 1}`}
          />
        ))}
      </div>
      <div className="tabs">
        <div
          className={`tab ${activeTab === "features" ? "active" : ""}`}
          onClick={() => handleTabClick("features")}
        >
          Features
        </div>
        <div
          className={`tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => handleTabClick("reviews")}
        >
          Reviews
        </div>
      </div>
      {activeTab === "features" && (
        <div className="details">
          <h3>Details</h3>
          <p>Price: {formatPrice(camper.price)}</p>
          <p>Location: {camper.location}</p>
          <div className="features">
            {["transmission", "engine", "AC", "bathroom", "kitchen"].map(
              (feature) =>
                camper[feature] && (
                  <div key={feature} className="feature">
                    {feature.charAt(0).toUpperCase() + feature.slice(1)}
                  </div>
                )
            )}
          </div>
        </div>
      )}
      {activeTab === "reviews" && (
        <div className="reviews">
          <h3>Reviews</h3>
          {camper.reviews.map((review, index) => (
            <div key={index} className="review">
              <div className="avatar">
                {review.reviewer_name.charAt(0).toUpperCase()}
              </div>
              <div className="content">
                <h4>{review.reviewer_name}</h4>
                <p>{review.comment}</p>
                <p>Rating: {review.reviewer_rating} ★</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="booking-form">
        <h3>Book This Camper</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Booking successful!");
          }}
        >
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="date" placeholder="Start Date" required />
          <input type="date" placeholder="End Date" required />
          <button type="submit">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
