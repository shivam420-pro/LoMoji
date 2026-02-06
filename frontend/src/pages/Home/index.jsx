import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/common/Header';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import ShareSection from './ShareSection';
import TemplatesSection from './TemplatesSection';
import CTASection from './CTASection';

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col justify-start items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 bg-white w-full">
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <HeroSection />
      <FeatureSection />
      <ShareSection />
      <TemplatesSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
