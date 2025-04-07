
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, Code, MoveRight } from 'lucide-react';
import PromptInput from '../components/PromptInput';
import { useSiteForgeStore } from '../store';

const Landing = () => {
  const [isPromptLoading, setIsPromptLoading] = useState(false);
  const navigate = useNavigate();
  const { createProject } = useSiteForgeStore();

  const handlePromptSubmit = async (prompt: string) => {
    setIsPromptLoading(true);
    try {
      const project = await createProject(prompt);
      navigate(`/preview/${project.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsPromptLoading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Generation',
      description: 'Describe your site in plain text and watch AI build it in seconds',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Decentralized Hosting',
      description: 'Deploy to decentralized networks for censorship-resistant hosting',
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: 'SUINS Integration',
      description: 'Register your site with a .sui domain name for easy access',
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: 'Full Code Access',
      description: 'Download, modify, and customize the generated code as needed',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Build Your Website with{' '}
              <span className="text-primary">AI</span> on the{' '}
              <span className="text-accent">Sui Network</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              SiteForge generates beautiful websites from text prompts, deploys them to decentralized storage, and integrates with SUINS domains.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="button-primary px-8 py-4 text-lg flex items-center"
                onClick={() => navigate('/prompt')}
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="button-secondary px-8 py-4 text-lg"
                onClick={() => navigate('/subscription')}
              >
                View Subscription
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="bg-white/90 rounded-2xl m-6 p-6 md:p-8 shadow-lg backdrop-blur-sm w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Generate Your Site Now
                </h2>
                <p className="text-gray-600 mb-6">
                  Describe the website you want to build. Be as specific as possible about design, features, and purpose.
                </p>
                <PromptInput
                  onSubmit={handlePromptSubmit}
                  isLoading={isPromptLoading}
                  autoFocus={false}
                  placeholderText="e.g., Create a portfolio site for a photographer with dark theme, gallery, and contact form..."
                />
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
              alt="Code preview"
              className="w-full h-[600px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Web3 Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, deploy, and manage decentralized websites
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white rounded-xl p-6 shadow-card card-hover"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How SiteForge Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From prompt to published website in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-100 relative"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Describe Your Vision</h3>
              <p className="text-gray-600 mb-4">
                Write a detailed prompt about your website's purpose, design, and features.
              </p>
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                alt="Person typing on laptop"
                className="w-full h-40 object-cover rounded-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 border border-gray-100 relative"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">AI Generates Code</h3>
              <p className="text-gray-600 mb-4">
                Our AI analyzes your prompt and generates a complete website with modern design patterns.
              </p>
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
                alt="Code being generated"
                className="w-full h-40 object-cover rounded-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-gray-100 relative"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Deploy & Share</h3>
              <p className="text-gray-600 mb-4">
                Deploy to Walrus with one click, register a SUINS domain, and share your new site.
              </p>
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
                alt="Website deployment"
                className="w-full h-40 object-cover rounded-lg"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigate('/prompt')}
              className="button-primary px-8 py-4 text-lg"
            >
              Try It Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your Decentralized Website?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join thousands of developers building with SiteForge on the Sui Network
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate('/prompt')}
              className="bg-white text-primary font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Build Your First Site
            </button>
            <button
              onClick={() => navigate('/subscription')}
              className="bg-transparent text-white border border-white py-4 px-8 rounded-lg hover:bg-white/10 transition-all"
            >
              View Subscription Options
            </button>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-2">1,000+</h3>
              <p className="opacity-90">Websites Generated</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="opacity-90">Active Users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-2">300+</h3>
              <p className="opacity-90">SUINS Domains Registered</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
