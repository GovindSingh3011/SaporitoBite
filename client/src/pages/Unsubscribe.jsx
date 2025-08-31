import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UnsubscribeForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setEmail(params.get("email") || "");
    }, []);

    const handleUnsubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_APP_API_URL}/api/subscriber/unsubscribe?email=${encodeURIComponent(email)}`,
                { method: "DELETE" }
            );
            const data = await response.json();
            if (response.ok) {
                setStatus({ success: true, message: "You have been successfully unsubscribed from our mailing list." });
            } else {
                setStatus({ success: false, message: data.message || "Unsubscribe failed." });
            }
        } catch (err) {
            setStatus({ success: false, message: "Server error. Please try again later." });
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-amber-700">SaporitoBite</h2>
                    </div>
                    <div className="text-red-600 mb-6">Invalid unsubscribe link.</div>
                    <p className="mb-6">The unsubscribe link appears to be missing an email address.</p>
                    <Link to="/" className="text-amber-700 hover:text-amber-900 font-medium" onClick={handleBackToTop}>
                        Return to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <div className="mb-3">
                        <h2 className="text-2xl font-bold text-amber-700">SaporitoBite</h2>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Unsubscribe Confirmation</h1>
                    <div className="w-16 h-1 bg-amber-700 mx-auto mb-4"></div>
                </div>

                {status?.success ? (
                    <div className="text-center">
                        <div className="mb-4">
                            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold mb-4 text-green-700">{status.message}</h2>
                        <p className="mb-6 text-gray-600">
                            We're sorry to see you go. If you change your mind, you can always subscribe again from our website.
                        </p>
                        <Link to="/" className="text-amber-700 hover:text-amber-900 font-medium" onClick={handleBackToTop}>
                            Return to Homepage
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="mb-6 text-center text-gray-700">
                            Are you sure you want to unsubscribe <span className="font-semibold">{email}</span> from SaporitoBite email communications?
                        </p>
                        <form onSubmit={handleUnsubscribe} className="flex flex-col items-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-colors w-full max-w-xs"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Unsubscribing...
                                    </span>
                                ) : (
                                    "Yes, Unsubscribe Me"
                                )}
                            </button>
                            <Link to="/" className="mt-4 text-gray-600 hover:text-gray-800" onClick={handleBackToTop}>
                                Cancel
                            </Link>
                        </form>

                        {status && !status.success && (
                            <div className="mt-6 text-center p-3 bg-red-50 text-red-700 rounded-md">
                                {status.message}
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Why are you unsubscribing?</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                If you have any feedback about our emails or content, we'd love to hear from you. Email us at{" "}
                                <a href="mailto:contact.saporitobite@gmail.com" className="text-amber-700 hover:underline">
                                    contact.saporitobite@gmail.com
                                </a>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}