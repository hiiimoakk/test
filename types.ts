
export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  BUILDER = 'BUILDER',
  BOT_DETAILS = 'BOT_DETAILS'
}

export interface BotConfig {
  id: string;
  name: string;
  description: string;
  status: 'online' | 'offline' | 'deploying';
  commands: string[];
  token?: string;
  clientId?: string;
  clientSecret?: string;
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  status?: 'thinking' | 'testing' | 'making' | 'idle';
}

export interface DeploymentStep {
  label: string;
  isComplete: boolean;
  isActive: boolean;
}
