import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import PropTypes from "prop-types";
import "../styles/MediaCard.css";

const LOCAL_STORAGE_KEY = "favorites";

const tagColors = {
  "Gothic": "#4B0082",
  "Dark Fantasy": "#6A0DAD",
  "Eldritch Horror": "#8B0000",
  "Sci-Fi": "#008080",
  "Jazz": "#FFD700",
  "Feel-Good": "#FFA500",
  "Slow Burn": "#B22222",
  "Supernatural": "#483D8B",
  "Psychological": "#800000",
};

const MediaCard = ({ title, cover, type, rating, details, tags, onFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Helper function to safely load favorites from localStorage
  const loadFavorites = () => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error);
      return [];
    }
  };

  // Check if this media is already favorited
  useEffect(() => {
    const savedFavorites = loadFavorites();
    setIsFavorited(savedFavorites.some((media) => media.title === title));
  }, [title]);

  // Toggle favorite status with memoized callback
  const handleFavorite = useCallback(() => {
    let savedFavorites = loadFavorites();

    if (isFavorited) {
      savedFavorites = savedFavorites.filter((media) => media.title !== title);
    } else {
      savedFavorites.push({ title, cover, type, rating, details, tags });
    }

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedFavorites));
    } catch (error) {
      console.error("Failed to update favorites in localStorage:", error);
    }

    setIsFavorited((prev) => !prev);
    if (onFavorite) onFavorite();
  }, [isFavorited, title, cover, type, rating, details, tags, onFavorite]);

  return (
    <div className="media-card">
      {/* Favorite Button */}
      <button
        type="button"
        className={`favorite-button ${isFavorited ? "favorited" : ""}`}
        onClick={handleFavorite}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart size={18} />
      </button>

      {/* Cover Image */}
      <img 
        src={cover} 
        alt={title} 
        className={`media-cover ${imageLoaded ? "loaded" : ""}`}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />

      {/* Media Info */}
      <div className="media-info">
        <h3 className="media-title">{title}</h3>
        <p className="media-type">{type}</p>
        <p className="media-rating">⭐ {rating}</p>

        {/* Tags */}
        <div className="tags">
          {tags.map((tag) => (
            <span
              key={tag}
              className="media-tag"
              style={{ backgroundColor: tagColors[tag] || "#555" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

MediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFavorite: PropTypes.func,
};

export default MediaCard;
