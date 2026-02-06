import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SquareEyes = ({
  isVisible = false,
  onClick,
  size = 'medium',
  className = '',
  blinkDuration = 300,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5 sm:w-6 sm:h-6',
    large: 'w-6 h-6 sm:w-7 sm:h-7',
  };

  useEffect(() => {
    setIsBlinking(true);
    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, blinkDuration);

    return () => clearTimeout(timer);
  }, [isVisible, blinkDuration]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`focus:outline-none transition-all duration-200 hover:opacity-70 ${className}`}
      aria-label={isVisible ? 'Hide password' : 'Show password'}
    >
      <div className={`${sizeClasses[size]} flex justify-center items-center`}>
        {isVisible ? (
          // Open Eye Icon
          <svg
            className={`w-full h-full text-gray-600 transition-all duration-150 ${isBlinking ? 'animate-pulse' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        ) : (
          // Closed Eye Icon (Eye with slash)
          <svg
            className={`w-full h-full text-gray-600 transition-all duration-150 ${isBlinking ? 'animate-pulse' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m-3.122-3.122L12 12m0 0l2.122 2.122m-2.122-2.122L12 12m0 0l-2.122-2.122"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
          </svg>
        )}
      </div>
    </button>
  );
};

SquareEyes.propTypes = {
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  blinkDuration: PropTypes.number,
};

export default SquareEyes;
