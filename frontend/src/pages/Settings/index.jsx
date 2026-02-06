import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';

const Settings = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    autoSave: true,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save settings
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} onLogout={logout} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

          <div className="space-y-6">
            {/* Notifications Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleToggle('emailNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-600">Receive push notifications</p>
                  </div>
                  <button
                    onClick={() => handleToggle('pushNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.pushNotifications ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Dark Mode</h3>
                    <p className="text-sm text-gray-600">Switch to dark theme</p>
                  </div>
                  <button
                    onClick={() => handleToggle('darkMode')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.darkMode ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Auto Save</h3>
                    <p className="text-sm text-gray-600">Automatically save your work</p>
                  </div>
                  <button
                    onClick={() => handleToggle('autoSave')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoSave ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900">Account Information</h3>
                  <p className="text-sm text-gray-600 mt-1">Email: {user?.email}</p>
                  <p className="text-sm text-gray-600">
                    Member since: {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Save Settings
                  </Button>
                  <Button
                    onClick={() => alert('This feature is not implemented yet.')}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
