import { useState, useEffect } from "react";
import MediaCard from "../components/MediaCard";
import "../styles/ShelfView.css";

const Home = () => {
  const [favorites, setFavorites] = useState([]);

  // Function to load favorites from localStorage
  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  };

  // Load favorites on component mount
  useEffect(() => {
    loadFavorites();

    // Listen for updates when media is favorited/unfavorited
    const handleStorageChange = () => loadFavorites();
    window.addEventListener("favoritesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  }, []);

  console.log("Favorites in Home:", favorites); // Debugging log

  // Group favorites by Media Type
  const groupedByType = favorites.reduce((acc, media) => {
    if (!acc[media.type]) acc[media.type] = [];
    acc[media.type].push(media);
    return acc;
  }, {});

  return (
    <div className="shelf-container">
      <h2 className="shelf-title">Your Favorites</h2>

      {favorites.length === 0 ? (
        <p className="no-favorites">No favorite media yet. Click ♥ to save items!</p>
      ) : (
        Object.entries(groupedByType).map(([type, items]) => {
          // Count occurrences of each genre tag
          const tagCounts = items.reduce((acc, media) => {
            media.tags.forEach((tag) => {
              acc[tag] = (acc[tag] || 0) + 1;
            });
            return acc;
          }, {});

          // Only include genres that appear in at least two items
          const filteredTags = Object.entries(tagCounts)
            .filter(([, count]) => count > 1) // Only show shared genres
            .map(([tag]) => tag);

          return (
            <div key={type} className="shelf">
              <h2 className="shelf-title">{type}</h2>

              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => {
                  const mediaItems = items.filter((media) => media.tags.includes(tag));

                  return (
                    <div key={tag} className="genre-section">
                      <h3 className="genre-title">{tag}</h3>
                      <div className="shelf-items">
                        {mediaItems.map((media) => (
                          <MediaCard
                            key={media.title}
                            title={media.title}
                            cover={media.cover}
                            type={media.type}
                            rating={media.rating}
                            details={media.details}
                            tags={media.tags}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="shelf-items">
                  {items.map((media) => (
                    <MediaCard
                      key={media.title}
                      title={media.title}
                      cover={media.cover}
                      type={media.type}
                      rating={media.rating}
                      details={media.details}
                      tags={media.tags}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
