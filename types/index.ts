export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  village?: string;
  district?: string;
  state?: string;
  preferredLanguage?: 'en' | 'hi' | 'kn';
  avatar?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CropDiagnosis {
  id: string;
  userId: string;
  imageUrl: string;
  cropType: string;
  disease?: string;
  confidence: number;
  symptoms: string[];
  remedies: string[];
  preventions: string[];
  createdAt: string;
}

export interface AdvisoryTopic {
  id: string;
  title: string;
  titleHi?: string;
  titleKn?: string;
  category: string;
  icon: string;
  description: string;
  content: string;
}

export interface GovtScheme {
  id: string;
  name: string;
  department: string;
  description: string;
  eligibility: string;
  benefits: string;
  applicationUrl?: string;
  deadline?: string;
}

export type Language = 'en' | 'hi' | 'kn';

export interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
  location: string;
  icon: string;
}
