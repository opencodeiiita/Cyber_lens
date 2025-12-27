import "../styles/History.css";

const History = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Search History</h2>

      <table className="history-table">
        <thead>
          <tr>
            <th>IOC</th>
            <th>Verdict</th>
            <th>Timestamp</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>192.168.1.1</td>
            <td className="badge safe">Safe</td>
            <td>2025-01-01 10:30</td>
            
          </tr>
          <tr>
            <td>example.com</td>
            <td className="badge malicious">Malicious</td>
            <td>2025-01-02 14:10</td>
            
          </tr>
          <tr>
            <td colSpan={4} className="empty-row">
              No more records
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default History;
