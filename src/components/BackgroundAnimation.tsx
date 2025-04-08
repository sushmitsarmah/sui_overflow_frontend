
import React from 'react';
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
    x: number;
    y: number;
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

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <AnimatedBlob
        color="#6C63FF" // Primary color
        initialPosition={{ x: '-10%', y: '10%' }}
        size={400}
        blur={100}
        opacity={0.07}
        duration={25}
      />
      <AnimatedBlob
        color="#F9A826" // Accent color
        initialPosition={{ x: '70%', y: '20%' }}
        size={350}
        blur={90}
        opacity={0.05}
        duration={28}
        delay={1}
      />
      <AnimatedBlob
        color="#6C63FF" // Primary
        initialPosition={{ x: '40%', y: '60%' }}
        size={500}
        blur={110}
        opacity={0.06}
        duration={30}
        delay={2}
      />
      <AnimatedBlob
        color="#F9A826" // Accent
        initialPosition={{ x: '85%', y: '80%' }}
        size={250}
        blur={80}
        opacity={0.04}
        duration={22}
        delay={1.5}
      />
    </div>
  );
};

export default BackgroundAnimation;
