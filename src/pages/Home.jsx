import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ShelfView from "../components/ShelfView";

const Home = () => {
  return (
    <div className="home-container">
      <SearchBar />
      <ShelfView />
      <Navbar />
    </div>
  );
};

export default Home;
