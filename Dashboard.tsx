
import React from 'react';
import { BotConfig } from '../types';
import { Plus, Trash2, ExternalLink, Server, ChevronRight, Settings2, Bot, Power } from 'lucide-react';

interface DashboardProps {
  bots: BotConfig[];
  onCreateNew: () => void;
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ bots, onCreateNew, onDelete }) => {
  const handleAction = (id: string, action: string) => {
    alert(`${action} initialized for instance [${id}]`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Your Fleet</h1>
          <p className="text-slate-400 mt-4 font-bold text-xl">Operational monitoring for active Viper instances.</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="group flex items-center gap-4 px-12 py-6 bg-emerald-600 text-white font-black rounded-full hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-100 active:scale-95 text-xl"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          Deploy New Unit
        </button>
      </div>

      {bots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-48 px-4 text-center border-2 border-dashed border-slate-100 rounded-[80px] bg-slate-50/20">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-slate-100 blur-3xl rounded-full scale-150 opacity-50"></div>
            <div className="relative p-12 bg-white rounded-[40px] shadow-2xl border border-slate-100">
              <Server className="w-20 h-20 text-slate-100" />
            </div>
          </div>
          <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Hangar Empty</h3>
          <p className="text-slate-400 max-w-sm mb-16 font-bold text-xl leading-relaxed">The Viper network is ready for your first architectural deployment.</p>
          <button 
            onClick={onCreateNew}
            className="group flex items-center gap-4 px-12 py-6 bg-slate-900 text-white font-black rounded-full hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-200 text-xl"
          >
            Initiate Architect <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {bots.map((bot) => (
            <div key={bot.id} className="group relative bg-white border border-slate-100 rounded-[64px] overflow-hidden hover:border-emerald-500/50 transition-all duration-700 premium-shadow">
              <div className="p-12">
                <div className="flex items-start justify-between mb-12">
                  <div className="p-6 bg-slate-50 rounded-[32px] group-hover:bg-emerald-50 transition-colors duration-500">
                    <Bot className="w-10 h-10 text-slate-900 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-3.5 h-3.5 rounded-full ${bot.status === 'online' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse' : 'bg-slate-200'}`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${bot.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {bot.status}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-300 tracking-widest uppercase">Node: VP-{bot.id.slice(0,4)}</span>
                  </div>
                </div>

                <h3 className="text-4xl font-black text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors tracking-tight">{bot.name}</h3>
                <p className="text-slate-400 font-bold text-lg line-clamp-2 mb-12 leading-relaxed h-14">{bot.description}</p>

                <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleAction(bot.id, 'Unit Settings')}
                      className="p-4 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-3xl transition-all"
                    >
                      <Settings2 className="w-7 h-7" />
                    </button>
                    <button 
                      onClick={() => onDelete(bot.id)}
                      className="p-4 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-3xl transition-all"
                    >
                      <Trash2 className="w-7 h-7" />
                    </button>
                  </div>
                  <button 
                    onClick={() => handleAction(bot.id, 'Remote Terminal')}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-sm font-black rounded-3xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                  >
                    Console <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;