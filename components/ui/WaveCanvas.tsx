"use client";

import React, { useRef, useEffect } from "react";

interface Props {
  isThinking: boolean;
  height?: number;
}

export default function WaveCanvas({ isThinking, height = 200 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // One time counter per wave
    const times = [0, 2, 4];
    // Base speeds for each wave
    const baseSpeeds = [0.00001, 0.000015, 0.000007];
    // Phase offsets to vary their starting points
    const phaseOffsets = [0, Math.PI / 2, Math.PI];

    // Resize once
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      times.forEach((t, i) => {
        ctx.beginPath();
        ctx.strokeStyle = ["#2f855a", "#38a169", "#48bb78"][i];
        ctx.lineWidth   = 3;

        // Draw the i-th wave
        for (let x = 0; x <= canvas.width; x += 2) {
          const speedFactor = isThinking ? 4 : 1;
          // Advance only this wave’s time
          times[i] += baseSpeeds[i] * speedFactor;

          // Composite of two sines with a unique phase offset
          const y =
            height * 0.5 +
            Math.sin(x / 120 + times[i] + phaseOffsets[i]) * (25 + 5 * i) +
            Math.sin(x / 180 + times[i] * 0.5 - phaseOffsets[i]) * (12 + 3 * i);

          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.stroke();
      });

      requestAnimationFrame(draw);
    }

    draw();
    return () => window.removeEventListener("resize", resize);
  }, [isThinking, height]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-0"
      style={{ height: `${height}px` }}
    />
  );
}