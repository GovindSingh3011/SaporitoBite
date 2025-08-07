import SubscribeForm from './SubscribeForm';

export default function SubscribeModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-51 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
            <div
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 relative overflow-hidden transform animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#bfa074] to-[#e2d1b9] px-6 py-4 text-center">
                    <h2 className="text-2xl font-serif font-bold text-black">Join Our Newsletter</h2>
                    <p className="text-sm mt-1 text-gray-800">Get exclusive recipes and cooking tips</p>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-70 text-black hover:bg-opacity-100 transition-all font-extrabold text-2xl"
                    aria-label="Close"
                >
                    &times;
                </button>

                {/* Form */}
                <div className="px-6 pt-6 pb-8">
                    <SubscribeForm variant="gold" />
                </div>
            </div>
        </div>
    );
}