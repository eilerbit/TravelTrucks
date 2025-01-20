import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampers, resetCampers } from "../redux/slices/campersSlice";
import CamperCard from "../components/CamperCard";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import "../styles/CatalogPage.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { list, status, total, currentPage } = useSelector(
    (state) => state.campers
  );
  const { location, form, features } = useSelector((state) => state.filters);
  const [loadingMore, setLoadingMore] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(
      fetchCampers({ page: 1, limit: itemsPerPage, location, form, features })
    );
  }, [dispatch, location, form, features]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    dispatch(
      fetchCampers({
        page: currentPage + 1,
        limit: itemsPerPage,
        location,
        form,
        features,
      })
    ).finally(() => setLoadingMore(false));
  };

  return (
    <div className="catalog-page">
      <h1>Catalog</h1>
      <FilterBar />
      {status === "loading" && <Loader />}
      {status === "failed" && <p>Failed to load campers. Please try again.</p>}
      <div className="camper-list-wrapper">
        <div className="camper-list">
          {list.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
        {list.length < total && (
          <button
            className="load-more"
            onClick={handleLoadMore}
            disabled={loadingMore || status === "loading"}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
