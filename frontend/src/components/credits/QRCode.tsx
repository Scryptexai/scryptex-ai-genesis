
import { useEffect, useRef } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCode = ({ value, size = 128, bgColor = "#242938", fgColor = "#a855f7" }: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // This is a simplified mock QR code renderer
  // In a real app, you'd use a library like qrcode.react
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    
    // Draw mock QR code pattern (just for visual representation)
    const blockSize = size / 25;
    ctx.fillStyle = fgColor;
    
    // Position detection patterns (the three big squares in the corners)
    // Top left
    ctx.fillRect(2 * blockSize, 2 * blockSize, 7 * blockSize, 7 * blockSize);
    ctx.fillStyle = bgColor;
    ctx.fillRect(3 * blockSize, 3 * blockSize, 5 * blockSize, 5 * blockSize);
    ctx.fillStyle = fgColor;
    ctx.fillRect(4 * blockSize, 4 * blockSize, 3 * blockSize, 3 * blockSize);
    
    // Top right
    ctx.fillStyle = fgColor;
    ctx.fillRect(16 * blockSize, 2 * blockSize, 7 * blockSize, 7 * blockSize);
    ctx.fillStyle = bgColor;
    ctx.fillRect(17 * blockSize, 3 * blockSize, 5 * blockSize, 5 * blockSize);
    ctx.fillStyle = fgColor;
    ctx.fillRect(18 * blockSize, 4 * blockSize, 3 * blockSize, 3 * blockSize);
    
    // Bottom left
    ctx.fillStyle = fgColor;
    ctx.fillRect(2 * blockSize, 16 * blockSize, 7 * blockSize, 7 * blockSize);
    ctx.fillStyle = bgColor;
    ctx.fillRect(3 * blockSize, 17 * blockSize, 5 * blockSize, 5 * blockSize);
    ctx.fillStyle = fgColor;
    ctx.fillRect(4 * blockSize, 18 * blockSize, 3 * blockSize, 3 * blockSize);
    
    // Draw some random blocks to make it look like a QR code
    ctx.fillStyle = fgColor;
    const randomBlocks = 150; // Number of random blocks to draw
    for (let i = 0; i < randomBlocks; i++) {
      const x = Math.floor(Math.random() * 23) + 1;
      const y = Math.floor(Math.random() * 23) + 1;
      
      // Skip the areas where we already have position detection patterns
      if ((x < 9 && y < 9) || (x > 15 && y < 9) || (x < 9 && y > 15)) {
        continue;
      }
      
      ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
    
    // Draw some horizontal lines
    for (let i = 0; i < 3; i++) {
      const y = 10 + i * 2;
      ctx.fillRect(2 * blockSize, y * blockSize, 21 * blockSize, blockSize / 2);
    }
    
  }, [value, size, bgColor, fgColor]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={size} 
      height={size} 
      className="rounded-lg border border-purple-900/30"
    />
  );
};

export default QRCode;
