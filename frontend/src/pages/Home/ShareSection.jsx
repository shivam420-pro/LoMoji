import React from 'react';

const ShareSection = () => {
  return (
    <section id="resources-section" className="bg-global-3 py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Resources Intro */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-2">
          Resources & Sharing
        </h2>
        <p className="text-base text-center text-white">
          Share, review, and ship your animations and assets to any platform. Access resources and
          guides for best results.
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-start items-start gap-8 sm:gap-12 md:gap-16">
          <div className="flex flex-col justify-start items-start gap-4 sm:gap-6 w-full max-w-4xl mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-left text-white">
              <span className="text-white">Share, review, and ship</span>
              <br />
              <span className="text-[#8887fd]">to iOS, Android, and Web</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-left text-white mt-4 sm:mt-6">
              Connect your design process and production assets with 1:1 Lottie support across
              platforms.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-start items-start gap-6 sm:gap-8 md:gap-12 w-full">
            <img
              src="/images/img_svg_black_900_4.svg"
              alt="Share and review features"
              className="w-full max-w-md lg:max-w-lg h-auto object-contain self-center"
            />

            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 w-full lg:w-auto">
              <div className="flex flex-col justify-start items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <img
                  src="/images/img_svg_black_900_5.svg"
                  alt="iOS platform"
                  className="w-full max-w-xs h-auto object-contain"
                />
                <img
                  src="/images/img_svg_black_900_6.svg"
                  alt="Android platform"
                  className="w-full max-w-xs h-auto object-contain"
                />
              </div>
              <img
                src="/images/img_svg_black_900_7.svg"
                alt="Web platform"
                className="w-full max-w-xs h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareSection;
