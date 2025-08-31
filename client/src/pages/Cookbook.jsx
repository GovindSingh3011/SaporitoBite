import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SaporitoBiteLogo from '../assets/SaporitoBiteBlack.svg';
import SubscribeForm from '../components/SubscribeForm';

function Cookbook() {
    return (
        <div className="min-h-screen bg-[#f5f2ee] text-gray-800 flex flex-col">
            <section className="relative py-20 px-4 flex items-center justify-center min-h-[70vh]">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070)' }}></div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.img 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        src={SaporitoBiteLogo} 
                        alt="SaporitoBite Logo" 
                        className="h-20 sm:h-24 mx-auto mb-8 drop-shadow-lg" 
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-block bg-[#bfa074] bg-opacity-20 px-5 py-2 rounded-full mb-6"
                    >
                        <span className="text-[#8b6d39] font-medium">Coming Soon</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#a8844a] mb-6"
                    >
                        SaporitoBite Cookbook
                    </motion.h1>
                    
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="w-24 h-1 bg-[#bfa074] mx-auto mb-8"></div>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                            We're excited to announce that our first cookbook is in the works! Featuring our most beloved plant-forward recipes, 
                            seasonal cooking guides, and exclusive new dishes you won't find on our website.
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-10"
                    >
                        <h2 className="text-xl font-serif text-[#bfa074] mb-4">Be the First to Know</h2>
                        <p className="text-gray-700 mb-6">
                            Join our mailing list to receive updates about the cookbook release date, pre-order information,
                            and exclusive behind-the-scenes content from our recipe development process.
                        </p>
                        <SubscribeForm variant="gold" />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 border-2 border-[#bfa074] px-8 py-3 rounded-md hover:bg-[#bfa074] hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Recipes
                        </Link>
                    </motion.div>
                </div>
            </section>
            
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center text-[#bfa074] mb-3">What to Expect</h2>
                    <div className="w-16 h-1 bg-[#bfa074] mx-auto mb-12"></div>
                    
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            {
                                title: "50+ Plant-Forward Recipes",
                                description: "A collection of our most popular recipes plus exclusive new dishes created specifically for this cookbook.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                )
                            },
                            {
                                title: "Seasonal Cooking Guides",
                                description: "Detailed information on how to make the most of each season's produce, with tips for selection and storage.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Stunning Photography",
                                description: "Beautiful, full-color photos for every recipe to inspire your cooking and showcase the vibrant dishes.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#f5f2ee] p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#bfa074] mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-serif text-[#bfa074] mb-3">{feature.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default Cookbook;
