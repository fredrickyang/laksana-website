"use client";

import { useEffect, useState } from "react";

interface VRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VRModal({ isOpen, onClose }: VRModalProps) {
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return;
    }

    const timeout = setTimeout(() => setMounted(false), 250);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Close Button - Outside Iframe */}
      <button
        onClick={onClose}
        className="absolute top-8 right-20 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-300 backdrop-blur-sm z-50 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.354l11.5 11.5m0-11.5l-11.5 11.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </button>

      <div
        className={`relative w-11/12 h-5/6 max-w-6xl bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Iframe */}
        <iframe
          src="https://www.vr-illustratorasia.xyz/Laksana%20Business%20Park/250831/"
          className="w-full h-full border-none"
          title="Laksana Business Park VR"
          allowFullScreen
        />
      </div>
    </div>
  );
}