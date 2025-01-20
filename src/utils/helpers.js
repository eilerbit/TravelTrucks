export const formatPrice = (price) => {
  return `€${price.toLocaleString("en-US")}.00`;
};

export const filterCampers = (campers, { location, type, features }) => {
  return campers.filter((camper) => {
    const matchesLocation = camper.location
      .toLowerCase()
      .includes(location.toLowerCase());
    const matchesType = type ? camper.form === type : true;
    const matchesFeatures = features.every((feature) => camper[feature]);
    return matchesLocation && matchesType && matchesFeatures;
  });
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const handleApiError = (error) => {
  console.error("API Error:", error);
  return (
    error.response?.data?.message ||
    "An unexpected error occurred. Please try again."
  );
};
