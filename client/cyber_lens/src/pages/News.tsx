import { AlertCircle, Lock, Mail, Package, Bug, WrenchIcon } from 'lucide-react';

const News = () => {
    const newsItems = [
        {
            id: 1,
            title: 'Critical RCE Bug in Apache Struts (CVE-2025-1337)',
            summary: 'Apache just dropped an emergency patch for a nasty RCE vulnerability. CVSS score is 9.8 - pretty serious. If you\'re running Struts in production, patch now.',
            category: 'Vulnerability',
            date: '2h ago'
        },
        {
            id: 2,
            title: 'LockBit 4.0 Targeting European Hospitals',
            summary: 'The ransomware crew is back with a new version hitting healthcare facilities across Europe. Exploiting old VPN bugs mostly. Germany and France seeing most activity.',
            category: 'Ransomware',
            date: '5h ago'
        },
        {
            id: 3,
            title: 'AI-Generated Phishing Getting Way Better',
            summary: 'Attackers using ChatGPT and similar tools to write super convincing phishing emails. Traditional filters aren\'t catching them as well. Grammar and formatting look legit now.',
            category: 'Phishing',
            date: 'Yesterday'
        }
    ];

    const getCategoryClass = (category: string) => {
        if (category === 'Vulnerability') return 'bg-red-100 text-red-700';
        if (category === 'Ransomware') return 'bg-amber-100 text-amber-700';
        if (category === 'Phishing') return 'bg-blue-100 text-blue-700';
        return 'bg-slate-100 text-slate-600';
    };

    const getCategoryIcon = (category: string) => {
        if (category === 'Vulnerability') return <AlertCircle className="w-4 h-4" />;
        if (category === 'Ransomware') return <Lock className="w-4 h-4" />;
        if (category === 'Phishing') return <Mail className="w-4 h-4" />;
        if (category === 'Malware') return <Bug className="w-4 h-4" />;
        if (category === 'Supply Chain') return <Package className="w-4 h-4" />;
        if (category === 'Patches') return <WrenchIcon className="w-4 h-4" />;
        return null;
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-semibold text-center mb-2">News</h1>
            <p className="text-lg text-slate-600 text-center mb-8">Latest threats and updates</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {newsItems.map((news) => (
                    <div key={news.id} className="bg-white rounded-xl p-6 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 ${getCategoryClass(news.category)}`}>
                                {getCategoryIcon(news.category)}
                                {news.category}
                            </span>
                            <span className="text-slate-500 text-sm">{news.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-800">{news.title}</h3>
                        <p className="text-slate-600 grow mb-4 text-sm leading-relaxed">{news.summary}</p>
                        <button className="text-blue-600 font-medium text-left hover:text-blue-700 hover:underline">
                            Read more
                        </button>
                    </div>
                ))}
            </div>

            {newsItems.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p>No news right now. Check back soon!</p>
                </div>
            )}
        </div>
    );
};

export default News;
