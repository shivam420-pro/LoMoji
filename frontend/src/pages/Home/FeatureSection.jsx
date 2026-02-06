import React from 'react';

const FeatureSection = () => {
  return (
    <section id="features-section" className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Features Intro */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-global-7 mb-4">
          Our Core Features
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">��</span>
            <span className="font-semibold text-lg text-global-7">Icon Animation</span>
            <span className="text-sm text-gray-600 text-center">
              Create and animate custom icons for your projects with ease.
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">😃</span>
            <span className="font-semibold text-lg text-global-7">Emoji Creation</span>
            <span className="text-sm text-gray-600 text-center">
              Design unique emojis to express yourself and your brand.
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🎞️</span>
            <span className="font-semibold text-lg text-global-7">GIF Video Creation</span>
            <span className="text-sm text-gray-600 text-center">
              Easily create and export animated GIFs for social media and more.
            </span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-12">
          {/* First feature */}
          <div className="flex flex-col justify-start items-start gap-4 sm:gap-6 md:gap-8 w-full">
            <div className="flex items-center justify-center gap-6 sm:gap-8">
              <img
                src="/images/Main_Logo.svg"
                alt="LoMoji logo"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
              />
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-global-7">+</span>
              <img
                src="/images/keyboard-svgrepo-com.svg"
                alt="Keyboard logo"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
              />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-right text-global-7 max-w-md lg:max-w-sm self-end m-0">
              Import assets from your LoMoji design Add in our Keyboard .
            </p>
          </div>

          {/* Second feature */}
          <div className="flex flex-col lg:flex-row justify-start items-center gap-6 sm:gap-8 md:gap-12 w-full mt-8 sm:mt-12 md:mt-16">
            <div className="flex flex-col justify-start items-start gap-4 sm:gap-6 w-full lg:w-auto">
              <div className="flex flex-row justify-start items-center w-full">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-global-7">
                  <span className="text-global-7">Animate</span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent">
                    with ease.
                  </span>
                </h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-left text-global-7">
                Easy to learn, and full of powerful features. Lottielab is the fastest way to
                animate.
              </p>
            </div>
            <img
              src="/images/img_svg_black_900_3.svg"
              alt="Animation features"
              className="w-full max-w-md lg:max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
