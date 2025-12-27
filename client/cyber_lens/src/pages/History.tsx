import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

const History = () => {
    const historyData = [
        {
            id: 1,
            ioc: '8.8.8.8',
            tag: 'Clean',
            timestamp: 'Dec 26, 2:34 PM',
            note: 'Google DNS'
        },
        {
            id: 2,
            ioc: 'update-now-security.com',
            tag: 'Malicious',
            timestamp: 'Dec 25, 4:56 PM',
            note: 'Fake software update site'
        },
        {
            id: 3,
            ioc: 'a3f5d2e1b4c7890f',
            tag: 'Suspicious',
            timestamp: 'Dec 24, 10:18 AM',
            note: 'Hash found in sandbox needs more checking'
        }
    ];

    const getCSS = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'malicious':
                return 'bg-red-100 text-red-700';
            case 'suspicious':
                return 'bg-amber-100 text-amber-700';
            case 'clean':
                return 'bg-emerald-100 text-emerald-700';
            default:
                return 'bg-slate-100 text-slate-600';
        }
    };

    const getIcon = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'malicious':
                return <XCircle className="w-3.5 h-3.5" />;
            case 'suspicious':
                return <AlertTriangle className="w-3.5 h-3.5" />;
            case 'clean':
                return <CheckCircle className="w-3.5 h-3.5" />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-semibold text-center mb-2">Search History</h1>
            <p className="text-lg text-slate-600 text-center mb-8">recent searches</p>

            <div className="bg-white rounded-xl p-6 shadow-lg overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b-2 border-slate-200">IOC</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b-2 border-slate-200">text</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b-2 border-slate-200 flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                Time
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b-2 border-slate-200">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3 border-b border-slate-200 font-mono text-sm text-blue-600 font-medium">{item.ioc}</td>
                                <td className="px-4 py-3 border-b border-slate-200">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getCSS(item.tag)}`}>
                                        {getIcon(item.tag)}
                                        {item.tag}
                                    </span>
                                </td>
                                <td className="px-4 py-3 border-b border-slate-200 text-slate-600 text-sm">{item.timestamp}</td>
                                <td className="px-4 py-3 border-b border-slate-200 text-slate-600">{item.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {historyData.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p>No searches !</p>
                </div>
            )}
        </div>
    );
};

export default History;
