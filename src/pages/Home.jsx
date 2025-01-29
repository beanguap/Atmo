import mediaData from "../data/mediaData.json";
import MediaCard from "../components/MediaCard.jsx";

const Home = () => {
  return (
    <div className="media-grid">
      {mediaData.map((media) => (
        <MediaCard 
          key={media.id}
          title={media.title}
          cover={media.cover}
          type={media.type}
          rating={media.rating}
          details={media.details}
        />
      ))}
    </div>
  );
};

export default Home;
