import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ children, isOpen = false, onClose, className = '' }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-global-1 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 lg:w-auto
        ${className}
      `}
      >
        <div className="h-full overflow-y-auto p-4">{children}</div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default Sidebar;
