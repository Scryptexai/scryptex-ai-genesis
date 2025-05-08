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
    
    // Theme colors
    const colors = {
      primary: '#64FFDA',     // Teal for AI nodes
      secondary: '#7B5FFA',   // Purple for blockchain nodes
      tertiary: '#FF7E5F',    // Orange for data nodes
      connection: 'rgba(255, 255, 255, 0.12)',
      highlight: 'rgba(100, 255, 218, 0.6)',
      grid: 'rgba(255, 255, 255, 0.04)'
    };
    
    // Node types
    const NODE_TYPES = {
      AI: 'ai',
      BLOCKCHAIN: 'blockchain',
      DATA: 'data'
    };
    
    // Network nodes with type and pulse properties
    const nodes: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      type: string;
      pulseRadius: number;
      pulseOpacity: number;
      pulseDirection: boolean;
      isSpecial: boolean;
      connectionCount: number;
    }[] = [];
    
    // Create initial nodes
    const createNodes = () => {
      const nodeCount = Math.floor(window.innerWidth / 70); // More nodes for denser network
      
      for (let i = 0; i < nodeCount; i++) {
        // Assign node type
        let type;
        const rand = Math.random();
        if (rand < 0.35) {
          type = NODE_TYPES.AI;
        } else if (rand < 0.7) {
          type = NODE_TYPES.BLOCKCHAIN;
        } else {
          type = NODE_TYPES.DATA;
        }
        
        // Some nodes will be special (larger)
        const isSpecial = Math.random() < 0.1;
        
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isSpecial ? Math.random() * 3 + 2 : Math.random() * 1.5 + 1,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          type: type,
          pulseRadius: 0,
          pulseOpacity: 0,
          pulseDirection: true,
          isSpecial: isSpecial,
          connectionCount: 0
        });
      }
    };
    
    createNodes();
    
    // Create hexagon pattern in background
    const createHexagonPattern = () => {
      const size = 40;
      const height = size * Math.sqrt(3);
      
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      
      for (let y = 0; y < canvas.height + height; y += height) {
        const isOddRow = Math.floor(y / height) % 2 === 1;
        const xOffset = isOddRow ? size * 1.5 : 0;
        
        for (let x = 0; x < canvas.width + size * 3; x += size * 3) {
          drawHexagon(x + xOffset, y, size * 0.8);
        }
      }
    };
    
    // Draw individual hexagon
    const drawHexagon = (x: number, y: number, size: number) => {
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
    };
    
    // Animation variables
    let frameCount = 0;
    const pulseInterval = 120; // How often to pulse nodes
    
    // Draw AI "neuron" pattern
    const drawNeuronPattern = (x: number, y: number, radius: number) => {
      const branches = 3 + Math.floor(Math.random() * 3);
      const branchLength = radius * 3;
      
      for (let i = 0; i < branches; i++) {
        const angle = (i * 2 * Math.PI) / branches + Math.random() * 0.3;
        const endX = x + Math.cos(angle) * branchLength;
        const endY = y + Math.sin(angle) * branchLength;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Create a curved line with control point
        const controlPointDistance = branchLength * 0.5;
        const controlX = x + Math.cos(angle) * controlPointDistance + (Math.random() - 0.5) * 20;
        const controlY = y + Math.sin(angle) * controlPointDistance + (Math.random() - 0.5) * 20;
        
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.strokeStyle = 'rgba(100, 255, 218, 0.15)';
        ctx.stroke();
        
        // Add small nodes at the end of some branches
        if (Math.random() > 0.5) {
          ctx.beginPath();
          ctx.arc(endX, endY, radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(100, 255, 218, 0.3)';
          ctx.fill();
        }
      }
    };
    
    // Draw blockchain-like pattern
    const drawBlockchainPattern = (x: number, y: number, radius: number) => {
      const blockSize = radius * 2;
      const blocks = 2 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < blocks; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius * 4 * Math.random();
        const bx = x + Math.cos(angle) * distance;
        const by = y + Math.sin(angle) * distance;
        
        // Draw block
        ctx.beginPath();
        ctx.rect(bx - blockSize/2, by - blockSize/2, blockSize, blockSize);
        ctx.strokeStyle = 'rgba(123, 95, 250, 0.2)';
        ctx.stroke();
        
        // Connect block to center
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = 'rgba(123, 95, 250, 0.1)';
        ctx.stroke();
      }
    };
    
    // Periodic pulse effect for nodes
    const pulseNode = (node: any) => {
      node.pulseDirection = true;
      node.pulseRadius = 0;
      node.pulseOpacity = 0.6;
    };
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw hexagon grid background
      createHexagonPattern();
      
      // Increment frame counter
      frameCount += 1;
      
      // Periodically pulse random nodes
      if (frameCount % pulseInterval === 0) {
        const randomIndex = Math.floor(Math.random() * nodes.length);
        pulseNode(nodes[randomIndex]);
      }
      
      // Reset connection counts
      nodes.forEach(node => {
        node.connectionCount = 0;
      });
      
      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        
        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Limit connections per node for better performance and visual clarity
          const connectionThreshold = nodeA.isSpecial || nodeB.isSpecial ? 200 : 150;
          
          if (distance < connectionThreshold && nodeA.connectionCount < 5 && nodeB.connectionCount < 5) {
            const opacity = 0.12 * (1 - distance / connectionThreshold);
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            
            // Different connection colors based on node types
            if (nodeA.type === nodeB.type) {
              switch (nodeA.type) {
                case NODE_TYPES.AI:
                  ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
                  break;
                case NODE_TYPES.BLOCKCHAIN:
                  ctx.strokeStyle = `rgba(123, 95, 250, ${opacity})`;
                  break;
                case NODE_TYPES.DATA:
                  ctx.strokeStyle = `rgba(255, 126, 95, ${opacity})`;
                  break;
                default:
                  ctx.strokeStyle = colors.connection;
              }
            } else {
              // Mixed connections
              ctx.strokeStyle = colors.connection;
            }
            
            ctx.lineWidth = nodeA.isSpecial || nodeB.isSpecial ? 1.2 : 0.8;
            ctx.stroke();
            
            // Show data transfer animation along connections
            if ((frameCount % 180 < 90) && Math.random() < 0.03) {
              const particlePosition = Math.random();
              const px = nodeA.x + (nodeB.x - nodeA.x) * particlePosition;
              const py = nodeA.y + (nodeB.y - nodeA.y) * particlePosition;
              
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fill();
            }
            
            nodeA.connectionCount++;
            nodeB.connectionCount++;
          }
        }
        
        // Draw node pulse effect
        if (nodeA.pulseOpacity > 0.01) {
          ctx.beginPath();
          ctx.arc(nodeA.x, nodeA.y, nodeA.pulseRadius, 0, Math.PI * 2);
          
          let pulseColor;
          switch (nodeA.type) {
            case NODE_TYPES.AI:
              pulseColor = `rgba(100, 255, 218, ${nodeA.pulseOpacity})`;
              break;
            case NODE_TYPES.BLOCKCHAIN:
              pulseColor = `rgba(123, 95, 250, ${nodeA.pulseOpacity})`;
              break;
            case NODE_TYPES.DATA:
              pulseColor = `rgba(255, 126, 95, ${nodeA.pulseOpacity})`;
              break;
            default:
              pulseColor = `rgba(255, 255, 255, ${nodeA.pulseOpacity})`;
          }
          
          ctx.fillStyle = pulseColor;
          ctx.fill();
          
          // Update pulse
          if (nodeA.pulseDirection) {
            nodeA.pulseRadius += 0.5;
            nodeA.pulseOpacity -= 0.01;
            
            if (nodeA.pulseRadius > 30) {
              nodeA.pulseDirection = false;
            }
          } else {
            nodeA.pulseOpacity -= 0.01;
          }
        }
        
        // Draw special patterns for special nodes
        if (nodeA.isSpecial) {
          switch (nodeA.type) {
            case NODE_TYPES.AI:
              drawNeuronPattern(nodeA.x, nodeA.y, nodeA.radius);
              break;
            case NODE_TYPES.BLOCKCHAIN:
              drawBlockchainPattern(nodeA.x, nodeA.y, nodeA.radius);
              break;
            default:
              // No special pattern for data nodes
              break;
          }
        }
        
        // Draw node with correct color
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        
        switch (nodeA.type) {
          case NODE_TYPES.AI:
            ctx.fillStyle = colors.primary;
            break;
          case NODE_TYPES.BLOCKCHAIN:
            ctx.fillStyle = colors.secondary;
            break;
          case NODE_TYPES.DATA:
            ctx.fillStyle = colors.tertiary;
            break;
          default:
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        }
        
        ctx.fill();
        
        // Draw a subtle glow for special nodes
        if (nodeA.isSpecial) {
          ctx.beginPath();
          ctx.arc(nodeA.x, nodeA.y, nodeA.radius + 2, 0, Math.PI * 2);
          
          let glowColor;
          switch (nodeA.type) {
            case NODE_TYPES.AI:
              glowColor = 'rgba(100, 255, 218, 0.3)';
              break;
            case NODE_TYPES.BLOCKCHAIN:
              glowColor = 'rgba(123, 95, 250, 0.3)';
              break;
            case NODE_TYPES.DATA:
              glowColor = 'rgba(255, 126, 95, 0.3)';
              break;
            default:
              glowColor = 'rgba(255, 255, 255, 0.3)';
          }
          
          const glowGradient = ctx.createRadialGradient(
            nodeA.x, nodeA.y, nodeA.radius,
            nodeA.x, nodeA.y, nodeA.radius + 8
          );
          glowGradient.addColorStop(0, glowColor);
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
        
        // Update node position with slightly varied speed based on type
        let speedFactor = 1;
        if (nodeA.type === NODE_TYPES.AI) speedFactor = 1.1;
        if (nodeA.type === NODE_TYPES.BLOCKCHAIN) speedFactor = 0.8;
        
        nodeA.x += nodeA.vx * speedFactor;
        nodeA.y += nodeA.vy * speedFactor;
        
        // Bounce off edges with slight randomization
        if (nodeA.x < 0 || nodeA.x > canvas.width) {
          nodeA.vx *= -1;
          nodeA.vx += (Math.random() - 0.5) * 0.02; // Add slight randomness
        }
        if (nodeA.y < 0 || nodeA.y > canvas.height) {
          nodeA.vy *= -1;
          nodeA.vy += (Math.random() - 0.5) * 0.02; // Add slight randomness
        }
        
        // Occasionally change direction slightly
        if (Math.random() < 0.01) {
          nodeA.vx += (Math.random() - 0.5) * 0.1;
          nodeA.vy += (Math.random() - 0.5) * 0.1;
          
          // Limit maximum velocity
          const speed = Math.sqrt(nodeA.vx * nodeA.vx + nodeA.vy * nodeA.vy);
          if (speed > 0.8) {
            nodeA.vx = (nodeA.vx / speed) * 0.8;
            nodeA.vy = (nodeA.vy / speed) * 0.8;
          }
        }
      }
      
      // Binary/data pattern overlay (subtle)
      if (frameCount % 300 < 150) {
        const binarySize = 10;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.font = `${binarySize}px monospace`;
        
        for (let x = 0; x < canvas.width; x += binarySize * 4) {
          for (let y = 0; y < canvas.height; y += binarySize * 2) {
            if (Math.random() < 0.1) {
              const digit = Math.random() > 0.5 ? '1' : '0';
              ctx.fillText(digit, x, y);
            }
          }
        }
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
        opacity: 0.5,
        background: 'linear-gradient(to bottom right, #010b19, #0a192f)' 
      }}
    />
  );
};

export default Web3AIBackground;