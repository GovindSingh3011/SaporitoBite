import { useState } from 'react';

export default function SubscribeForm({ variant = 'dark' }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const isGold = variant === 'gold';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const apiBaseUrl = import.meta.env.VITE_APP_API_URL || '';
            const response = await fetch(`${apiBaseUrl}/api/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ success: true, message: 'Successfully subscribed!' });
                setName('');
                setEmail('');
            } else {
                setStatus({ success: false, message: data.message || 'Failed to subscribe.' });
            }
        } catch (error) {
            setStatus({ success: false, message: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${isGold ? 'bg-[#c39356]' : 'bg-[#202020]'} text-white p-8`}>
            {isGold && (
                <div className="text-center mb-8">
                    <h2 className="text-lg font-medium uppercase tracking-wider">STAY IN TOUCH</h2>
                    <h3 className="text-4xl md:text-5xl font-serif mt-4 mb-6">
                        Subscribe for Recipes, Tips, and Inspiration Delivered Fresh to Your Inbox!
                    </h3>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className={isGold ? "max-w-3xl mx-auto" : "flex flex-col gap-4"}
            >
                {isGold ? (
                    <div className="flex flex-col md:flex-row gap-8 mb-6">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="flex-1 bg-transparent border-b border-white py-2 px-1 outline-none text-white placeholder-white"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 bg-transparent border-b border-white py-2 px-1 outline-none text-white placeholder-white"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="flex-1 bg-transparent border-b border-white py-2 px-1 outline-none text-white placeholder-gray-300"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 bg-transparent border-b border-white py-2 px-1 outline-none text-white placeholder-gray-300"
                        />
                    </div>
                )}

                <div className={isGold ? "flex justify-center mt-8" : "flex justify-center md:justify-start mt-4"}>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-white text-black font-medium 
                          ${isGold
                                ? "py-2 px-8 hover:bg-gray-100"
                                : "py-1.5 px-5 hover:bg-gray-200"
                            } transition-colors duration-200`}
                    >
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>
            </form>

            {status && (
                <div className={`mt-4 ${isGold ? "text-center" : ""} ${status.success ? 'text-green-400' : 'text-red-400'}`}>
                    {status.message}
                </div>
            )}
        </div>
    );
}