const History = () => {
  return (
    <div className="page-container">
      <h2>Scan History</h2>
      <p className="subtitle">
        Previously analyzed indicators and their outcomes.
      </p>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>IOC</th>
              <th>Verdict</th>
              <th>Timestamp</th>
              <th>Note</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>8.8.8.8</td>
              <td><span className="badge safe">Safe</span></td>
              <td>2025-01-10 14:32</td>
              <td>Public DNS</td>
            </tr>

            <tr>
              <td>example-login.net</td>
              <td><span className="badge warning">Suspicious</span></td>
              <td>2025-01-11 09:15</td>
              <td>Possible phishing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
