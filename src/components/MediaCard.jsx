import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import PropTypes from "prop-types";
import "../styles/MediaCard.css";

const MediaCard = ({ title, cover, type, rating, details, onFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Load favorite status from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(savedFavorites.some((media) => media.title === title));
  }, [title]);

  const handleFavorite = () => {
    setIsFavorited((prev) => !prev);
    onFavorite({ title, cover, type, rating, details });
  };

  return (
    <div className="media-card">
      <img src={cover} alt={title} className="media-cover" />
      <div className="media-info">
        <h3 className="media-title">{title}</h3>
        <p className="media-type">{type}</p>
        <p className="media-rating">⭐ {rating}</p>
      </div>
      <button className={`favorite-button ${isFavorited ? "favorited" : ""}`} onClick={handleFavorite}>
        <Heart size={20} />
      </button>
    </div>
  );
};

MediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default MediaCard;
