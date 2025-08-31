import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SaporitoBiteLogo from '../assets/SaporitoBiteBlack.svg';
import SubscribeForm from '../components/SubscribeForm';

function About() {
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className="min-h-screen bg-[#f5f2ee] text-gray-800 flex flex-col">

            <section className="relative py-20 px-4 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(245, 242, 238, 0.9), rgba(245, 242, 238, 0.9)), url(https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=2074)' }}>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.img
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        src={SaporitoBiteLogo}
                        alt="SaporitoBite Logo"
                        className="h-20 sm:h-24 mx-auto mb-8 drop-shadow-lg"
                    />
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#a8844a] mb-6"
                    >
                        Our Story & Mission
                    </motion.h1>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="w-24 h-1 bg-[#bfa074] mx-auto mb-8"></div>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                            SaporitoBite was born from a passion for plant-forward cooking and a belief that healthy, sustainable food should be accessible and delicious. Our mission is to inspire home cooks of all skill levels to create nourishing meals that celebrate seasonal ingredients and global flavors.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#bfa074] mb-3">Our Core Values</h2>
                        <div className="w-16 h-1 bg-[#bfa074] mx-auto mb-6"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Seasonal & Local",
                                description: "We celebrate the flavors of each season and support local producers whenever possible, reducing our environmental impact.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0118 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10a3 3 0 100-6 3 3 0 000 6z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Plant-Forward Focus",
                                description: "Our recipes emphasize vegetables, fruits, whole grains, and legumes, making plants the star of every meal for both health and sustainability.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Global Inspiration",
                                description: "We draw inspiration from culinary traditions around the world, bringing diverse flavors and techniques to your kitchen.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#f5f2ee] flex items-center justify-center text-[#bfa074] mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-serif text-[#bfa074] mb-3">{value.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#bfa074] mb-3">Our Team</h2>
                        <div className="w-16 h-1 bg-[#bfa074] mx-auto mb-6"></div>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            SaporitoBite is created by a small team of passionate food lovers, recipe developers, and photographers dedicated to sharing the joy of cooking.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="aspect-square rounded-xl overflow-hidden shadow-lg"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070"
                                alt="Our Team"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-serif text-[#bfa074] mb-4">Passionate About Food</h3>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Behind SaporitoBite is a team of culinary enthusiasts who believe in the power of good food to bring people together. Our recipe developers test each recipe multiple times to ensure they work in home kitchens, while our food photographers capture the beauty of each dish.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                With backgrounds ranging from professional cooking to nutrition education, our team combines expertise with a genuine love for creating and sharing delicious, nourishing food that celebrates seasonal ingredients and global flavors.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#bfa074] flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700">Triple-tested recipes</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#bfa074] flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700">Professional food photography</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#bfa074] flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700">Seasonal ingredient focus</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-[#f5f2ee] relative">
                <div className="absolute left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=2076')] bg-cover bg-center opacity-5"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#bfa074] mb-4 text-center">Join Our Community</h2>
                        <p className="text-gray-700 mb-8 text-center max-w-2xl mx-auto">
                            Subscribe to our newsletter for the latest recipes, seasonal cooking guides, and culinary inspiration delivered straight to your inbox.
                        </p>
                        <SubscribeForm variant="gold" />
                    </motion.div>
                </div>
            </section>

            <section className="py-10 px-4 bg-white text-center">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 border-2 border-[#bfa074] px-8 py-3 rounded-md hover:bg-[#bfa074] hover:text-white transition-colors"
                    onClick={handleBackToTop}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>
            </section>
        </div>
    );
}

export default About;
