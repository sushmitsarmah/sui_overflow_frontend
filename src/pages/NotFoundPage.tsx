
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="text-9xl font-bold text-primary/20 mb-8"
        >
          404
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-md">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="button-primary flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <span>Go to Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="button-secondary flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
