
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  isNetworkError?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
  resetErrorBoundary,
  isNetworkError = false,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Log the error for debugging
    if (error) {
      console.error('Error occurred:', error);
    }
  }, [error]);

  const handleTryAgain = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-xl shadow-card p-8 mx-4"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10,
              duration: 0.8 
            }}
            className="mx-auto bg-red-100 rounded-full h-24 w-24 flex items-center justify-center mb-4"
          >
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-2">
            {isNetworkError ? 'Network Error' : 'Something Went Wrong'}
          </h1>
          
          <p className="text-gray-600 mb-4">
            {isNetworkError
              ? "We couldn't connect to the server. Please check your internet connection and try again."
              : "We encountered an unexpected error. Our team has been notified."}
          </p>
          
          {error && (
            <div className="bg-gray-100 text-left p-4 rounded-lg mb-6 overflow-auto max-h-32">
              <p className="text-sm font-mono text-gray-700">{error.message}</p>
            </div>
          )}
        </div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={handleTryAgain}
            className="button-primary flex-1 flex items-center justify-center"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            <span>Try Again</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="button-secondary flex-1 flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            <span>Back to Home</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
