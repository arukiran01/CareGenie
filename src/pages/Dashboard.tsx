import React from 'react';
import { Activity, Users, Bell, CheckSquare } from 'lucide-react';
import { useStore } from '../store';

export default function Dashboard() {
  const { alerts, tasks } = useStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Active Patients', value: '24', icon: <Users className="w-6 h-6 text-white" />, color: 'bg-blue-500' },
          { title: 'Critical Alerts', value: '3', icon: <Bell className="w-6 h-6 text-white" />, color: 'bg-red-500' },
          { title: 'Tasks Today', value: '12', icon: <CheckSquare className="w-6 h-6 text-white" />, color: 'bg-green-500' },
          { title: 'Active Monitoring', value: '8', icon: <Activity className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
        ].map(({ title, value, icon, color }) => (
          <div key={title} className="bg-white rounded-xl shadow-sm p-6">
            <div className={`w-12 h-12 ${color} rounded-lg mb-4 flex items-center justify-center`}>
              {icon}
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className={`w-3 h-3 rounded-full ${
                  alert.severity === 'high' ? 'bg-red-500' : 
                  alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-600">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <div className="space-y-4">
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  {task.type === 'medication' ? '💊' : task.type === 'appointment' ? '📅' : '🏥'}
                </div>
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.datetime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}