import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import mediaData from "../data/mediaData";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchRef = useRef(null);

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

  // Hide results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-bar">
        <Search size={18} color="#8E8E93" />
        <input
          type="text"
          placeholder="Search media..."
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {query && filteredResults.length > 0 && (
        <div className="search-results">
          {filteredResults.map((media) => (
            <div key={media.id} className="search-result-item">
              <img src={media.cover} alt={media.title} className="search-thumbnail" />
              <div className="search-info">
                <p className="search-title">{media.title}</p>
                <p className="search-type">{media.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
