export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'stable' | 'critical' | 'warning';
  vitalSigns: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenLevel: number;
  };
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface Alert {
  id: string;
  patientId: string;
  type: 'health' | 'emergency' | 'routine';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
}

export interface Task {
  id: string;
  patientId: string;
  type: 'medication' | 'appointment' | 'checkup';
  title: string;
  description: string;
  datetime: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}