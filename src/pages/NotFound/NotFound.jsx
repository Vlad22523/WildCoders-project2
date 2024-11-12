import styles from "./NotFound.module.css"; // Импортируем CSS-модуль
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      <p className={styles.description}>
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link to="/" className={styles.homeButton}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
