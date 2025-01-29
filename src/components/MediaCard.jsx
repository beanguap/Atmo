import "../styles/MediaCard.css";
import { useState, useCallback } from "react";
import PropTypes from "prop-types";

const MediaCard = ({ title, cover, type, rating, details }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleExpand = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setExpanded(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div 
      className={`media-card ${expanded ? "expanded" : ""}`}
      role="article"
      aria-expanded={expanded}
    >
      <div 
        role="button"
        tabIndex={0}
        onClick={handleExpand}
        onKeyPress={(e) => e.key === 'Enter' && handleExpand()}
        aria-label={`View details for ${title}`}
      >
        <img 
          src={imageError ? "/fallback-image.jpg" : cover} 
          alt={title} 
          className="media-cover"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="media-info">
        <h3 className="media-title">{title}</h3>
        <p className="media-type">{type}</p>
        <p className="media-rating" aria-label={`Rating: ${rating} stars`}>
          ⭐ {rating}
        </p>
      </div>
      {expanded && (
        <div 
          className="media-details"
          role="dialog"
          aria-label={`Details for ${title}`}
        >
          <p>{details}</p>
          <button 
            className="close-button"
            onClick={handleClose}
            aria-label="Close details"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

MediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired
};

export default MediaCard;