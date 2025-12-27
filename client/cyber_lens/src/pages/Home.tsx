import { useState } from 'react';

const Home = () => {
    const [iocValue, setIocValue] = useState('');
    const [iocType, setIocType] = useState('ip');

    const handleSearch = () => {
        console.log('Searching for:', iocValue, 'Type:', iocType);
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-semibold text-center mb-2">CyberLens</h1>
                <p className="text-lg text-slate-600 text-center mb-8">Quick lookup for suspicious IPs, domains, URLs and file hashes</p>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-medium text-center mb-6">Cyber Lens</h2>

                    <div className="mb-6">
                        <label htmlFor="ioc-type" className="block mb-2 font-medium text-slate-700">IOC Type</label>
                        <select
                            id="ioc-type"
                            className="w-full px-3 py-3 border-2 border-slate-200 rounded-lg text-base focus:outline-none focus:border-blue-600 transition-colors"
                            value={iocType}
                            onChange={(e) => setIocType(e.target.value)}
                        >
                            <option value="ip">IP Address</option>
                            <option value="domain">Domain</option>
                            <option value="url">URL</option>
                            <option value="hash">Hash (MD5/SHA1/SHA256)</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="ioc-value" className="block mb-2 font-medium text-slate-700">IOC Value</label>
                        <input
                            id="ioc-value"
                            type="text"
                            className="w-full px-3 py-3 border-2 border-slate-200 rounded-lg text-base focus:outline-none focus:border-blue-600 transition-colors"
                            placeholder={
                                iocType === 'ip' ? 'e.g., 192.168.0.1' :
                                    iocType === 'domain' ? 'e.g., suspicious.com' :
                                        iocType === 'url' ? 'e.g., https://example.com/item' :
                                            'e.g., 123456789...'
                            }
                            value={iocValue}
                            onChange={(e) => setIocValue(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 hover:shadow-md"
                        onClick={handleSearch}
                        disabled={!iocValue.trim()}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
