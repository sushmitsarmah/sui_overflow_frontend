
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wand2, AlertCircle, Info } from 'lucide-react';
import PromptInput from '../components/PromptInput';
import { useSiteForgeStore } from '../store';

const PromptPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { createProject } = useSiteForgeStore();

  const handleSubmitPrompt = async (prompt: string) => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress updates
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
    
    try {
      // Create the project
      const project = await createProject(prompt);
      
      // When it's done, make sure progress is at 100%
      setProgress(100);
      
      // Navigate to the preview page
      setTimeout(() => {
        navigate(`/preview/${project.id}`);
      }, 1000);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <Wand2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Create Your Website</h1>
            <p className="text-xl text-gray-600">
              Describe what you want and let our AI build it for you
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Enter Your Prompt</h2>
            
            <div className="mb-8">
              <PromptInput
                onSubmit={handleSubmitPrompt}
                isLoading={isGenerating}
                autoFocus={true}
                className="mb-6"
                placeholderText="Describe the website you want to create in detail..."
              />
              
              {isGenerating && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Generating your website</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Tips for better results:</p>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li>Be specific about the type of website (portfolio, blog, e-commerce)</li>
                    <li>Mention color schemes or design preferences</li>
                    <li>Describe the structure and content sections</li>
                    <li>Include any special features or functionality</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">What happens next?</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">1</span>
                  <span>Our AI analyzes your prompt and generates a website design</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">2</span>
                  <span>We'll create all necessary HTML, CSS, and JavaScript code</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">3</span>
                  <span>You'll be able to preview, edit, and deploy your site</span>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-amber-700">
              <p className="font-medium">Please note:</p>
              <p>Generation times may vary based on system load and prompt complexity. Complex websites may take longer to generate.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PromptPage;
