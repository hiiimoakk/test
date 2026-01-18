
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import BotBuilder from './components/BotBuilder';
import Navbar from './components/Navbar';
import { AppView, BotConfig } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [myBots, setMyBots] = useState<BotConfig[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('viper_bots');
    if (saved) {
      setMyBots(JSON.parse(saved));
    }
  }, []);

  const saveBots = (bots: BotConfig[]) => {
    setMyBots(bots);
    localStorage.setItem('viper_bots', JSON.stringify(bots));
  };

  const handleCreateBot = (config: BotConfig) => {
    saveBots([...myBots, config]);
    setView(AppView.DASHBOARD);
  };

  const renderView = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage onStart={() => setView(AppView.DASHBOARD)} />;
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            bots={myBots} 
            onCreateNew={() => setView(AppView.BUILDER)} 
            onDelete={(id) => saveBots(myBots.filter(b => b.id !== id))}
          />
        );
      case AppView.BUILDER:
        return <BotBuilder onComplete={handleCreateBot} onCancel={() => setView(AppView.DASHBOARD)} />;
      default:
        return <LandingPage onStart={() => setView(AppView.DASHBOARD)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {view !== AppView.LANDING && (
        <Navbar 
          currentView={view} 
          onNavigate={(v) => setView(v)} 
        />
      )}
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;
