
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from '@suiet/wallet-kit';
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import PromptPage from "./pages/PromptPage";
import PreviewPage from "./pages/PreviewPage";
import AIPreviewPage from "./pages/AIPreviewPage";
import Subscription from "./pages/Subscription";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";
import "@suiet/wallet-kit/style.css";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  // Generate animated stars for the background
  useEffect(() => {
    const generateStars = () => {
      const starsContainer = document.querySelector('.stars');
      if (!starsContainer) return;
      
      // Clear existing stars
      starsContainer.innerHTML = '';
      
      const starCount = 100;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2;
        
        // Random animation delay
        const delay = Math.random() * 4;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
      }
    };
    
    generateStars();
    
    // Regenerate stars on window resize
    window.addEventListener('resize', generateStars);
    
    return () => {
      window.removeEventListener('resize', generateStars);
    };
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WalletProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen relative">
                <BackgroundAnimation />
                <div className="stars"></div>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/prompt" element={<PromptPage />} />
                    <Route path="/preview/:projectId" element={<PreviewPage />} />
                    <Route path="/ai-preview" element={<AIPreviewPage />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </WalletProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
