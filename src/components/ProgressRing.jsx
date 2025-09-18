// src/components/ProgressRing.jsx
import React from "react";

export default function ProgressRing({ size = 64, stroke = 6, progress = 0 }) {
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="inline-block">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx={center} cy={center} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="url(#g1)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        fill="none"
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: "stroke-dashoffset 450ms ease" }}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" style={{ fill: "white", fontSize: 12 }}>
        {Math.round(progress)}%
      </text>
    </svg>
  );
}
