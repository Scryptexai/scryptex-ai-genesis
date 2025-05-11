// Web3AIBackground.tsx
import React, { useEffect, useRef } from 'react';

const Web3AIBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Modern purple-neon blue color palette
    const colors = {
      primary: '#8B5CF6',     // Vibrant Purple
      secondary: '#3B82F6',   // Neon Blue
      accent: '#10B981',      // Cyan accent
      neonPink: '#EC4899',    // Neon Pink
      neonBlue: '#06B6D4',    // Bright Cyan
      highlight: '#A78BFA',    // Light Purple
      connection: 'rgba(139, 92, 246, 0.15)',
      glowPurple: 'rgba(139, 92, 246, 0.4)',
      glowBlue: 'rgba(59, 130, 246, 0.4)',
      grid: 'rgba(147, 197, 253, 0.05)',
      text: 'rgba(167, 139, 250, 0.7)'
    };
    
    // Node types for different AI components
    const NODE_TYPES = {
      AI_CORE: 'ai-core',
      NEURAL: 'neural',
      DATA_STREAM: 'data-stream',
      BLOCKCHAIN: 'blockchain',
      QUANTUM: 'quantum'
    };
    
    // Enhanced node interface
    interface EnhancedNode {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      type: string;
      pulseRadius: number;
      pulseOpacity: number;
      glowIntensity: number;
      isActive: boolean;
      orbitRadius: number;
      orbitAngle: number;
      orbitSpeed: number;
      energy: number;
      connections: EnhancedNode[];
      color: string;
      trailPoints: { x: number; y: number; opacity: number }[];
    }
    
    const nodes: EnhancedNode[] = [];
    const dataStreams: { start: EnhancedNode; end: EnhancedNode; progress: number; speed: number; color: string }[] = [];
    
    // Create advanced nodes with more properties
    const createNodes = () => {
      const nodeCount = Math.floor(window.innerWidth / 80); // Optimal density
      
      for (let i = 0; i < nodeCount; i++) {
        // Assign node type with weighted probability
        let type;
        const rand = Math.random();
        if (rand < 0.2) {
          type = NODE_TYPES.AI_CORE;
        } else if (rand < 0.4) {
          type = NODE_TYPES.NEURAL;
        } else if (rand < 0.6) {
          type = NODE_TYPES.DATA_STREAM;
        } else if (rand < 0.8) {
          type = NODE_TYPES.BLOCKCHAIN;
        } else {
          type = NODE_TYPES.QUANTUM;
        }
        
        // Base color based on type
        let color = colors.primary;
        switch (type) {
          case NODE_TYPES.AI_CORE:
            color = colors.neonPink;
            break;
          case NODE_TYPES.NEURAL:
            color = colors.secondary;
            break;
          case NODE_TYPES.DATA_STREAM:
            color = colors.neonBlue;
            break;
          case NODE_TYPES.BLOCKCHAIN:
            color = colors.highlight;
            break;
          case NODE_TYPES.QUANTUM:
            color = colors.accent;
            break;
        }
        
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: type === NODE_TYPES.AI_CORE ? Math.random() * 4 + 3 : Math.random() * 2.5 + 1.5,
          vx: (Math.random() - 0.5) * 0.15, // Slower for smooth motion
          vy: (Math.random() - 0.5) * 0.15,
          type: type,
          pulseRadius: 0,
          pulseOpacity: 0,
          glowIntensity: 0.5 + Math.random() * 0.5,
          isActive: Math.random() < 0.3,
          orbitRadius: Math.random() * 100 + 50,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitSpeed: (Math.random() - 0.5) * 0.001,
          energy: Math.random(),
          connections: [],
          color: color,
          trailPoints: []
        });
      }
    };
    
    createNodes();
    
    // Advanced hexagon grid pattern
    const createHexagonPattern = () => {
      const size = 50;
      const height = size * Math.sqrt(3);
      
      // Create gradient for grid lines
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, colors.glowPurple);
      gradient.addColorStop(0.5, colors.grid);
      gradient.addColorStop(1, colors.glowBlue);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 0.5;
      
      for (let y = -height; y < canvas.height + height; y += height) {
        const isOddRow = Math.floor(y / height) % 2 === 1;
        const xOffset = isOddRow ? size * 1.5 : 0;
        
        for (let x = -size * 3; x < canvas.width + size * 3; x += size * 3) {
          drawHexagon(x + xOffset, y, size);
        }
      }
    };
    
    // Draw hexagon with glow effect
    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.save();
      
      // Add subtle glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = colors.glowBlue;
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.stroke();
      
      ctx.restore();
    };
    
    // Draw AI neural pattern with modern look
    const drawNeuralPattern = (x: number, y: number, radius: number, color: string) => {
      const branches = 4 + Math.floor(Math.random() * 3);
      const branchLength = radius * 4;
      
      for (let i = 0; i < branches; i++) {
        const angle = (i * 2 * Math.PI) / branches + Math.sin(Date.now() * 0.0001) * 0.2;
        const endX = x + Math.cos(angle) * branchLength;
        const endY = y + Math.sin(angle) * branchLength;
        
        // Create gradient for branches
        const gradient = ctx.createLinearGradient(x, y, endX, endY);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Create curved line with bezier curve
        const controlPointDistance = branchLength * 0.5;
        const controlX = x + Math.cos(angle) * controlPointDistance + Math.sin(Date.now() * 0.0005) * 20;
        const controlY = y + Math.sin(angle) * controlPointDistance + Math.cos(Date.now() * 0.0005) * 20;
        
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add glowing nodes at ends
        if (Math.random() > 0.3) {
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = color;
          
          ctx.beginPath();
          ctx.arc(endX, endY, radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          
          ctx.restore();
        }
      }
    };
    
    // Draw quantum computing pattern
    const drawQuantumPattern = (x: number, y: number, radius: number) => {
      const rings = 3;
      const particles = 6;
      
      for (let r = 0; r < rings; r++) {
        const ringRadius = radius * (r + 1) * 2;
        
        // Draw orbit ring
        ctx.beginPath();
        ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.3 - r * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw particles on orbit
        for (let p = 0; p < particles; p++) {
          const angle = (p * Math.PI * 2) / particles + Date.now() * 0.0002 * (r + 1);
          const px = x + Math.cos(angle) * ringRadius;
          const py = y + Math.sin(angle) * ringRadius;
          
          // Particle glow
          const particleGradient = ctx.createRadialGradient(px, py, 0, px, py, radius);
          particleGradient.addColorStop(0, colors.accent);
          particleGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          
          ctx.beginPath();
          ctx.arc(px, py, radius * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = particleGradient;
          ctx.fill();
        }
      }
    };
    
    // Data stream visualization
    const createDataStream = () => {
      if (Math.random() < 0.02 && nodes.length > 1) {
        const startNode = nodes[Math.floor(Math.random() * nodes.length)];
        const endNode = nodes[Math.floor(Math.random() * nodes.length)];
        
        if (startNode !== endNode) {
          dataStreams.push({
            start: startNode,
            end: endNode,
            progress: 0,
            speed: 0.005 + Math.random() * 0.005, // Slow motion
            color: Math.random() > 0.5 ? colors.neonBlue : colors.neonPink
          });
        }
      }
    };
    
    // Digital rain effect
    const drawDigitalRain = () => {
      ctx.fillStyle = colors.text;
      ctx.font = '10px monospace';
      
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
      const charSize = 10;
      
      for (let x = 0; x < canvas.width; x += charSize * 3) {
        if (Math.random() < 0.01) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const y = Math.random() * canvas.height;
          ctx.fillText(char, x, y);
        }
      }
    };
    
    // Animation variables
    let frameCount = 0;
    let time = 0;
    
    // Main animation loop
    const animate = () => {
      // Semi-transparent clear for trail effect
      ctx.fillStyle = 'rgba(1, 11, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw background elements
      createHexagonPattern();
      
      // Update time for smooth animations
      time += 0.008; // Slow motion
      frameCount += 1;
      
      // Create occasional data streams
      createDataStream();
      
      // Update and draw data streams
      dataStreams.forEach((stream, index) => {
        stream.progress += stream.speed;
        
        if (stream.progress < 1) {
          const currentX = stream.start.x + (stream.end.x - stream.start.x) * stream.progress;
          const currentY = stream.start.y + (stream.end.y - stream.start.y) * stream.progress;
          
          // Draw stream particle with glow
          ctx.save();
          ctx.shadowBlur = 15;
          ctx.shadowColor = stream.color;
          
          ctx.beginPath();
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
          ctx.fillStyle = stream.color;
          ctx.fill();
          
          // Trail effect
          const gradient = ctx.createLinearGradient(
            stream.start.x, stream.start.y,
            currentX, currentY
          );
          gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
          gradient.addColorStop(1, stream.color);
          
          ctx.beginPath();
          ctx.moveTo(stream.start.x, stream.start.y);
          ctx.lineTo(currentX, currentY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          ctx.restore();
        } else {
          dataStreams.splice(index, 1);
        }
      });
      
      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position with orbital motion
        node.orbitAngle += node.orbitSpeed;
        const orbitX = Math.cos(node.orbitAngle) * node.orbitRadius * 0.1;
        const orbitY = Math.sin(node.orbitAngle) * node.orbitRadius * 0.1;
        
        node.x += node.vx + orbitX * 0.01;
        node.y += node.vy + orbitY * 0.01;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Update energy level
        node.energy += Math.sin(time + i) * 0.01;
        node.energy = Math.max(0.1, Math.min(1, node.energy));
        
        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i < j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const connectionThreshold = node.type === NODE_TYPES.AI_CORE ? 250 : 150;
            
            if (distance < connectionThreshold) {
              const opacity = (1 - distance / connectionThreshold) * 0.3 * node.energy;
              
              // Create gradient connection
              const gradient = ctx.createLinearGradient(
                node.x, node.y,
                otherNode.x, otherNode.y
              );
              gradient.addColorStop(0, node.color);
              gradient.addColorStop(0.5, colors.connection);
              gradient.addColorStop(1, otherNode.color);
              
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = opacity * 3;
              ctx.stroke();
            }
          }
        });
        
        // Draw special patterns for active nodes
        if (node.isActive) {
          switch (node.type) {
            case NODE_TYPES.AI_CORE:
            case NODE_TYPES.NEURAL:
              drawNeuralPattern(node.x, node.y, node.radius * 2, node.color);
              break;
            case NODE_TYPES.QUANTUM:
              drawQuantumPattern(node.x, node.y, node.radius);
              break;
          }
        }
        
        // Draw node with glow effect
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        nodeGradient.addColorStop(0, node.color);
        nodeGradient.addColorStop(0.4, node.color);
        nodeGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = node.color;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * node.energy, 0, Math.PI * 2);
        ctx.fillStyle = nodeGradient;
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        
        ctx.restore();
        
        // Pulse effect for AI cores
        if (node.type === NODE_TYPES.AI_CORE && Math.sin(time * 2) > 0.5) {
          const pulseRadius = node.radius * 3 * (1 + Math.sin(time * 3) * 0.2);
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}88`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      
      // Add digital rain effect occasionally
      if (frameCount % 10 === 0) {
        drawDigitalRain();
      }
      
      // AI text overlay
      if (frameCount % 300 < 150) {
        ctx.fillStyle = colors.text;
        ctx.font = '12px monospace';
        const texts = ['AI PROCESSING', 'NEURAL NETWORK', 'QUANTUM COMPUTING', 'BLOCKCHAIN VERIFIED', 'DATA STREAMING'];
        
        texts.forEach((text, i) => {
          if (Math.random() < 0.02) {
            const x = Math.random() * (canvas.width - 150);
            const y = Math.random() * canvas.height;
            ctx.fillText(text, x, y);
          }
        });
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full"
      style={{ 
        opacity: 0.8,
        background: 'linear-gradient(135deg, #0a0416 0%, #1a0933 25%, #0f172a 50%, #1e1b4b 75%, #0a0416 100%)',
        filter: 'contrast(1.1) brightness(1.1)'
      }}
    />
  );
};

export default Web3AIBackground;