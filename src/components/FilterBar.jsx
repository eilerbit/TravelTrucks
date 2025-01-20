import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setType,
  toggleFeature,
  clearFilters,
} from "../redux/slices/filtersSlice";
import "../styles/components/FilterBar.css";

import ACIcon from "../assets/icons/AC.svg";
import BathroomIcon from "../assets/icons/bathroom.svg";
import KitchenIcon from "../assets/icons/kitchen.svg";
import TVIcon from "../assets/icons/TV.svg";
import RadioIcon from "../assets/icons/radio.svg";
import VanIcon from "../assets/icons/van.svg";
import FullyIntegratedIcon from "../assets/icons/fullyIntegrated.svg";
import AlcoveIcon from "../assets/icons/alcove.svg";

const ICONS = {
  AC: ACIcon,
  bathroom: BathroomIcon,
  kitchen: KitchenIcon,
  TV: TVIcon,
  radio: RadioIcon,
  van: VanIcon,
  fullyIntegrated: FullyIntegratedIcon,
  alcove: AlcoveIcon,
};

const FilterBar = () => {
  const dispatch = useDispatch();
  const { location, type, features } = useSelector((state) => state.filters);

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Kyiv, Ukraine"
          value={location}
          onChange={(e) => dispatch(setLocation(e.target.value))}
        />
      </div>

      <div className="filter-section">
        <h4>Filters</h4>
        <h5>Vehicle equipment</h5>
        <div className="filter-group">
          {["AC", "bathroom", "kitchen", "TV", "radio"].map((feature) => (
            <button
              key={feature}
              className={`filter-btn ${
                features.includes(feature) ? "active" : ""
              }`}
              onClick={() => dispatch(toggleFeature(feature))}
            >
              <img src={ICONS[feature]} alt={feature} className="filter-icon" />
              {feature}
            </button>
          ))}
        </div>

        <h5>Vehicle type</h5>
        <div className="filter-group">
          {[
            { label: "Van", value: "van" },
            { label: "Fully Integrated", value: "fullyIntegrated" },
            { label: "Alcove", value: "alcove" },
          ].map(({ label, value }) => (
            <button
              key={value}
              className={`filter-btn ${type === value ? "active" : ""}`}
              onClick={() => dispatch(setType(value))}
            >
              <img src={ICONS[value]} alt={label} className="filter-icon" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <button className="search-btn" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;
