
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Filter, Search } from 'lucide-react';
import ProjectCard, { Project } from '../components/ProjectCard';
import DeployModal from '../components/DeployModal';
import { useSiteForgeStore } from '../store';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  
  const { projects, fetchProjects, deployProject } = useSiteForgeStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleViewProject = (id: string) => {
    navigate(`/preview/${id}`);
  };

  const handleDeployProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setSelectedProjectId(id);
      setSelectedProjectName(project.name);
      setDeployModalOpen(true);
    }
  };

  const handleDeployComplete = async () => {
    if (selectedProjectId) {
      await deployProject(selectedProjectId);
    }
    setDeployModalOpen(false);
  };

  // Filter projects based on search query and status filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      project.deploymentStatus === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Projects</h1>
              <p className="text-gray-600 max-w-2xl">
                Manage all your generated websites from one place
              </p>
            </div>
            <button
              onClick={() => navigate('/prompt')}
              className="button-primary mt-4 md:mt-0 flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              <span>Create New Project</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="building">Building</option>
                  <option value="deployed">Deployed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onView={handleViewProject}
                  onDeploy={handleDeployProject}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-xl p-8 text-center"
            >
              <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== 'all'
                  ? "We couldn't find any projects matching your filters."
                  : "You haven't created any projects yet."}
              </p>
              {searchQuery || filterStatus !== 'all' ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterStatus('all');
                  }}
                  className="button-secondary"
                >
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={() => navigate('/prompt')}
                  className="button-primary flex items-center mx-auto"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  <span>Create Your First Project</span>
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      <DeployModal
        isOpen={deployModalOpen}
        onClose={handleDeployComplete}
        projectId={selectedProjectId}
        projectName={selectedProjectName}
      />
    </div>
  );
};

export default Dashboard;
