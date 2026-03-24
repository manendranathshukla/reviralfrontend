import React from 'react';
import { FaTools } from 'react-icons/fa';

export default function UnderMaintenance() {
  return (
    <div className="min-h-screen hero-gradient flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#1a3c8f]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 glass-card p-10 md:p-14 max-w-3xl w-full flex flex-col items-center shadow-2xl">
        <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-white/20">
          <FaTools className="text-5xl text-white animate-[spin_4s_linear_infinite]" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-5 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
          We're Under Maintenance
        </h1>
        
        <p className="text-blue-100/90 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
          We are currently performing scheduled maintenance to upgrade our systems and bring you a better digital experience. We'll be back online shortly!
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <a href="mailto:info@reviraltechnology.com" className="bg-accent hover:bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-accent/30 hover:-translate-y-1">
            Email Support
          </a>
          <a href="tel:+9779811418243" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-bold transition-all border border-white/20 hover:-translate-y-1">
            Call Us
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-blue-200/60 tracking-wider">
        &copy; {new Date().getFullYear()} REVIRAL TECHNOLOGY. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
}
