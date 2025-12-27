import "./History.css";

const History = () => {
    return (
        <div className="history-container">
            <h2>History</h2>
            
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
                        <td>8.8.8.8</td>
                        <td>Safe</td>
                        <td>15-11-2017 6:00</td>
                    </tr>
                    <tr>
                        <td>172.31.2.3</td>
                        <td>Unsafe</td>
                        <td>15-11-2017 6:00</td>
                    </tr>
                    <tr>
                        <td>8.8.8.8</td>
                        <td>Safe</td>
                        <td>15-11-2017 6:00</td>
                    </tr>
                    <tr>
                        <td>172.31.2.3</td>
                        <td>Unsafe</td>
                        <td>15-11-2017 6:00</td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default History;
