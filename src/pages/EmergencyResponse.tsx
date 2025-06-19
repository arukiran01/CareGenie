import React from 'react';
import { MapPin, Phone, AlertTriangle, UserPlus } from 'lucide-react';
import { useStore } from '../store';

export default function EmergencyResponse() {
  const { alerts } = useStore();

  const emergencyContacts = [
    { name: 'Dr. James Wilson', role: 'Primary Physician', phone: '+1 (555) 123-4567' },
    { name: 'Memorial Hospital', role: 'Emergency Room', phone: '+1 (555) 987-6543' },
    { name: 'Mary Johnson', role: 'Family Contact', phone: '+1 (555) 234-5678' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Emergency Response</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Active Emergencies</h2>
          <div className="space-y-4">
            {alerts
              .filter(alert => alert.type === 'emergency')
              .map(alert => (
                <div key={alert.id} className="flex items-center gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="font-medium text-red-700">{alert.message}</p>
                    <p className="text-sm text-red-600">{alert.timestamp}</p>
                  </div>
                  <button className="ml-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                    Respond
                  </button>
                </div>
              ))}
            {alerts.filter(alert => alert.type === 'emergency').length === 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700">No active emergencies</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Patient Location</h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Map view will be displayed here</span>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <p className="text-blue-700">123 Healthcare Ave, Medical District, City</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map(contact => (
            <div key={contact.name} className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{contact.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Emergency Protocols</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-2">Fall Detection Protocol</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Verify patient consciousness</li>
                <li>Contact primary caregiver</li>
                <li>Dispatch emergency services if needed</li>
                <li>Monitor vital signs</li>
              </ol>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-2">Medical Emergency Protocol</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Assess vital signs</li>
                <li>Contact emergency services</li>
                <li>Notify family members</li>
                <li>Prepare medical history report</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Response History</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div>
                <p className="font-medium">Fall Alert - Resolved</p>
                <p className="text-sm text-gray-600">Yesterday at 2:30 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div>
                <p className="font-medium">Irregular Heartbeat - Resolved</p>
                <p className="text-sm text-gray-600">2 days ago at 10:15 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}