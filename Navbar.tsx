
import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, PlusCircle, Shield, Settings, Zap } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const handleFeatureSoon = (feature: string) => {
    alert(`${feature} interface will be available in the next deployment update.`);
  };

  return (
    <nav className="glass-nav border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => onNavigate(AppView.LANDING)}
          >
            <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors duration-500">VIPER</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <button 
              onClick={() => onNavigate(AppView.DASHBOARD)}
              className={`flex items-center gap-2 text-sm font-black tracking-tight transition-all duration-500 ${currentView === AppView.DASHBOARD ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate(AppView.BUILDER)}
              className={`flex items-center gap-2 text-sm font-black tracking-tight transition-all duration-500 ${currentView === AppView.BUILDER ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <PlusCircle className="w-4 h-4" />
              Build
            </button>
            <button 
              onClick={() => handleFeatureSoon('Security Vault')}
              className="flex items-center gap-2 text-sm font-black tracking-tight text-slate-400 hover:text-slate-900 transition-all duration-500"
            >
              <Shield className="w-4 h-4" />
              Security
            </button>
            <button 
              onClick={() => handleFeatureSoon('Global Settings')}
              className="flex items-center gap-2 text-sm font-black tracking-tight text-slate-400 hover:text-slate-900 transition-all duration-500"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleFeatureSoon('System Status')}
              className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all duration-500 border border-slate-100"
            >
              <Zap className="w-5 h-5" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
