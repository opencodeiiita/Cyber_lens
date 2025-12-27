const Home = () => {
  return (
    <div className="page-container">
      <h2>Threat Intelligence Lookup</h2>
      <p className="subtitle">
        Analyze Indicators of Compromise using predefined categories.
      </p>

      <div className="card">
        <div className="form-group">
          <label>IOC Value</label>
          <input
            type="text"
            placeholder="e.g. 8.8.8.8, example.com"
          />
          <small className="hint">
            Enter the indicator you want to investigate
          </small>
        </div>

        <div className="form-group">
          <label>IOC Type</label>
          <select>
            <option value="">Select type</option>
            <option>IP Address</option>
            <option>Domain</option>
            <option>URL</option>
            <option>File Hash</option>
          </select>
        </div>

        <div className="actions">
          <button className="primary">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
