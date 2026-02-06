import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  fullWidth = false,
  leftIcon = null,
  className = '',
  ...props
}) => {
  const baseClasses =
    'font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-3';

  const variants = {
    primary: 'bg-button-1 text-button-2 hover:bg-blue-600 disabled:bg-gray-400 focus:ring-blue-500',
    secondary:
      'bg-global-1 text-button-1 border border-[#747775] hover:bg-gray-50 disabled:bg-gray-100 focus:ring-gray-500',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400 focus:ring-gray-500',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm sm:px-4 sm:py-2',
    medium: 'px-4 py-1.5 text-base sm:px-6 sm:py-2',
    large: 'px-6 py-2 text-lg sm:px-8 sm:py-3',
  };

  const buttonClasses = `
    ${baseClasses} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClasses} {...props}>
      {leftIcon && <img src={leftIcon} alt="" className="w-4 h-4" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
