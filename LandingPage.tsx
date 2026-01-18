
import React from 'react';
import { ArrowRight, Code2, Cloud, Layout, Cpu, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative bg-white overflow-hidden min-h-screen selection:bg-emerald-600 selection:text-white">
      {/* Immersive Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-[180px] -z-10 glow-blob"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-sky-100/20 rounded-full blur-[150px] -z-10 glow-blob" style={{ animationDelay: '-5s' }}></div>
      
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-black tracking-tighter text-slate-900 uppercase">VIPER</span>
        </div>
        <div>
          <button 
            onClick={onStart}
            className="px-8 py-3 bg-slate-900 text-white text-sm font-black rounded-full hover:bg-emerald-600 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] transition-all duration-500 active:scale-95"
          >
            Launch Platform
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-48 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Deployment Nucleus
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
          <span className="text-gradient">Architect Your</span> <br />
          <span className="text-gradient-emerald text-glow-emerald">Discord Empire.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-16 font-bold leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          Elite cloud infrastructure and advanced AI reasoning <br className="hidden md:block" />
          for the next generation of professional Discord applications.
        </p>
        
        <div className="flex flex-col items-center gap-12 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <button 
            onClick={onStart}
            className="group px-14 py-6 bg-emerald-600 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.5)] text-xl flex items-center gap-4"
          >
            Start Building <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="bg-slate-50/50 py-32 border-t border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Code2 className="w-7 h-7 text-emerald-600" />,
                title: "Slash Native",
                desc: "Every deployment utilizes global command trees and automated permission validation."
              },
              {
                icon: <Cloud className="w-7 h-7 text-sky-600" />,
                title: "Viper Cloud",
                desc: "Production-ready isolated nodes with dedicated RAM and zero throttled bandwidth."
              },
              {
                icon: <Globe className="w-7 h-7 text-indigo-600" />,
                title: "Edge Delivery",
                desc: "Millisecond-perfect response times across all global regions for elite performance."
              }
            ].map((f, i) => (
              <div key={i} className="p-12 rounded-[40px] bg-white border border-slate-100 premium-shadow group hover:-translate-y-4 transition-all duration-700">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:bg-emerald-50 group-hover:text-emerald-600">{f.icon}</div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tighter">{f.title}</h3>
                <p className="text-slate-400 font-bold text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center opacity-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 font-black text-xl tracking-tighter text-slate-900 italic">
          <div className="flex items-center justify-center">HYPERION.v3</div>
          <div className="flex items-center justify-center">SECURE_L6</div>
          <div className="flex items-center justify-center">EDGE_NODES</div>
          <div className="flex items-center justify-center">AI_NUCLEUS</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
