import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && visible && (
        <div
          className={`fixed top-6 right-6 z-50 min-w-[220px] px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-gray-800'}`}
          style={{ opacity: visible ? 1 : 0 }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
