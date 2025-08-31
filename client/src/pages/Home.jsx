import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RandomRecipes from '../components/RandomRecipes';
import SubscribeForm from '../components/SubscribeForm';
import SaporitoBiteLogo from '../assets/SaporitoBiteBlack.svg';

function Home() {
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className="min-h-screen bg-[#f5f2ee] text-gray-800">
            <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070)' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#bfa07480] to-[#bfa07460]"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <motion.img
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        src={SaporitoBiteLogo}
                        alt="SaporitoBite Logo"
                        className="h-24 sm:h-28 md:h-32 mx-auto mb-6 sm:mb-8 drop-shadow-lg"
                    />
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 sm:mb-6 drop-shadow-lg text-shadow-md"
                    >
                        Delicious Plant-Forward Recipes for Every Occasion
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg sm:text-xl text-white mb-8 sm:mb-10 drop-shadow-md max-w-2xl mx-auto"
                    >
                        Discover the joy of cooking with fresh, seasonal ingredients and global flavors
                    </motion.p>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <Link to="/recipes" className="bg-[#bfa074] hover:bg-[#d8b78c] text-white font-medium px-8 sm:px-10 py-3 sm:py-4 rounded-md transition-all duration-300 inline-block shadow-md hover:shadow-lg transform hover:-translate-y-1" onClick={handleBackToTop}>
                            Explore Our Recipes
                        </Link>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-[#f5f2ee] to-transparent"></div>
            </section>

            <section className="py-14 sm:py-16 md:py-20 px-4 bg-white relative">
                <div className="absolute left-0 top-0 w-40 h-40 bg-[#bfa074] opacity-5 rounded-full -translate-x-20 -translate-y-20"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-3">
                            Browse by Category
                        </h2>
                        <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#bfa074] mx-auto mb-8 sm:mb-10 md:mb-16"></div>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                        {['breakfast', 'lunch', 'dinner', 'dessert', 'appetizer', 'salad', 'soup', 'sides'].map((category, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={category}
                            >
                                <Link to={`/recipes/type/${category}`} className="group block" onClick={handleBackToTop}>
                                    <div className="h-32 sm:h-40 md:h-48 lg:h-56 rounded-xl border-2 border-[#f3e6d2] bg-gradient-to-br from-[#f5f2ee] to-[#f9f6f1] shadow-md flex items-center justify-center group transition-all duration-300 hover:shadow-lg hover:border-[#bfa074] cursor-pointer relative overflow-hidden">
                                        <h3 className="text-[#bfa074] text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif capitalize text-center w-full font-semibold tracking-wide group-hover:text-[#a8844a] transition-colors duration-300">
                                            {category}
                                        </h3>
                                        <span className="absolute left-1/2 -translate-x-1/2 bottom-6 w-0 group-hover:w-2/3 h-1 bg-[#bfa074] rounded-full transition-all duration-300"></span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-[#f5f2ee] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-[#bfa074] opacity-5 rounded-full translate-x-40 -translate-y-40 transform rotate-45"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-center mb-3">
                            Recent Recipes
                        </h2>
                        <div className="w-24 h-1 bg-[#bfa074] mx-auto mb-16"></div>
                    </motion.div>

                    <div className="mb-16">
                        <RandomRecipes count={6} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <Link
                            to="/recipes"
                            className="inline-block bg-[#bfa074] text-white px-10 py-4 rounded-md hover:bg-[#d8b78c] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                            onClick={handleBackToTop}
                        >
                            View All Recipes
                        </Link>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 px-4 bg-white relative overflow-hidden">
                <div className="absolute left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=2076')] bg-cover bg-center opacity-5"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#f5f2ee] rounded-2xl shadow-xl p-8 md:p-12"
                    >
                        <SubscribeForm variant="gold" />
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-4 bg-[#f5f2ee] relative">
                <div className="absolute left-0 top-0 right-0 h-24 bg-white transform skew-y-2"></div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-serif mb-6">About SaporitoBite</h2>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            SaporitoBite is dedicated to bringing you delicious, plant-forward recipes that celebrate
                            global flavors and seasonal ingredients. Our mission is to make cooking from scratch
                            accessible, enjoyable and sustainable for everyone.
                        </p>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[#bfa074] flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-gray-700">Carefully tested recipes that actually work</p>
                        </div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[#bfa074] flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                </svg>
                            </div>
                            <p className="text-gray-700">Focus on fresh, seasonal ingredients</p>
                        </div>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 border-2 border-[#bfa074] px-8 py-3 rounded-md hover:bg-[#bfa074] hover:text-white transition-colors"
                            onClick={handleBackToTop}
                        >
                            Learn More About Us
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="aspect-video rounded-lg overflow-hidden shadow-lg"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070"
                            alt="Cooking together"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Home;