"use client";

import React from "react";

interface Props {
  isThinking: boolean;
}

export default function BackgroundAnimation({ isThinking }: Props) {
  const duration = isThinking ? "10s" : "30s";

  return (
    <div
      className="pointer-events-none fixed inset-0 bg-[url('/curves.svg')] bg-repeat-x bg-bottom"
      style={{ animation: `bgScroll ${duration} linear infinite` }}
    />
  );
}