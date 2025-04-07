
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, FileBadge, Info, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-gray-900 text-white py-12 mt-16"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-accent"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-bold text-xl">SiteForge</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Build decentralized websites with AI in seconds. Powered by Sui blockchain.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/prompt" className="text-gray-400 hover:text-white transition-colors">Build</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/subscription" className="text-gray-400 hover:text-white transition-colors">Subscription</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <FileBadge size={16} />
                  <span>Documentation</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <Info size={16} />
                  <span>About</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest updates and news.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-accent w-full"
              />
              <button className="bg-accent text-black px-4 py-2 rounded-r-lg font-medium hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SiteForge. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
