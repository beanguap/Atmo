import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import PropTypes from "prop-types";
import "../styles/MediaCard.css";

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

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(savedFavorites.some((media) => media.title === title));
  }, [title]);

  const handleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorited) {
      savedFavorites = savedFavorites.filter((media) => media.title !== title);
    } else {
      savedFavorites.push({ title, cover, type, rating, details, tags });
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorited(!isFavorited);
    if (onFavorite) onFavorite();
  };

  return (
    <div className="media-card">
      {/* Favorite Button */}
      <button className={`favorite-button ${isFavorited ? "favorited" : ""}`} onClick={handleFavorite}>
        <Heart size={18} />
      </button>

      {/* Cover Image */}
      <img 
        src={cover} 
        alt={title} 
        className={`media-cover ${imageLoaded ? 'loaded' : ''}`}
        onLoad={() => setImageLoaded(true)}
        loading="lazy" // Add lazy loading
      />

      {/* Media Info */}
      <div className="media-info">
        <h3 className="media-title">{title}</h3>
        <p className="media-type">{type}</p>
        <p className="media-rating">⭐ {rating}</p>

        {/* Tags */}
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag} className="media-tag" style={{ backgroundColor: tagColors[tag] || "#555" }}>
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
  tags: PropTypes.array.isRequired,
  onFavorite: PropTypes.func,
};

export default MediaCard;
