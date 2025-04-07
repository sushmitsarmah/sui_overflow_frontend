
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle, Globe, CheckCheck } from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
}

type Step = {
  id: string;
  name: string;
  status: 'pending' | 'loading' | 'success' | 'error';
  message?: string;
};

const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectName,
}) => {
  const [steps, setSteps] = useState<Step[]>([
    { id: 'build', name: 'Building project', status: 'pending' },
    { id: 'upload', name: 'Uploading to IPFS', status: 'pending' },
    { id: 'deploy', name: 'Deploying to Walrus', status: 'pending' },
    { id: 'register', name: 'Registering SUINS domain', status: 'pending' },
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [deploymentComplete, setDeploymentComplete] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [suinsName, setSuinsName] = useState('');

  // Simulate deployment progress
  useEffect(() => {
    if (!isOpen) return;

    let timer: NodeJS.Timeout;
    
    const simulateProgress = () => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        
        if (currentStepIndex < newSteps.length) {
          // Set current step to loading
          newSteps[currentStepIndex] = {
            ...newSteps[currentStepIndex],
            status: 'loading',
          };
          
          // After a delay, set current step to success and move to next step
          timer = setTimeout(() => {
            setSteps((prevSteps) => {
              const updatedSteps = [...prevSteps];
              updatedSteps[currentStepIndex] = {
                ...updatedSteps[currentStepIndex],
                status: Math.random() > 0.9 ? 'error' : 'success', // 10% chance of error for demo
              };
              
              if (updatedSteps[currentStepIndex].status === 'error') {
                updatedSteps[currentStepIndex].message = 'Failed to complete this step. Please try again.';
              } else if (currentStepIndex < updatedSteps.length - 1) {
                setCurrentStepIndex(currentStepIndex + 1);
              } else {
                // All steps complete
                setDeploymentComplete(true);
                setDeploymentUrl(`https://example-${projectId}.walrus.app`);
                setSuinsName(`${projectName.toLowerCase().replace(/\s+/g, '-')}`);
              }
              
              return updatedSteps;
            });
          }, 2000);
        }
        
        return newSteps;
      });
    };
    
    simulateProgress();
    
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, currentStepIndex, projectId, projectName]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const handleReset = () => {
    setSteps(steps.map(step => ({ ...step, status: 'pending', message: undefined })));
    setCurrentStepIndex(0);
    setDeploymentComplete(false);
    setDeploymentUrl('');
    setSuinsName('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
          >
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-xl font-semibold">
                {deploymentComplete ? 'Deployment Complete!' : 'Deploying Project'}
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              {deploymentComplete ? (
                <div className="text-center py-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCheck className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-1">Your project is live!</h3>
                  <p className="text-gray-600 mb-6">
                    Your site has been successfully deployed and is now accessible online.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="mb-3">
                      <label className="text-sm text-gray-500 block mb-1">Deployment URL</label>
                      <div className="flex items-center">
                        <a 
                          href={deploymentUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline flex items-center"
                        >
                          {deploymentUrl}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">SUINS Domain</label>
                      <div className="font-medium">{suinsName}.sui</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button 
                      onClick={onClose}
                      className="button-secondary flex-1"
                    >
                      Close
                    </button>
                    <a 
                      href={deploymentUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button-primary flex-1 flex items-center justify-center"
                    >
                      <Globe className="h-5 w-5 mr-2" />
                      <span>Visit Site</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <p className="text-gray-600 mb-6">
                    We're setting up your project for deployment. This may take a few minutes.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{step.name}</div>
                          {step.status === 'loading' && (
                            <div className="text-sm text-gray-500">In progress...</div>
                          )}
                          {step.message && (
                            <div className={`text-sm ${step.status === 'error' ? 'text-red-500' : 'text-gray-500'}`}>
                              {step.message}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {steps.some(step => step.status === 'error') ? (
                    <div className="flex space-x-4">
                      <button 
                        onClick={onClose}
                        className="button-secondary flex-1"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleReset}
                        className="button-primary flex-1"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500">
                      Please don't close this window until the deployment is complete
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Add the missing ExternalLink component
function ExternalLink(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

export default DeployModal;
