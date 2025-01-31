import { useState } from "react";
import "../styles/Library.css";
import MediaCard from "../components/MediaCard";
import mediaData from "../data/mediaData";

const Library = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedTag, setSelectedTag] = useState(null);
  const [showTags, setShowTags] = useState(false); // Toggle state for tags

  // Extract unique tags from all media
  const allTags = [...new Set(mediaData.flatMap((media) => media.tags))];

  // Filtered media based on type & selected tag
  const filteredMedia = mediaData.filter((media) => {
    const matchesType = selectedType === "All" || media.type === selectedType;
    const matchesTag = !selectedTag || media.tags.includes(selectedTag);
    return matchesType && matchesTag;
  });

  // Group media by type for shelves
  const shelves = filteredMedia.reduce((acc, media) => {
    if (!acc[media.type]) acc[media.type] = [];
    acc[media.type].push(media);
    return acc;
  }, {});

  return (
    <div className="shelf-container">
      <h2 className="shelf-title">Library</h2>

      {/* Filter Options */}
      <div className="filter-container">
        {/* Always Visible Media Type Dropdown */}
        <div className="dropdown-wrapper">
          <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
            <option value="All">All Media</option>
            <option value="Video Game">Video Games</option>
            <option value="Movie">Movies</option>
            <option value="Book">Books</option>
            <option value="Music">Music</option>
          </select>
        </div>

        {/* Collapsible Tag Filters */}
        {showTags && (
          <div className="tag-container">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-button ${selectedTag === tag ? "active" : ""}`}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Toggle Button */}
        <button className="toggle-button" onClick={() => setShowTags(!showTags)}>
          {showTags ? "Hide Filters" : "Show More Filters"}
        </button>
      </div>

      {/* Media Shelves */}
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
                tags={media.tags}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Library;
