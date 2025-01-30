import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import PropTypes from "prop-types";
import "../styles/MediaCard.css";

const MediaCard = ({ title, cover, type, rating, details }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <div className={`media-card ${expanded ? "expanded" : ""}`} onClick={handleExpand}>
      <div className="media-main">
        <img src={cover} alt={title} className="media-cover" />
        <div className="media-info">
          <h3 className="media-title">{title}</h3>
          <p className="media-type">{type}</p>
          <p className="media-rating">⭐ {rating}</p>
        </div>
      </div>

      {expanded && (
        <div className="media-details">
          <p>{details}</p>
          <button className="close-button" onClick={handleClose}>Close</button>
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
