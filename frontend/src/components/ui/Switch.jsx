import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  className = '',
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    setIsChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };

  const sizeClasses = {
    small: {
      container: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    medium: {
      container: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    large: {
      container: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  const currentSize = sizeClasses[size];

  const containerClasses = `
    relative inline-flex items-center
    ${currentSize.container}
    rounded-full
    transition-colors duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${isChecked ? 'bg-button-1' : 'bg-gray-200'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  const thumbClasses = `
    inline-block
    ${currentSize.thumb}
    rounded-full
    bg-white
    shadow-lg
    transform
    transition-transform duration-200 ease-in-out
    ${isChecked ? currentSize.translate : 'translate-x-0'}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      disabled={disabled}
      className={containerClasses}
      {...props}
    >
      <span className={thumbClasses} />
    </button>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Switch;
