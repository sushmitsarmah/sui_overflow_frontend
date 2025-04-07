
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, Gem, CheckCircle } from 'lucide-react';

interface SubscriptionBannerProps {
  hasSubscription: boolean;
  onMintNFT: () => Promise<void>;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ 
  hasSubscription, 
  onMintNFT 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMintClick = async () => {
    setIsLoading(true);
    try {
      await onMintNFT();
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl p-6 shadow-lg ${
        hasSubscription ? 'bg-gradient-to-r from-primary to-purple-600' : 'bg-white'
      }`}
    >
      {hasSubscription ? (
        <div className="text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Gem className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Premium Subscription Active</h2>
          </div>
          
          <p className="mb-6 opacity-90">
            You have full access to all SiteForge features and benefits.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <CheckCircle className="h-6 w-6 mb-2" />
              <h3 className="font-semibold mb-1">Unlimited Projects</h3>
              <p className="text-sm opacity-80">Create as many sites as you need</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <CheckCircle className="h-6 w-6 mb-2" />
              <h3 className="font-semibold mb-1">Priority Building</h3>
              <p className="text-sm opacity-80">Your projects build first in queue</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <CheckCircle className="h-6 w-6 mb-2" />
              <h3 className="font-semibold mb-1">Free SUINS</h3>
              <p className="text-sm opacity-80">Register 1 free SUINS domain monthly</p>
            </div>
          </div>
          
          <div className="flex items-center text-white/90 text-sm">
            <Wallet className="h-4 w-4 mr-2" />
            <span>Your NFT subscription is stored securely in your wallet</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Unlock Full SiteForge Experience
              </h2>
              <p className="text-gray-600 mb-4">
                Mint our subscription NFT to access premium features and enhanced capabilities.
              </p>
            </div>
            <div className="hidden md:block">
              <CreditCard className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-1">Unlimited Projects</h3>
              <p className="text-sm text-gray-600">Create as many sites as you need</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-1">Priority Building</h3>
              <p className="text-sm text-gray-600">Your projects build first in queue</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-1">Free SUINS</h3>
              <p className="text-sm text-gray-600">Register 1 free SUINS domain monthly</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-gray-700">
              <span className="text-2xl font-bold">5 SUI</span>
              <span className="text-gray-500 ml-2">per month</span>
            </div>
            
            <button
              onClick={handleMintClick}
              disabled={isLoading}
              className="button-primary flex items-center"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5 mr-2" />
                  <span>Mint Subscription NFT</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SubscriptionBanner;
