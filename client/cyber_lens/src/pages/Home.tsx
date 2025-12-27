import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
        <h2>Home</h2>
        <div className="search-container">
            <input placeholder="IOC value; e.g. 8.8.8.8" type="text"/>
            <div className="select-container">
                <select>
                    <option>IP</option>
                    <option>Domain</option>
                    <option>URL</option>
                    <option>Hash</option>
                </select>
            </div>
            <button>Search</button>
        </div>
    </div>
  );
};

export default Home;

