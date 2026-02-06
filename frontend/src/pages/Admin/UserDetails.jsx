import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function formatDuration(ms) {
  if (!ms || ms < 0) return '-';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
}

const mockActivities = [
  { type: 'Icon Animation', name: 'Animated Logo', createdAt: '2025-06-01 10:00' },
  { type: 'Logo/Emoji', name: 'Smiley Emoji', createdAt: '2025-06-02 14:30' },
  { type: 'GIF', name: 'Welcome Animation', createdAt: '2025-06-03 09:15' },
  { type: 'Icon Animation', name: 'Button Animation', createdAt: '2025-06-04 16:45' },
];

const AdminUserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveDuration, setLiveDuration] = useState(0);
  const timerRef = useRef();
  const [activities, setActivities] = useState([]);
  const [modalSession, setModalSession] = useState(null);
  const [userSessions, setUserSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userRes = await fetch(`/api/admin/users/${id}`);
        const userData = await userRes.json();
        setUser(userData.user);
        const sessionRes = await fetch(`/api/admin/users/${id}/sessions`);
        const sessionData = await sessionRes.json();
        setSessions(sessionData.sessions || []);
        // Fetch real activities
        const activityRes = await fetch(`/api/admin/users/${id}/activities`);
        const activityData = await activityRes.json();
        setActivities(activityData.activities || []);
        // Fetch session manager data
        const sessionMgrRes = await fetch(`/api/admin/users/${id}/session-manager`);
        if (sessionMgrRes.ok) {
          const sessionMgrData = await sessionMgrRes.json();
          setUserSessions(sessionMgrData.sessions || []);
        } else {
          setUserSessions([]);
        }
      } catch (err) {
        setUser(null);
        setSessions([]);
        setActivities([]);
        setUserSessions([]);
      }
      setLoading(false);
    };
    fetchData();
    return () => clearInterval(timerRef.current);
  }, [id]);

  // Live session timer
  useEffect(() => {
    if (sessions.length > 0) {
      const latest = sessions[0];
      if (latest.activity === 'login' && !latest.logoutTime) {
        // Start live timer from login timestamp
        timerRef.current = setInterval(() => {
          setLiveDuration(Date.now() - new Date(latest.timestamp).getTime());
        }, 1000);
        return () => clearInterval(timerRef.current);
      }
    }
    setLiveDuration(0);
    return () => clearInterval(timerRef.current);
  }, [sessions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => navigate('/admin')}
          className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to Admin
        </button>
        <div className="bg-white rounded-lg shadow p-6">User not found.</div>
      </div>
    );
  }

  // Find most recent login/logout
  const latestSession = sessions.find((s) => s.activity === 'login');
  const latestLogout = sessions.find((s) => s.activity === 'logout');
  const loginTime = latestSession ? new Date(latestSession.timestamp) : null;
  const logoutTime = latestLogout ? new Date(latestLogout.timestamp) : null;
  // For demo: session end time = login + 1 hour
  const sessionEndTime = loginTime ? new Date(loginTime.getTime() + 60 * 60 * 1000) : null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate('/admin')}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Back to Admin
      </button>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        {/* Side-by-side layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Left: User Details */}
          <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="mb-4">
              <div className="text-lg font-semibold">Full Name:</div>
              <div className="text-gray-700">{user.fullName}</div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-semibold">Email:</div>
              <div className="text-gray-700">{user.email}</div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-semibold">Login Time:</div>
              <div className="text-gray-700">{loginTime ? loginTime.toLocaleString() : '-'}</div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-semibold">Logout Time:</div>
              <div className="text-gray-700">{logoutTime ? logoutTime.toLocaleString() : '-'}</div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-semibold">Session End Time:</div>
              <div className="text-gray-700">
                {sessionEndTime ? sessionEndTime.toLocaleString() : '-'}
              </div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-semibold">Current Login Duration:</div>
              <div className="text-purple-700 text-xl font-bold">
                {liveDuration ? formatDuration(liveDuration) : '-'}
              </div>
            </div>
          </div>
          {/* Right: Session Log */}
          <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h2 className="text-lg font-semibold mb-2">Session History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sessions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-2">
                        No session history found.
                      </td>
                    </tr>
                  ) : (
                    sessions.map((s, idx) => (
                      <tr
                        key={idx}
                        className="cursor-pointer hover:bg-purple-50"
                        onClick={() => setModalSession(s)}
                      >
                        <td className="px-4 py-2">{s.activity}</td>
                        <td className="px-4 py-2">{new Date(s.timestamp).toLocaleString()}</td>
                        <td className="px-4 py-2">
                          {s.duration ? formatDuration(s.duration) : '-'}
                        </td>
                        <td className="px-4 py-2">
                          {s.active ? (
                            <span className="text-green-600 font-semibold">Active</span>
                          ) : (
                            <span className="text-gray-500">Closed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Below: User Activities */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">User Activities</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-2">
                      No activities found.
                    </td>
                  </tr>
                ) : (
                  activities.map((a, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">{a.type}</td>
                      <td className="px-4 py-2">{a.name}</td>
                      <td className="px-4 py-2">
                        {a.createdAt ? new Date(a.createdAt).toLocaleString() : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Below: User Session Manager Data */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Session Manager Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userSessions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-2">
                      No session manager data found.
                    </td>
                  </tr>
                ) : (
                  userSessions.map((s, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">
                        {s.startTime ? new Date(s.startTime).toLocaleString() : '-'}
                      </td>
                      <td className="px-4 py-2">
                        {s.endTime ? new Date(s.endTime).toLocaleString() : '-'}
                      </td>
                      <td className="px-4 py-2">
                        {s.active ? (
                          <span className="text-green-600 font-semibold">Active</span>
                        ) : (
                          <span className="text-gray-500">Closed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Session Details Modal */}
        {modalSession && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-lg relative">
              <button
                onClick={() => setModalSession(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-semibold mb-4">Session Details</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Activity:</span> {modalSession.activity}
                </div>
                <div>
                  <span className="font-medium">Timestamp:</span>{' '}
                  {new Date(modalSession.timestamp).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{' '}
                  {modalSession.active ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-gray-500">Closed</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">Duration:</span>{' '}
                  {modalSession.duration ? formatDuration(modalSession.duration) : '-'}
                </div>
                {/* Add more fields if needed */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserDetails;
