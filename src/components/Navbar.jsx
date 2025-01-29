import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, BookOpen, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  return (
    <nav className="navbar">
      <Link to="/" className={`nav-item ${activeTab === "/" ? "active" : ""}`} onClick={() => setActiveTab("/")}>
        <Home size={24} />
        <span>Home</span>
      </Link>
      <Link to="/search" className={`nav-item ${activeTab === "/search" ? "active" : ""}`} onClick={() => setActiveTab("/search")}>
        <Search size={24} />
        <span>Search</span>
      </Link>
      <Link to="/library" className={`nav-item ${activeTab === "/library" ? "active" : ""}`} onClick={() => setActiveTab("/library")}>
        <BookOpen size={24} />
        <span>Library</span>
      </Link>
      <Link to="/profile" className={`nav-item ${activeTab === "/profile" ? "active" : ""}`} onClick={() => setActiveTab("/profile")}>
        <User size={24} />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default Navbar;
