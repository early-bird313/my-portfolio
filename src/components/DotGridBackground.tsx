import { useEffect, useRef } from "react";

const DotGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false
    };

    let time = 0;
    const spacing = 28; // Space between dots (px)

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.018; // Speed of the continuous rolling light waves

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      // Draw each dot in the matrix
      for (let r = 0; r < rows; r++) {
        const y = r * spacing;

        // Wave component 1: primary vertical rolling wave of light
        const wave1 = Math.sin(y * 0.015 - time * 2.2);

        // Wave component 2: subtle horizontal ripple modulation
        const wave2 = Math.cos(r * 0.12 + time * 1.1);

        for (let c = 0; c < cols; c++) {
          const x = c * spacing;

          // Combined undulating light wave
          const waveX = Math.sin(x * 0.012 + wave2 * 0.8 + time * 0.9);
          const combined = (wave1 * 0.65 + waveX * 0.35 + 1) / 2; // 0 to 1

          // Non-linear power creates focused bright bands with dark spaces (matching reference)
          let power = Math.pow(combined, 3.2);

          // Mouse proximity glow
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 160) {
              const mouseGlow = (1 - dist / 160) * 0.6;
              power = Math.min(1, power + mouseGlow);
            }
          }

          // Radius: 1px (dim) up to 2.4px (bright wave crest)
          const radius = 1.0 + power * 1.4;

          // Controlled opacity: from 0.06 (subtle) to 0.42 (illuminated wave)
          const alpha = 0.06 + power * 0.38;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (power > 0.45) {
            // Illuminated dots in the wave crest: Crisp white center + Electric Lime halo
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();

            // Soft electric lime outer glow for highest crest
            if (power > 0.7) {
              ctx.beginPath();
              ctx.arc(x, y, radius + 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(204, 255, 0, ${alpha * 0.45})`;
              ctx.fill();
            }
          } else {
            // Ambient background dots: Soft dim neutral dots
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
          }
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dot-grid-background-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0
      }}
    />
  );
};

export default DotGridBackground;
