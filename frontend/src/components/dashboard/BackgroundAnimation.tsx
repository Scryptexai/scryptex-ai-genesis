
import { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      shape: "circle" | "square" | "triangle" | "diamond";
    }[] = [];

    const shapes = ["circle", "square", "triangle", "diamond"];
    
    const createParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 8);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          color: `rgba(${131 + Math.random() * 50}, ${56 + Math.random() * 30}, ${236 + Math.random() * 20}, ${0.4 + Math.random() * 0.3})`,
          shape: shapes[Math.floor(Math.random() * shapes.length)] as "circle" | "square" | "triangle" | "diamond"
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create subtle gradient in the background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(21, 18, 58, 0.2)");
      gradient.addColorStop(1, "rgba(13, 10, 46, 0.2)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle, index) => {
        // Draw particle
        ctx.beginPath();
        
        switch(particle.shape) {
          case "circle":
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            break;
          case "square":
            ctx.rect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2);
            break;
          case "triangle":
            ctx.moveTo(particle.x, particle.y - particle.size);
            ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
            ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
            break;
          case "diamond":
            ctx.moveTo(particle.x, particle.y - particle.size);
            ctx.lineTo(particle.x + particle.size, particle.y);
            ctx.lineTo(particle.x, particle.y + particle.size);
            ctx.lineTo(particle.x - particle.size, particle.y);
            break;
        }
        
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(131, 56, 236, ${0.15 * (1 - distance / 120)})`;
              ctx.lineWidth = 0.6;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx = -particle.vx;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy = -particle.vy;
        }
      });

      // Occasionally change particle directions for more organic movement
      if (Math.random() < 0.01) {
        const randomIndex = Math.floor(Math.random() * particles.length);
        particles[randomIndex].vx = (Math.random() - 0.5) * 0.4;
        particles[randomIndex].vy = (Math.random() - 0.5) * 0.4;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full opacity-40 z-0"
      />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-radial from-purple-900/20 to-transparent z-0 opacity-50" />
      
      {/* Add subtle glow effects in corners */}
      <div className="fixed top-0 left-0 w-[30vw] h-[30vh] bg-purple-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="fixed bottom-0 right-0 w-[20vw] h-[20vh] bg-indigo-600/10 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 z-0" />
    </>
  );
};

export default BackgroundAnimation;
