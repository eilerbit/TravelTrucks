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
    <div className="container">
      <section className="title-section">
        <div className="title-container">
          <div className="title-text">
            <h1>{camper.name}</h1>
          </div>
          <div className="price">€{camper.price}</div>
        </div>
        <div className="details-container">
          <div className="reviews-container">
            <div className="rating-button">
              <div className="rating-container">
                <div className="star-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.53834 1.10997C7.70914 0.699319 8.29086 0.699318 8.46166 1.10997L10.0247 4.60997L13.8282 5.07483C14.2779 5.13939 14.4597 5.69561 14.1337 6.00555L11.3137 8.68805L11.8671 12.4741C11.9427 12.922 11.4617 13.2668 11.0596 13.0405L7.99966 11.3173L4.94042 13.0405C4.53835 13.2668 4.05725 12.922 4.13285 12.4741L4.68619 8.68805L1.86624 6.00555C1.54024 5.69561 1.72199 5.13939 2.17172 5.07483L5.97524 4.60997L7.53834 1.10997Z"
                      fill="#FFC531"
                    />
                  </svg>
                </div>
                <span>{camper.rating}</span>
              </div>
              <div className="reviews-link">
                <span>{camper.reviews.length} Reviews</span>
              </div>
            </div>
            <div className="location-container">
              <div className="map-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z"
                    stroke="#101828"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 14.6667C10.6667 12 13.3333 9.61237 13.3333 6.66667C13.3333 3.72097 10.9467 1.33334 8 1.33334C5.05333 1.33334 2.66667 3.72097 2.66667 6.66667C2.66667 9.61237 5.33333 12 8 14.6667Z"
                    stroke="#101828"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="location-text">{camper.location}</span>
            </div>
          </div>
        </div>
      </section>
      <div className="gallery">
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.original}
            alt={`${camper.name} ${index + 1}`}
          />
        ))}
      </div>
      <div className="tabs-container">
        <div className="tabs-titles">
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
        <div className="tabs-divider"></div>
      </div>

      <div className="content-grid">
        <div className="features-section">
          {activeTab === "features" && (
            <>
              <div className="features-grid">
                {["Automatic", "AC", "Petrol", "Kitchen", "Radio"].map(
                  (feature, index) => (
                    <div key={index} className="feature-badge">
                      <span className="feature-icon">
                        {/* Icon will be added here */}
                      </span>
                      <span>{feature}</span>
                    </div>
                  )
                )}
              </div>
              <div className="vehicle-details">
                <h3 className="details-title">Vehicle details</h3>
                <div className="details-list">
                  <div className="detail-item">
                    <span>Form</span>
                    <span>Panel truck</span>
                  </div>
                  <div className="detail-item">
                    <span>Length</span>
                    <span>5.4 m</span>
                  </div>
                  <div className="detail-item">
                    <span>Width</span>
                    <span>2.01 m</span>
                  </div>
                  <div className="detail-item">
                    <span>Height</span>
                    <span>2.05 m</span>
                  </div>
                  <div className="detail-item">
                    <span>Tank</span>
                    <span>132 l</span>
                  </div>
                  <div className="detail-item">
                    <span>Consumption</span>
                    <span>12.4l/100km</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === "reviews" && (
            <div className="reviews">
              {camper.reviews.map((review, index) => (
                <div key={index} className="review">
                  <div className="review-header">
                    <h4>{review.reviewer_name}</h4>
                    <span>{review.reviewer_rating} ★</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="booking-form">
          <div className="form-header">
            <h3 className="form-title">Book This Camper</h3>
            <p className="form-description">
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input type="date" className="form-input" required />
            </div>
            <div className="form-group">
              <input type="date" className="form-input" required />
            </div>
            <button type="submit" className="submit-button">
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
