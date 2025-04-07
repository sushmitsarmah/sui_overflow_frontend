
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowUpRight, Code, Globe } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  prompt: string;
  previewImage: string;
  deploymentStatus: 'draft' | 'building' | 'deployed' | 'failed';
  suinsName?: string;
  walrusUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
  onView: (id: string) => void;
  onDeploy: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView, onDeploy }) => {
  const getStatusColor = () => {
    switch (project.deploymentStatus) {
      case 'deployed':
        return 'bg-green-500';
      case 'building':
        return 'bg-amber-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (project.deploymentStatus) {
      case 'deployed':
        return 'Deployed';
      case 'building':
        return 'Building';
      case 'failed':
        return 'Failed';
      default:
        return 'Draft';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img 
          src={project.previewImage} 
          alt={project.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor()} text-white`}>
            {getStatusText()}
          </span>
          {project.suinsName && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary text-xs font-medium text-white">
              SUINS
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 truncate">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="mb-4">
          <div className="text-xs text-gray-500">Prompt</div>
          <div className="text-sm bg-gray-50 p-2 rounded mt-1 line-clamp-2 font-mono">
            {project.prompt}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-4">
          Created {new Date(project.createdAt).toLocaleDateString()}
          {project.suinsName && (
            <div className="mt-1 font-medium text-primary">
              {project.suinsName}.sui
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => onView(project.id)}
            className="button-secondary !py-2 !px-4 text-sm flex items-center gap-1"
          >
            <Code size={16} />
            <span>Preview</span>
          </button>
          
          {project.deploymentStatus === 'deployed' ? (
            <a 
              href={project.walrusUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="button-primary !py-2 !px-4 text-sm flex items-center gap-1"
            >
              <Globe size={16} />
              <span>Visit</span>
            </a>
          ) : (
            <button 
              onClick={() => onDeploy(project.id)}
              disabled={project.deploymentStatus === 'building'}
              className={`button-primary !py-2 !px-4 text-sm flex items-center gap-1 
                ${project.deploymentStatus === 'building' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowUpRight size={16} />
              <span>Deploy</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
