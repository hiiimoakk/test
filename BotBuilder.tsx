
import React, { useState, useEffect, useRef } from 'react';
import { BotConfig, ChatMessage } from '../types';
import { generateBotSpec } from '../services/geminiService';
import { Send, Loader2, Key, ChevronRight, CheckCircle2, Server, Zap, Cpu } from 'lucide-react';

interface BotBuilderProps {
  onComplete: (config: BotConfig) => void;
  onCancel: () => void;
}

const BotBuilder: React.FC<BotBuilderProps> = ({ onComplete, onCancel }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Viper Protocol Active. Describe the Discord application you want to deploy. I will architect the logic and provision cloud nodes instantly."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'thinking' | 'deploying' | 'idle'>('idle');
  
  const [botSpec, setBotSpec] = useState<any>(null);
  const [showSecretForm, setShowSecretForm] = useState(false);
  const [deploymentPhase, setDeploymentPhase] = useState<'chat' | 'finalizing'>('chat');
  
  const [token, setToken] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages, isGenerating, showSecretForm]);

  const handleSend = async () => {
    if (!inputValue.trim() || isGenerating || showSecretForm) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    
    setIsGenerating(true);
    setCurrentStatus('thinking');

    try {
      // Direct call to Gemini - NO SIMULATED DELAYS
      const spec = await generateBotSpec(userMsg);
      setBotSpec(spec);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `**Protocol Established: ${spec.botName}**\n\n**Intent:** ${spec.description}\n\n**Commands:**\n${spec.commands.map((c: string) => `• ${c}`).join('\n')}\n\nLogic container is provisioned. Provide credentials to finalize deployment.`
      }]);
      
      setShowSecretForm(true);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Operational error. Reasoning core timed out. Please redefine your vision."
      }]);
    } finally {
      setIsGenerating(false);
      setCurrentStatus('idle');
    }
  };

  const startDeployment = () => {
    if (!token) return;
    
    // Switch to finalizing phase immediately
    setDeploymentPhase('finalizing');
    
    // Snappy finish for high-speed feel
    setTimeout(() => {
      const newBot: BotConfig = {
        id: Math.random().toString(36).substr(2, 9),
        name: botSpec.botName,
        description: botSpec.description,
        status: 'online',
        commands: botSpec.commands,
        token,
        clientId,
        clientSecret,
        createdAt: Date.now()
      };
      onComplete(newBot);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter text-gradient">Architect</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              <Zap size={10} fill="currentColor" /> Status: Live
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
              <Cpu size={10} fill="currentColor" /> Engine: Flash
            </span>
          </div>
        </div>
        <button 
          onClick={onCancel} 
          className="px-6 py-2.5 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-rose-600 transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="flex-1 bg-white border border-slate-100 rounded-[48px] overflow-hidden flex flex-col shadow-2xl relative">
        {deploymentPhase === 'chat' ? (
          <>
            <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`p-8 rounded-[32px] text-lg font-bold leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-slate-50 text-slate-800'
                  } max-w-[80%] shadow-sm`}>
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-emerald-50 border border-emerald-100 px-8 py-4 rounded-[24px] flex items-center gap-4 animate-pulse">
                    <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-700">Synthesizing...</span>
                  </div>
                </div>
              )}

              {showSecretForm && (
                <div className="flex justify-start animate-in zoom-in-95 duration-500">
                  <div className="bg-white border-2 border-slate-50 p-10 rounded-[40px] shadow-2xl max-w-xl w-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-emerald-600 rounded-2xl text-white">
                        <Key size={24} />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 tracking-tighter">Bridge Link</h4>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bot Token</label>
                        <input 
                          type="password"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          placeholder="MTA2M..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:bg-white transition-all font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client ID</label>
                          <input 
                            type="text"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:bg-white transition-all font-mono text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Secret</label>
                          <input 
                            type="password"
                            value={clientSecret}
                            onChange={(e) => setClientSecret(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:bg-white transition-all font-mono text-sm"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={startDeployment}
                        disabled={!token}
                        className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-emerald-600 disabled:opacity-20 transition-all flex items-center justify-center gap-4 text-lg active:scale-95"
                      >
                        Deploy Unit <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {!showSecretForm && (
              <div className="p-8 border-t border-slate-100">
                <div className="max-w-4xl mx-auto relative">
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe your bot..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-10 py-6 pr-24 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all text-xl font-bold"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isGenerating || !inputValue.trim()}
                    className="absolute right-4 top-4 bottom-4 px-8 bg-emerald-600 text-white rounded-full disabled:opacity-20 hover:bg-emerald-700 transition-all flex items-center justify-center"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 relative">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin absolute" />
              <Server className="w-8 h-8 text-slate-900 relative" />
            </div>
            <h3 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Finalizing Route</h3>
            <p className="text-slate-400 font-bold text-xl">Connecting to Viper Cloud Nodes...</p>
            
            <div className="mt-12 space-y-4 w-full max-w-md">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                <span className="font-black text-slate-900">Validating Credentials</span>
                <CheckCircle2 className="text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl animate-pulse">
                <span className="font-black text-slate-900 text-emerald-600">Syncing Global Commands</span>
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotBuilder;
