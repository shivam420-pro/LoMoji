import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ children, className = '' }) => {
  return (
    <footer className={`w-full bg-global-1 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </footer>
  );
};

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Footer;
