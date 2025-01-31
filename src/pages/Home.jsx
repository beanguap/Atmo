import { useState, useEffect } from "react";
import MediaCard from "../components/MediaCard";
import "../styles/ShelfView.css";

const Home = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavorite = (media) => {
    let updatedFavorites;
    if (favorites.some((item) => item.title === media.title)) {
      updatedFavorites = favorites.filter((item) => item.title !== media.title);
    } else {
      updatedFavorites = [...favorites, media];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="shelf-container">
      <h2 className="shelf-title">Favorites</h2>
      <div className="shelf-items">
        {favorites.length > 0 ? (
          favorites.map((media) => (
            <MediaCard
              key={media.title}
              title={media.title}
              cover={media.cover}
              type={media.type}
              rating={media.rating}
              details={media.details}
              onFavorite={handleFavorite}
            />
          ))
        ) : (
          <p>No favorite media yet. Click ♥ to save items!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
