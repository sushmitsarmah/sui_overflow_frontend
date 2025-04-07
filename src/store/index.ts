
import { create } from 'zustand';
import { Project } from '../components/ProjectCard';

export interface SiteForgeState {
  // Auth and wallet state
  isWalletConnected: boolean;
  walletAddress: string | null;
  hasSubscription: boolean;
  
  // Projects state
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  
  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  mintSubscription: () => Promise<void>;
  createProject: (prompt: string) => Promise<Project>;
  fetchProjects: () => Promise<void>;
  getProject: (id: string) => Promise<Project | null>;
  deployProject: (id: string) => Promise<void>;
}

// Utility to generate mock projects
const generateMockProjects = (count: number): Project[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `project-${i + 1}`,
    name: `Project ${i + 1}`,
    description: `This is a sample project description for project ${i + 1}. It demonstrates what your site could look like.`,
    prompt: `Create a ${i % 2 === 0 ? 'portfolio' : 'landing page'} site with ${i % 3 === 0 ? 'dark mode' : 'light mode'}`,
    previewImage: `https://picsum.photos/seed/${i + 1}/800/600`,
    deploymentStatus: i % 4 === 0 ? 'draft' : i % 4 === 1 ? 'building' : i % 4 === 2 ? 'deployed' : 'failed',
    suinsName: i % 3 === 0 ? `project-${i + 1}` : undefined,
    walrusUrl: i % 4 === 2 ? `https://project-${i + 1}.walrus.app` : undefined,
    createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString(),
  }));
};

export const useSiteForgeStore = create<SiteForgeState>((set, get) => ({
  // Initial state
  isWalletConnected: false,
  walletAddress: null,
  hasSubscription: false,
  projects: [],
  currentProject: null,
  isLoading: false,
  
  // Actions
  connectWallet: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({
      isWalletConnected: true,
      walletAddress: '0x' + Math.random().toString(16).slice(2, 12),
      isLoading: false,
    });
  },
  
  disconnectWallet: () => {
    set({
      isWalletConnected: false,
      walletAddress: null,
      hasSubscription: false,
    });
  },
  
  mintSubscription: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    set({
      hasSubscription: true,
      isLoading: false,
    });
  },
  
  createProject: async (prompt) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: prompt.split(' ').slice(0, 3).join(' '),
      description: prompt,
      prompt: prompt,
      previewImage: `https://picsum.photos/seed/${Date.now()}/800/600`,
      deploymentStatus: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set(state => ({
      projects: [newProject, ...state.projects],
      currentProject: newProject,
      isLoading: false,
    }));
    
    return newProject;
  },
  
  fetchProjects: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockProjects = generateMockProjects(8);
    
    set({
      projects: mockProjects,
      isLoading: false,
    });
  },
  
  getProject: async (id) => {
    const { projects } = get();
    const project = projects.find(p => p.id === id);
    
    if (project) {
      set({ currentProject: project });
      return project;
    }
    
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, generate a random project
    const mockProject: Project = {
      id,
      name: `Project ${id}`,
      description: `This is a detailed description for project ${id}. It demonstrates various features.`,
      prompt: `Create a website for project ${id} with modern design`,
      previewImage: `https://picsum.photos/seed/${id}/800/600`,
      deploymentStatus: Math.random() > 0.5 ? 'deployed' : 'draft',
      suinsName: Math.random() > 0.7 ? `project-${id}` : undefined,
      walrusUrl: Math.random() > 0.5 ? `https://project-${id}.walrus.app` : undefined,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set({
      currentProject: mockProject,
      isLoading: false,
    });
    
    return mockProject;
  },
  
  deployProject: async (id) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    set(state => ({
      projects: state.projects.map(project => 
        project.id === id 
          ? { 
              ...project, 
              deploymentStatus: 'deployed',
              walrusUrl: `https://project-${id}.walrus.app`,
              suinsName: state.hasSubscription ? project.name.toLowerCase().replace(/\s+/g, '-') : undefined,
              updatedAt: new Date().toISOString()
            } 
          : project
      ),
      isLoading: false,
    }));
  },
}));
