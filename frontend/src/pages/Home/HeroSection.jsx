import React from 'react';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Main heading */}
          <div className="flex flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center text-global-7">
              "Serious Tools for Serious Designers"
            </h1>

            <div className="flex flex-row justify-center items-end w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-left bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                In a snap.Your Art, But Make It <center>Fun.</center>
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-center text-global-7 max-w-2xl">
            Create and Edit LoMoji Icon animations, emoji creation And giff videos to your apps and
            websites.
          </p>

          {/* CTA Button */}
          <Link to="/signup">
            <Button className="bg-button-2 text-button-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-normal">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
