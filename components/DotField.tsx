"use client";

import { useEffect, useRef } from "react";

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const gap = width < 768 ? 18 : 22;
      let column = 0;
      for (let y = gap; y < height; y += gap) {
        column = 0;
        for (let x = gap; x < width; x += gap) {
          context.fillStyle = column % 3 === 0 ? "rgba(231,168,62,0.32)" : column % 3 === 1 ? "rgba(140,174,150,0.26)" : "rgba(241,238,229,0.16)";
          context.beginPath();
          context.arc(x, y, 0.85, 0, Math.PI * 2);
          context.fill();
          column += 1;
        }
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
