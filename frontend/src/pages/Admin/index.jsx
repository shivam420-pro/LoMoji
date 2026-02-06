import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const sidebarEntities = [
  {
    name: 'Users',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0z"
        />
      </svg>
    ),
  },
  {
    name: 'Logs',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2a4 4 0 014-4h3m4 0V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h7"
        />
      </svg>
    ),
  },
];

const AdminPanel = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-30 transition-all duration-200 ease-in-out ${sidebarExpanded ? 'w-56' : 'w-[50px]'} group`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="flex flex-col items-center py-6 space-y-4 h-full">
          {sidebarEntities.map((entity, idx) => (
            <div
              key={entity.name}
              className="flex items-center w-full px-2 py-2 cursor-pointer hover:bg-purple-100 rounded-lg transition-all"
            >
              <span>{entity.icon}</span>
              <span
                className={`ml-3 text-gray-800 font-medium transition-all duration-200 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}
              >
                {entity.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div
        className={`flex-1 ml-[50px] transition-all duration-200 ${sidebarExpanded ? 'ml-56' : 'ml-[50px]'} p-8`}
      >
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        {/* User Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan={3}>
                      Loading...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan={3}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-purple-50 cursor-pointer"
                      onClick={() => navigate(`/admin/${user._id}/details`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/${user._id}/details`);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
