import "./MediaCard.css";

const MediaCard = ({ title, cover, type, rating }) => {
  return (
    <div className="media-card">
      <img src={cover} alt={title} className="media-cover" />
      <div className="media-info">
        <h3 className="media-title">{title}</h3>
        <p className="media-type">{type}</p>
        <p className="media-rating">⭐ {rating}</p>
      </div>
    </div>
  );
};

export default MediaCard;
