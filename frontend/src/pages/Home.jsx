import { motion } from 'framer-motion';
import { FaLeaf, FaCamera, FaDatabase, FaMobileAlt, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    { icon: <FaLeaf />, title: "Plant Recognition", desc: "Instant identification of plants" },
    { icon: <FaCamera />, title: "Photo Upload", desc: "Easy image upload system" },
    { icon: <FaDatabase />, title: "Plant Database", desc: "Extensive plant information" },
    { icon: <FaMobileAlt />, title: "Mobile Friendly", desc: "Use on any device" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-green-500 to-green-700 text-white py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Plants Around You
            </h1>
            <p className="text-xl mb-8">
              Identify any plant instantly using our AI-powered recognition system
            </p>
            <Link 
              to="/upload"
              className="bg-white text-green-700 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors inline-flex items-center gap-2"
            >
              <FaCamera /> Start Identifying
            </Link>
            <div className="flex justify-center gap-4 mt-8">
              <Link 
                to="/upload"
                className="bg-white text-green-700 px-6 py-3 rounded-full font-bold hover:bg-green-50 transition-colors inline-flex items-center gap-2"
              >
                <FaUpload /> Upload Photo
              </Link>
              <Link 
                to="/upload?camera=true"
                className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2 border-2 border-white"
              >
                <FaCamera /> Take Photo
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl text-green-600 mb-4 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
