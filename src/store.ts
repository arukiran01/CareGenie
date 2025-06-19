import { create } from 'zustand';
import type { Patient, Alert, Task, ChatMessage } from './types';

interface Store {
  patients: Patient[];
  alerts: Alert[];
  tasks: Task[];
  chatMessages: ChatMessage[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  addAlert: (alert: Alert) => void;
  addTask: (task: Task) => void;
  addChatMessage: (message: ChatMessage) => void;
}

export const useStore = create<Store>((set) => ({
  patients: [],
  alerts: [],
  tasks: [],
  chatMessages: [],
  selectedPatient: null,
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  addChatMessage: (message) => 
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
}));