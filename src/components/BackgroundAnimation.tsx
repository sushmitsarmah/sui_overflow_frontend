
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBlobProps {
  className?: string;
  delay?: number;
  duration?: number;
  size?: number;
  color?: string;
  blur?: number;
  opacity?: number;
  initialPosition?: {
    x: number | string;
    y: number | string;
  };
}

const AnimatedBlob: React.FC<AnimatedBlobProps> = ({
  className,
  delay = 0,
  duration = 20,
  size = 300,
  color = '#6C63FF',
  blur = 70,
  opacity = 0.1,
  initialPosition = { x: 0, y: 0 },
}) => {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity,
        top: initialPosition.y,
        left: initialPosition.x,
      }}
      animate={{
        x: [0, 50, -30, 20, 0],
        y: [0, -40, 20, -20, 0],
        scale: [1, 1.1, 0.9, 1.05, 1],
        rotate: [0, 5, -5, 3, 0],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        delay,
      }}
    />
  );
};

interface ConcentricCircleProps {
  size: number;
  color: string;
  duration: number;
  delay: number;
  initialPosition: {
    x: number | string;
    y: number | string;
  };
}

const ConcentricCircle: React.FC<ConcentricCircleProps> = ({
  size,
  color,
  duration,
  delay,
  initialPosition,
}) => {
  const [currentColor, setCurrentColor] = useState(color);
  
  // Change color periodically
  useEffect(() => {
    const colors = ['#6C63FF', '#F9A826', '#FF6B6B', '#4ECDC4', '#9D50BB', '#45B8AC'];
    
    const intervalId = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setCurrentColor(randomColor);
    }, duration * 1000 / 2); // Change color halfway through animation cycle
    
    return () => clearInterval(intervalId);
  }, [duration]);

  return (
    <motion.div
      className="absolute border-4 rounded-full"
      style={{
        width: size,
        height: size,
        borderColor: currentColor,
        top: initialPosition.y,
        left: initialPosition.x,
        opacity: 0.4,
      }}
      animate={{
        scale: [1, 1.1, 0.9, 1.2, 1],
        x: [0, 100, -50, 25, 0],
        y: [0, -50, 30, -30, 0],
        opacity: [0.4, 0.6, 0.3, 0.5, 0.4],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
};

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Original blobs */}
      <AnimatedBlob
        color="#6C63FF" // Primary color
        initialPosition={{ x: -10, y: '10%' }}
        size={400}
        blur={100}
        opacity={0.07}
        duration={25}
      />
      <AnimatedBlob
        color="#F9A826" // Accent color
        initialPosition={{ x: '70%', y: 20 }}
        size={350}
        blur={90}
        opacity={0.05}
        duration={28}
        delay={1}
      />
      <AnimatedBlob
        color="#6C63FF" // Primary
        initialPosition={{ x: '40%', y: 60 }}
        size={500}
        blur={110}
        opacity={0.06}
        duration={30}
        delay={2}
      />
      <AnimatedBlob
        color="#F9A826" // Accent
        initialPosition={{ x: '85%', y: 80 }}
        size={250}
        blur={80}
        opacity={0.04}
        duration={22}
        delay={1.5}
      />
      
      {/* Concentric circles */}
      <ConcentricCircle 
        size={200} 
        color="#6C63FF" 
        duration={15} 
        delay={0}
        initialPosition={{ x: '25%', y: '30%' }} 
      />
      <ConcentricCircle 
        size={400} 
        color="#F9A826" 
        duration={20} 
        delay={2}
        initialPosition={{ x: '60%', y: '40%' }} 
      />
      <ConcentricCircle 
        size={600} 
        color="#FF6B6B" 
        duration={25} 
        delay={1}
        initialPosition={{ x: '45%', y: '50%' }} 
      />
      <ConcentricCircle 
        size={800} 
        color="#4ECDC4" 
        duration={30} 
        delay={3}
        initialPosition={{ x: '50%', y: '60%' }} 
      />
      <ConcentricCircle 
        size={1000} 
        color="#9D50BB" 
        duration={35} 
        delay={0.5}
        initialPosition={{ x: '40%', y: '20%' }} 
      />
      
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/30 to-gray-800/50 -z-10" />
    </div>
  );
};

export default BackgroundAnimation;
