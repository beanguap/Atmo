import "../styles/ShelfView.css";
import MediaCard from "./MediaCard";
import mediaData from "../data/mediaData";

const ShelfView = () => {
  console.log('mediaData:', mediaData); // Add this line to debug

  // Group media by type
  const shelves = {
    "Video Games": mediaData.filter((item) => item.type === "Video Game"),
    "Movies": mediaData.filter((item) => item.type === "Movie"),
    "Books": mediaData.filter((item) => item.type === "Book"),
    "Music": mediaData.filter((item) => item.type === "Music"),
  };

  console.log('shelves:', shelves); // Add this line to debug

  return (
    <div className="shelf-container">
      {Object.entries(shelves).map(([category, items]) => (
        <div key={category} className="shelf">
          <h2 className="shelf-title">{category}</h2>
          <div className="shelf-items">
            {items.map((media) => (
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
        </div>
      ))}
    </div>
  );
};

export default ShelfView;