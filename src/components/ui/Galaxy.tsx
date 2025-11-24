"use client";

import { useEffect, useRef } from "react";

export default function Galaxy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; radius: number; angle: number }[] = [];
    const STAR_COUNT = 400;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.2 + 0.3,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const drawGalaxy = () => {
      time += 0.0005;

      ctx.clearRect(0, 0, w, h);

      // Nebula Glow
      const gradient = ctx.createRadialGradient(
        w * 0.5,
        h * 0.4,
        50,
        w * 0.5,
        h * 0.4,
        h * 0.9
      );
      gradient.addColorStop(0, "rgba(100, 0, 255, 0.4)");
      gradient.addColorStop(0.5, "rgba(50, 0, 150, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 50, 0.1)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Stars slow swirl
      for (const s of stars) {
        s.angle += 0.0002; // slow movement
        const r = 80 + Math.sin(time * 2 + s.x * 0.01) * 20;

        const nx = s.x + Math.cos(s.angle) * r * 0.01;
        const ny = s.y + Math.sin(s.angle) * r * 0.01;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.shadowBlur = 8;
        ctx.arc(nx, ny, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(drawGalaxy);
    };

    drawGalaxy();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 opacity-[0.65] pointer-events-none"
    />
  );
}

// "use client";

// import { useEffect, useRef } from "react";

// export default function Galaxy() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current!;
//     const ctx = canvas.getContext("2d")!;
//     let w = window.innerWidth;
//     let h = window.innerHeight;

//     const resize = () => {
//       w = window.innerWidth;
//       h = window.innerHeight;
//       canvas.width = w;
//       canvas.height = h;
//     };

//     resize();
//     window.addEventListener("resize", resize);

//     const STAR_COUNT = 1200;
//     const stars = [];

//     // Generate spiral galaxy stars
//     for (let i = 0; i < STAR_COUNT; i++) {
//       const radius = Math.pow(Math.random(), 0.45) * (Math.min(w, h) * 0.5);
//       const angle =
//         Math.random() * Math.PI * 2 +
//         radius * 0.015 * (Math.random() > 0.5 ? 1 : -1); // spiral arms

//       stars.push({
//         radius,
//         angle,
//         size: Math.random() * 1.5 + 0.3,
//         color: randomStarColor(),
//       });
//     }

//     // produce natural star colors
//     function randomStarColor() {
//       const r = Math.random();
//       if (r < 0.05) return "rgba(170,200,255,0.9)"; // blue giants
//       if (r < 0.3) return "rgba(255,255,255,0.9)"; // white stars
//       if (r < 0.6) return "rgba(255,220,150,0.9)"; // warm yellow
//       return "rgba(255,180,180,0.85)"; // red dwarfs
//     }

//     let t = 0;

//     const draw = () => {
//       t += 0.0006;

//       ctx.clearRect(0, 0, w, h);

//       // background
//       ctx.fillStyle = "rgba(2,0,20,1)";
//       ctx.fillRect(0, 0, w, h);

//       // galactic core glow
//       const core = ctx.createRadialGradient(
//         w / 2,
//         h / 2,
//         20,
//         w / 2,
//         h / 2,
//         250
//       );
//       core.addColorStop(0, "rgba(255,255,255,0.9)");
//       core.addColorStop(0.3, "rgba(255,200,180,0.6)");
//       core.addColorStop(1, "rgba(40,0,60,0)");

//       ctx.fillStyle = core;
//       ctx.fillRect(0, 0, w, h);

//       // draw spiral stars
//       for (const s of stars) {
//         const angle = s.angle + t * 0.4; // slow subtle rotation
//         const x = w / 2 + Math.cos(angle) * s.radius;
//         const y = h / 2 + Math.sin(angle) * s.radius;

//         ctx.beginPath();
//         ctx.shadowBlur = 8 * (1 - s.radius / (Math.min(w, h) * 0.5));
//         ctx.shadowColor = s.color;
//         ctx.fillStyle = s.color;
//         ctx.arc(x, y, s.size, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       // dust clouds
//       drawNebulaDust(ctx, w, h);

//       rafRef.current = requestAnimationFrame(draw);
//     };

//     draw();

//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full -z-10 opacity-[0.8] pointer-events-none"
//     />
//   );
// }

// // soft nebula dust clouds in purple/blue
// function drawNebulaDust(ctx: CanvasRenderingContext2D, w: number, h: number) {
//   const colors = [
//     "rgba(90,0,160,0.05)",
//     "rgba(150,0,200,0.04)",
//     "rgba(60,0,120,0.04)",
//   ];

//   for (let i = 0; i < 40; i++) {
//     const x = Math.random() * w;
//     const y = Math.random() * h;
//     const r = Math.random() * 250 + 80;

//     const g = ctx.createRadialGradient(x, y, 10, x, y, r);
//     g.addColorStop(0, colors[Math.floor(Math.random() * colors.length)]);
//     g.addColorStop(1, "rgba(0,0,0,0)");

//     ctx.fillStyle = g;
//     ctx.beginPath();
//     ctx.arc(x, y, r, 0, Math.PI * 2);
//     ctx.fill();
//   }
// }
