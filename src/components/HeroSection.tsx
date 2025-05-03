
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple particle animation
    if (!particlesRef.current) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    particlesRef.current.appendChild(canvas);
    
    const resizeCanvas = () => {
      if (particlesRef.current) {
        canvas.width = particlesRef.current.clientWidth;
        canvas.height = particlesRef.current.clientHeight;
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const drawParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connections between close particles
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.sqrt(
            Math.pow(particle.x - particles[j].x, 2) +
            Math.pow(particle.y - particles[j].y, 2)
          );
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      
      requestAnimationFrame(drawParticles);
    };
    
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (particlesRef.current) {
        particlesRef.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <section className="min-h-screen pt-20 flex items-center relative overflow-hidden">
      <div ref={particlesRef} className="particles-bg" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-scryptex-purple/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-scryptex-lightpurple/20 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 py-20 flex flex-col items-center animate-fade-in">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-scryptex-purple via-scryptex-lightpurple to-white text-transparent bg-clip-text">
            Revolutionize Web3 Research with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Scryptex empowers on-chain research, farming automation, and project insights using AI agents.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-opacity text-white rounded-full px-8"
          >
            <Link to="/dashboard" className="flex items-center gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 relative">
          <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden gradient-border">
            <div className="bg-black/40 p-1">
              <div className="relative rounded-md overflow-hidden">
                {/* Mock UI Preview */}
                <div className="bg-black/80 rounded-md p-4 backdrop-blur">
                  <div className="h-80 w-full rounded flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 w-full h-full p-4">
                      <div className="col-span-2 bg-black/60 rounded-lg p-4 flex flex-col">
                        <div className="h-8 w-3/4 bg-scryptex-purple/20 rounded mb-4"></div>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="bg-scryptex-purple/10 rounded"></div>
                          <div className="bg-scryptex-purple/20 rounded"></div>
                          <div className="bg-scryptex-purple/30 rounded"></div>
                          <div className="bg-scryptex-purple/10 rounded"></div>
                        </div>
                      </div>
                      <div className="col-span-1 flex flex-col gap-4">
                        <div className="h-1/2 bg-black/60 rounded-lg p-3">
                          <div className="h-4 w-2/3 bg-scryptex-purple/20 rounded mb-3"></div>
                          <div className="h-24 bg-scryptex-purple/10 rounded-lg"></div>
                        </div>
                        <div className="h-1/2 bg-black/60 rounded-lg p-3">
                          <div className="h-4 w-1/2 bg-scryptex-purple/20 rounded mb-3"></div>
                          <div className="h-4 w-full bg-scryptex-purple/10 rounded mb-2"></div>
                          <div className="h-4 w-full bg-scryptex-purple/10 rounded mb-2"></div>
                          <div className="h-4 w-full bg-scryptex-purple/10 rounded mb-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
