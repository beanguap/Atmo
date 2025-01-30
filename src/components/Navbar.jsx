import { NavLink } from "react-router-dom";
import { Home, Search, BookOpen, User } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <Search size={24} />
        <span>Search</span>
      </NavLink>
      <NavLink to="/library" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <BookOpen size={24} />
        <span>Library</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
