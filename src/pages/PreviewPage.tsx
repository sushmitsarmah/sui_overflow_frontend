
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { File, FolderTree, Monitor, Download, ArrowUp, Eye, Code, Globe } from 'lucide-react';
import DeployModal from '../components/DeployModal';
import { useSiteForgeStore } from '../store';
import { Project } from '../components/ProjectCard';

const PreviewPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const { getProject, deployProject } = useSiteForgeStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) {
      navigate('/dashboard');
      return;
    }

    const loadProject = async () => {
      const projectData = await getProject(projectId);
      setProject(projectData);
    };

    loadProject();
  }, [projectId, getProject, navigate]);

  const handleDeploy = () => {
    setIsDeployModalOpen(true);
  };

  const handleDeployComplete = async () => {
    if (projectId) {
      await deployProject(projectId);
      const updatedProject = await getProject(projectId);
      setProject(updatedProject);
    }
    setIsDeployModalOpen(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="space-y-3">
            <div className="h-2 bg-gray-200 rounded w-24"></div>
            <div className="h-2 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Project Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-gray-600 mb-4 md:mb-0 max-w-2xl">{project.description}</p>
            </div>
            <div className="flex space-x-3">
              <button className="button-secondary flex items-center">
                <Download className="h-5 w-5 mr-2" />
                <span>Download</span>
              </button>
              <button 
                onClick={handleDeploy}
                disabled={project.deploymentStatus === 'building'}
                className={`button-primary flex items-center ${
                  project.deploymentStatus === 'building' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ArrowUp className="h-5 w-5 mr-2" />
                <span>{project.deploymentStatus === 'deployed' ? 'Re-deploy' : 'Deploy'}</span>
              </button>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="col-span-1 md:col-span-3">
              <div className="bg-white rounded-xl overflow-hidden shadow-card mb-6">
                <div className="border-b flex">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`py-4 px-6 font-medium flex items-center ${
                      activeTab === 'preview'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Monitor className="h-5 w-5 mr-2" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`py-4 px-6 font-medium flex items-center ${
                      activeTab === 'code'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Code className="h-5 w-5 mr-2" />
                    <span>Code</span>
                  </button>
                </div>

                <div className="p-0">
                  {activeTab === 'preview' ? (
                    <div>
                      <div className="bg-gray-800 py-2 px-4 text-white flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2" />
                        <span className="font-mono">preview.siteforge.sui</span>
                        <button className="ml-auto flex items-center hover:text-gray-300 transition-colors">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>Open in New Tab</span>
                        </button>
                      </div>
                      <iframe 
                        src="https://example.com"
                        title="Website Preview"
                        className="w-full h-[600px] border-0"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  ) : (
                    <div className="h-[600px] flex">
                      <div className="w-1/4 bg-gray-100 border-r p-4 overflow-y-auto">
                        <div className="mb-3">
                          <h3 className="font-medium text-sm text-gray-600 mb-2">Project Files</h3>
                          <div className="space-y-1">
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer">
                              <FolderTree className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">src</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-4">
                              <FolderTree className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">components</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-8">
                              <File className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">Button.js</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-8">
                              <File className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">Header.js</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-8">
                              <File className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">Footer.js</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-4">
                              <FolderTree className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">pages</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-8">
                              <File className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">Home.js</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-8">
                              <File className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">About.js</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-4">
                              <File className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">App.js</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-4">
                              <File className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">index.js</span>
                            </div>
                            <div className="flex items-center text-gray-700 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer ml-4">
                              <File className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">styles.css</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-3/4 bg-gray-800 text-green-400 p-4 font-mono text-sm overflow-auto">
                        <code>
                          <pre>{`import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;`}</pre>
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white rounded-xl shadow-card p-6 mb-6">
                <h3 className="font-semibold mb-4">Project Information</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Status</div>
                    <div className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-2 ${
                        project.deploymentStatus === 'deployed' ? 'bg-green-500' :
                        project.deploymentStatus === 'building' ? 'bg-amber-500' :
                        project.deploymentStatus === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                      }`}></span>
                      <span className="font-medium">{
                        project.deploymentStatus === 'deployed' ? 'Deployed' :
                        project.deploymentStatus === 'building' ? 'Building' :
                        project.deploymentStatus === 'failed' ? 'Failed' : 'Draft'
                      }</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Created</div>
                    <div>{new Date(project.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Last Update</div>
                    <div>{new Date(project.updatedAt).toLocaleString()}</div>
                  </div>
                  {project.deploymentStatus === 'deployed' && (
                    <>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Deployment URL</div>
                        <a 
                          href={project.walrusUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          {project.walrusUrl}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                      {project.suinsName && (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">SUINS Domain</div>
                          <div className="font-medium text-primary">{project.suinsName}.sui</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="font-semibold mb-4">Original Prompt</h3>
                <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-sm whitespace-pre-wrap font-mono">
                  {project.prompt}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={handleDeployComplete}
        projectId={projectId || ''}
        projectName={project.name}
      />
    </div>
  );
};

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

export default PreviewPage;
