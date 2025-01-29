import "./MediaCard.css";
import { useState } from "react";

const MediaCard = ({ title, cover, type, rating, details }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`media-card ${expanded ? "expanded" : ""}`} onClick={() => setExpanded(!expanded)}>
      <img src={cover} alt={title} className="media-cover" />
      <div className="media-info">
        <h3 className="media-title">{title}</h3>
        <p className="media-type">{type}</p>
        <p className="media-rating">⭐ {rating}</p>
      </div>
      {expanded && <div className="media-details">{details}</div>}
    </div>
  );
};

export default MediaCard;
