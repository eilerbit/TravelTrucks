import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.message}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={styles.homeLink}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
