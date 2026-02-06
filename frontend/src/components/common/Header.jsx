import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const Header = ({
  className = '',
  isAuthenticated = false,
  onLogout,
  onLogoClick,
  user,
  isDashboard,
}) => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('home');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const templatesSection = document.getElementById('templates-section');
      // Add similar logic for features, resources, pricing if sections exist
      if (templatesSection) {
        const rect = templatesSection.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          setActiveNav('templates');
          return;
        }
      }
      // Features section scroll detection (if exists)
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          setActiveNav('features');
          return;
        }
      }
      // Resources section scroll detection (if exists)
      const resourcesSection = document.getElementById('resources-section');
      if (resourcesSection) {
        const rect = resourcesSection.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          setActiveNav('resources');
          return;
        }
      }
      // Pricing section scroll detection (if exists)
      const pricingSection = document.getElementById('pricing-section');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          setActiveNav('pricing');
          return;
        }
      }
      if (window.scrollY < 100) {
        setActiveNav('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // You get access token here
      console.log(tokenResponse);
      // You can now send this token to your backend or use it for authentication
    },
    onError: (error) => {
      console.error('Google Login Failed', error);
    },
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  // Public Header (for non-authenticated users)
  if (!isAuthenticated) {
    return (
      <header
        className={`sticky top-0 z-50 w-full bg-[#f7f7f7] border-b border-gray-100 ${className}`}
      >
        <div className="w-full px-8 sm:px-6 lg:px-12 flex items-center justify-between h-14">
          {/* Logo only, larger */}
          <div className="flex items-center">
            <img
              src="/images/img_logo.svg"
              alt="LoMoji Logo"
              className="w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onLogoClick}
            />
          </div>
          {/* Navigation */}
          <nav className="flex-1 flex items-center justify-center">
            <ul className="flex items-center gap-8 text-sm font-medium text-[#181A2A]">
              <li>
                <a
                  href="#"
                  className={
                    activeNav === 'home'
                      ? 'text-[#ff9800]'
                      : 'hover:text-[#ff9800] transition-colors'
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveNav('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={
                    activeNav === 'templates'
                      ? 'text-[#ff9800]'
                      : 'hover:text-[#ff9800] transition-colors'
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('templates-section');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                      setActiveNav('templates');
                    }
                  }}
                >
                  Templates
                </a>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className={`flex items-center gap-1 focus:outline-none ${activeNav === 'features' ? 'text-[#ff9800]' : 'hover:text-[#ff9800] transition-colors'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('features-section');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                    setActiveNav('features');
                  }}
                >
                  Features
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                {/* Features Popup */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all duration-200 ease-out z-50"
                  tabIndex="-1"
                >
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎬</span>
                      <div>
                        <div className="font-semibold text-gray-900">Icon Animation</div>
                        <div className="text-xs text-gray-600">
                          Create and animate custom icons for your projects with ease.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">😃</span>
                      <div>
                        <div className="font-semibold text-gray-900">Emoji Creation</div>
                        <div className="text-xs text-gray-600">
                          Design unique emojis to express yourself and your brand.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎞️</span>
                      <div>
                        <div className="font-semibold text-gray-900">GIF Video Creation</div>
                        <div className="text-xs text-gray-600">
                          Easily create and export animated GIFs for social media and more.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className={`flex items-center gap-1 ${activeNav === 'resources' ? 'text-[#ff9800]' : 'hover:text-[#ff9800] transition-colors'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('resources-section');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                    setActiveNav('resources');
                  }}
                >
                  Resources
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={
                    activeNav === 'pricing'
                      ? 'text-[#ff9800]'
                      : 'hover:text-[#ff9800] transition-colors'
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll to bottom or pricing section if exists
                    const section = document.getElementById('pricing-section');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                    setActiveNav('pricing');
                  }}
                >
                  Pricing
                </a>
              </li>
            </ul>
          </nav>
          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-[#181A2A] text-sm font-medium hover:text-[#ff9800] transition-colors bg-transparent border-none outline-none cursor-pointer"
            >
              Login
            </button>
            <Button
              className="bg-[#388bff] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-none hover:bg-blue-600"
              style={{ minWidth: '80px' }}
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>
    );
  }

  // Dashboard/private pages: Authenticated user (profile photo + Dashboard text as menu trigger)
  if (isAuthenticated && isDashboard) {
    return (
      <header
        className={`sticky top-0 z-50 w-full bg-[#f7f7f7] border-b border-gray-100 ${className}`}
      >
        <div className="w-full px-8 sm:px-6 lg:px-12 flex items-center justify-between h-14">
          {/* Logo only, larger */}
          <div className="flex items-center">
            <img
              src="/images/img_logo.svg"
              alt="LoMoji Logo"
              className="w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onLogoClick}
            />
          </div>
          {/* Navigation (can be empty or add dashboard links if needed) */}
          <nav className="flex-1 flex items-center justify-center">
            <ul className="flex items-center gap-8 text-sm font-medium text-[#181A2A]">
              {/* Add dashboard-specific nav if needed */}
            </ul>
          </nav>
          {/* Profile photo + Dashboard text as menu trigger */}
          <div className="flex items-center gap-3">
            <div className="relative" ref={userMenuRef}>
              <button
                className="flex items-center gap-2 text-[#181A2A] text-sm font-medium hover:text-[#ff9800] transition-colors"
                onClick={() => setUserMenuOpen((open) => !open)}
              >
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
                <span>Dashboard</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/profile');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/settings');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout && onLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Home page: Authenticated user (show Dashboard and user profile photo)
  return (
    <header
      className={`sticky top-0 z-50 w-full bg-[#f7f7f7] border-b border-gray-100 ${className}`}
    >
      <div className="w-full px-8 sm:px-6 lg:px-12 flex items-center justify-between h-14">
        {/* Logo only, larger */}
        <div className="flex items-center">
          <img
            src="/images/img_logo.svg"
            alt="LoMoji Logo"
            className="w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onLogoClick}
          />
        </div>
        {/* Navigation */}
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex items-center gap-8 text-sm font-medium text-[#181A2A]">
            <li>
              <a
                href="#"
                className={
                  activeNav === 'home' ? 'text-[#ff9800]' : 'hover:text-[#ff9800] transition-colors'
                }
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveNav('home');
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={
                  activeNav === 'templates'
                    ? 'text-[#ff9800]'
                    : 'hover:text-[#ff9800] transition-colors'
                }
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('templates-section');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    setActiveNav('templates');
                  }
                }}
              >
                Templates
              </a>
            </li>
            <li className="relative group">
              <a
                href="#"
                className={`flex items-center gap-1 focus:outline-none ${activeNav === 'features' ? 'text-[#ff9800]' : 'hover:text-[#ff9800] transition-colors'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('features-section');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                  setActiveNav('features');
                }}
              >
                Features
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              {/* Features Popup */}
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all duration-200 ease-out z-50"
                tabIndex="-1"
              >
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎬</span>
                    <div>
                      <div className="font-semibold text-gray-900">Icon Animation</div>
                      <div className="text-xs text-gray-600">
                        Create and animate custom icons for your projects with ease.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">😃</span>
                    <div>
                      <div className="font-semibold text-gray-900">Emoji Creation</div>
                      <div className="text-xs text-gray-600">
                        Design unique emojis to express yourself and your brand.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎞️</span>
                    <div>
                      <div className="font-semibold text-gray-900">GIF Video Creation</div>
                      <div className="text-xs text-gray-600">
                        Easily create and export animated GIFs for social media and more.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative group">
              <a
                href="#"
                className={`flex items-center gap-1 ${activeNav === 'resources' ? 'text-[#ff9800]' : 'hover:text-[#ff9800] transition-colors'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('resources-section');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                  setActiveNav('resources');
                }}
              >
                Resources
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={
                  activeNav === 'pricing'
                    ? 'text-[#ff9800]'
                    : 'hover:text-[#ff9800] transition-colors'
                }
                onClick={(e) => {
                  e.preventDefault();
                  // Scroll to bottom or pricing section if exists
                  const section = document.getElementById('pricing-section');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }
                  setActiveNav('pricing');
                }}
              >
                Pricing
              </a>
            </li>
          </ul>
        </nav>
        {/* Profile photo + Dashboard text as menu trigger */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center" ref={userMenuRef}>
            <button
              className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium focus:outline-none"
              onClick={() => setUserMenuOpen((open) => !open)}
              aria-label="Open user menu"
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)' }}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || 'U'
              )}
            </button>
            <button
              className="ml-2 text-[#181A2A] text-sm font-medium hover:text-[#388bff] transition-colors bg-transparent border-none outline-none cursor-pointer"
              style={{ background: 'none', border: 'none', padding: 0 }}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {/* Dropdown menu */}
            {userMenuOpen && (
              <div
                className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-lg z-50"
                style={{ minWidth: '240px', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
              >
                <div className="flex flex-col py-2">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="block w-full text-left px-6 py-3 text-base text-gray-700 hover:bg-gray-100 font-normal"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate('/settings');
                    }}
                    className="block w-full text-left px-6 py-3 text-base text-gray-700 hover:bg-gray-100 font-normal"
                  >
                    Settings
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout && onLogout();
                    }}
                    className="block w-full text-left px-6 py-3 text-base text-red-600 hover:bg-gray-100 font-normal"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
