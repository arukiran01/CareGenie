import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Bell, Brain, Calendar, Heart, Home, Menu, Settings, User2, Activity, AlertTriangle, MessageSquare, Book } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import HealthMonitoring from './pages/HealthMonitoring';
import EmergencyResponse from './pages/EmergencyResponse';
import RoutineManagement from './pages/RoutineManagement';
import Companion from './pages/Companion';
import Knowledge from './pages/Knowledge';

function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/' },
    { icon: <Heart className="w-5 h-5" />, label: 'Health Monitoring', path: '/health' },
    { icon: <AlertTriangle className="w-5 h-5" />, label: 'Emergency Response', path: '/emergency' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Routine Management', path: '/routine' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Companion', path: '/companion' },
    { icon: <Book className="w-5 h-5" />, label: 'Knowledge Base', path: '/knowledge' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-indigo-900 text-white p-4">
      <div className="flex items-center gap-3 mb-8">
        <Brain className="w-8 h-8" />
        <h1 className="text-xl font-bold">CareGenie</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map(({ icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors
              ${isActive(path) ? 'bg-indigo-800' : 'hover:bg-indigo-800/50'}`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <Link
        to="/settings"
        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-indigo-800/50 mt-auto absolute bottom-4"
      >
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </Link>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4">
      <button className="lg:hidden">
        <Menu className="w-6 h-6" />
      </button>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-500" />
          <div className="w-2 h-2 bg-red-500 rounded-full" />
        </div>
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQHyzmvOkJriFw/profile-displayphoto-shrink_400_400/B56ZX_hdYsHEAg-/0/1743748716661?e=1749686400&v=beta&t=GqGc18lcrPY2SwQI53PSb4-5PI9KRgSDDAEqv0nnOz0"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">Dr. AruKiran Reddy</span>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:ml-64">
          <Header />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/health" element={<HealthMonitoring />} />
              <Route path="/emergency" element={<EmergencyResponse />} />
              <Route path="/routine" element={<RoutineManagement />} />
              <Route path="/companion" element={<Companion />} />
              <Route path="/knowledge" element={<Knowledge />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;