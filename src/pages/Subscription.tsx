
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@suiet/wallet-kit';
import { Wallet, Sparkles, Star } from 'lucide-react';
import SubscriptionBanner from '../components/SubscriptionBanner';
import { useSiteForgeStore } from '../store';

const Subscription = () => {
  const { 
    isWalletConnected,
    hasSubscription,
    mintSubscription,
    connectWallet
  } = useSiteForgeStore();

  useEffect(() => {
    // Add any initialization code here
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">SiteForge Subscription</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock premium features and enhanced capabilities with our NFT subscription
          </p>
        </motion.div>

        {!isWalletConnected ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="mb-6">
              <Wallet className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                Please connect your Sui wallet to check subscription status or mint a new subscription NFT.
              </p>
            </div>
            <ConnectButton
              className="button-primary mx-auto px-8 py-3 font-semibold text-lg"
              onConnectSuccess={connectWallet}
            />
          </motion.div>
        ) : (
          <>
            <div className="max-w-4xl mx-auto mb-16">
              <SubscriptionBanner
                hasSubscription={hasSubscription}
                onMintNFT={mintSubscription}
              />
            </div>

            {hasSubscription ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-6">Your Premium Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-card">
                    <Star className="h-8 w-8 text-accent mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Custom Domains</h3>
                    <p className="text-gray-600">
                      Register free SUINS domains for your projects every month
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-card">
                    <Sparkles className="h-8 w-8 text-accent mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Advanced AI Models</h3>
                    <p className="text-gray-600">
                      Access to our most powerful AI generation models for better results
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-card">
                    <Wallet className="h-8 w-8 text-accent mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Wallet Integration</h3>
                    <p className="text-gray-600">
                      Add wallet connection features to your generated sites
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-6">Compare Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-card">
                    <div className="border-b pb-4 mb-4">
                      <h3 className="text-xl font-semibold mb-1">Free Plan</h3>
                      <p className="text-gray-600">Basic features for casual users</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Up to 3 websites</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Basic AI generation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Walrus deployments</span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span>No SUINS domains</span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span>Standard build queue</span>
                      </li>
                    </ul>
                    <div className="text-center font-bold text-lg">
                      <span>Free</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/90 to-purple-600 text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-accent text-black font-medium px-4 py-1 rounded-bl-lg">
                      Recommended
                    </div>
                    <div className="border-b border-white/20 pb-4 mb-4">
                      <h3 className="text-xl font-semibold mb-1">Premium Plan</h3>
                      <p className="opacity-90">Enhanced features for serious builders</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Unlimited websites</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Advanced AI models</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Walrus deployments</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>1 free SUINS domain per month</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Priority build queue</span>
                      </li>
                    </ul>
                    <div className="text-center font-bold text-xl">
                      <span>5 SUI</span>
                      <span className="text-sm font-normal opacity-80 ml-1">/ month</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Subscription;
