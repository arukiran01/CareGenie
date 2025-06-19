import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  MessageSquare,
  Send,
  Smile,
  Brain,
  Music,
  GamepadIcon
} from 'lucide-react';
import { useStore } from '../store';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Companion() {
  const { chatMessages, addChatMessage } = useStore();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: any = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    addChatMessage(newMessage);
    setMessage('');
  };

  const activities = [
    { icon: <Brain className="w-6 h-6" />, name: 'Memory Games', description: 'Exercise your mind' },
    { icon: <Music className="w-6 h-6" />, name: 'Music Therapy', description: 'Relax with calming tunes' },
    { icon: <GamepadIcon className="w-6 h-6" />, name: 'Cognitive Tasks', description: 'Fun brain training' },
  ];

  // Mood Chart Sample Data
  const moodData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Mood Score',
        data: [3, 4, 5, 2, 4],
        backgroundColor: '#4f46e5',
        borderRadius: 6,
      },
    ],
  };

  const moodOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, max: 5 }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Companion</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.role === 'user' ? 'text-indigo-200' : 'text-gray-500'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Mood Analysis</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Smile className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Current Mood</span>
                </div>
                <span className="text-green-600">Positive</span>
              </div>
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <Bar data={moodData} options={moodOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Activities</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <button
                  key={activity.name}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    {activity.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
