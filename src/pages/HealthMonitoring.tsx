// HealthMonitoring.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Activity, Heart, Thermometer, Droplet } from 'lucide-react';
import { useStore } from '../store';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function HealthMonitoring() {
  const { selectedPatient } = useStore();

  const vitalSigns = selectedPatient?.vitalSigns ?? {
    heartRate: 75,
    bloodPressure: "120/80",
    temperature: 98.6,
    oxygenLevel: 98
  };

  const chartData = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [75, 76, 74, 75, 77, 75],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(239, 68, 68)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Health Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VitalCard icon={<Heart className="w-6 h-6 text-red-500" />} label="Heart Rate" value={vitalSigns.heartRate} unit="bpm" />
        <VitalCard icon={<Activity className="w-6 h-6 text-blue-500" />} label="Blood Pressure" value={vitalSigns.bloodPressure} unit="mmHg" />
        <VitalCard icon={<Thermometer className="w-6 h-6 text-orange-500" />} label="Temperature" value={`${vitalSigns.temperature}°`} unit="F" />
        <VitalCard icon={<Droplet className="w-6 h-6 text-indigo-500" />} label="Oxygen Level" value={vitalSigns.oxygenLevel} unit="%" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Heart Rate Trend</h2>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Anomaly Detection</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-700">No anomalies detected in the last 24 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Device Status</h2>
          <div className="space-y-4">
            {[
              'Heart Rate Monitor',
              'Blood Pressure Monitor',
              'Temperature Sensor',
              'Oxygen Sensor'
            ].map(device => (
              <div key={device} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>{device}</span>
                </div>
                <span className="text-sm text-gray-500">Connected</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VitalCard({ icon, label, value, unit }: { icon: React.ReactNode; label: string; value: number | string; unit: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold">{label}</h3>
      </div>
      <p className="text-3xl font-bold">
        {value} <span className="text-lg font-normal text-gray-500">{unit}</span>
      </p>
    </div>
  );
}
