import { useState } from "react";
import mediaData from "../data/mediaData";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    if (value === "") {
      setFilteredResults([]);
    } else {
      setFilteredResults(
        mediaData.filter((media) =>
          media.title.toLowerCase().includes(value)
        )
      );
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search media..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
      {query && (
        <div className="search-results">
          {filteredResults.length > 0 ? (
            filteredResults.map((media) => (
              <div key={media.id} className="search-result-item">
                <img src={media.cover} alt={media.title} className="search-thumbnail" />
                <div className="search-info">
                  <p className="search-title">{media.title}</p>
                  <p className="search-type">{media.type}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
