
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
    for (let i = 0; i < 80; i++) {
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
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      <div ref={particlesRef} className="particles-bg" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-scryptex-purple/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-scryptex-lightpurple/20 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-scryptex-purple/30 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-scryptex-lightpurple" />
            </div>
            <span className="text-sm font-medium text-scryptex-lightpurple">AI-POWERED SECURITY</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-scryptex-purple via-scryptex-lightpurple to-white text-transparent bg-clip-text">
              Revolutionize Web3 Research
            </span> <br />with AI Intelligence
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Scryptex empowers on-chain research, farming automation, and project insights using AI agents. Never miss a crucial signal again.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-all text-white rounded-lg px-8 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="text-white border-white/20 hover:bg-white/10 transition-all rounded-lg"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600"></div>
            </div>
            <span className="text-sm text-gray-400">Trusted by <span className="text-white font-medium">10,000+</span> researchers</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-scryptex-purple/20 to-scryptex-lightpurple/20 rounded-lg blur-2xl"></div>
          <div className="w-full max-w-lg mx-auto rounded-lg overflow-hidden gradient-border">
            <div className="bg-black/80 p-1">
              <div className="relative rounded-md overflow-hidden">
                {/* Mock UI Preview */}
                <div className="bg-black/80 rounded-md p-4 backdrop-blur">
                  <div className="h-96 w-full rounded flex items-center justify-center">
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
