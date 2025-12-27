import "../styles/Home.css"

const Home = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">IOC Search</h2>
      

      <div className="form-container">
        <input
          type="text"
          placeholder="Enter IOC value"
          className="input"
        />

        <select className="select">
          <option value="">Select IOC Type</option>
          <option value="ip">IP Address</option>
          <option value="domain">Domain</option>
          <option value="url">URL</option>
          <option value="hash">Hash</option>
        </select>

        <button className="button">Search</button>
      </div>
    </div>
  );
};

export default Home;