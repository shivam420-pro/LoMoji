import React from 'react';

const CTASection = () => {
  const socialCards = [
    {
      platform: 'Discord',
      color: 'text-global-11',
      bg: 'bg-global-7',
      icon: '/images/img_svg_indigo_a200_01.png',
      text: 'Follow us on',
    },
    {
      platform: 'Twitter',
      color: 'text-global-8',
      bg: 'bg-global-6',
      icon: '/images/img_svg_light_blue_a200.png',
      text: 'Follow us on',
    },
    {
      platform: 'Instagram',
      color: 'text-global-5',
      bg: 'bg-global-13',
      icon: '/images/img_svg_yellow_900.png',
      text: 'Follow us on',
    },
  ];

  return (
    <section id="pricing-section" className="bg-white py-12 sm:py-16 md:py-20">
      {/* Pricing Intro */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-global-7 mb-2">
          Pricing
        </h2>
        <p className="text-base text-center text-global-7">
          Simple, transparent pricing for every creator. Choose the plan that fits your needs.
        </p>
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 bg-global-3 rounded-xl p-8 sm:p-12 md:p-16 lg:p-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
            Bring your products to life
          </h2>

          <div className="flex flex-row justify-center items-center bg-white rounded-xl p-2 sm:p-3">
            <span className="text-base sm:text-lg font-normal text-center text-global-3 px-4 sm:px-6 py-2">
              Get started for free
            </span>
          </div>
        </div>

        {/* Social Cards */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 mt-12 sm:mt-16 md:mt-20">
          {socialCards.map((social, index) => (
            <div
              key={index}
              className={`flex flex-col justify-start items-start p-4 sm:p-6 rounded-lg ${social.bg} w-full sm:w-44`}
            >
              <div className="flex flex-row justify-start items-center gap-2 mb-3 sm:mb-4 w-full">
                <span className="text-xs text-global-6 self-end">{social.text}</span>
                <img
                  src={social.icon}
                  alt={social.platform}
                  className="w-12 sm:w-16 h-12 sm:h-16 object-contain"
                />
              </div>
              <span className={`text-sm sm:text-base font-medium ${social.color}`}>
                {social.platform}
              </span>
            </div>
          ))}
        </div>

        {/* Copyright */}
      </div>
    </section>
  );
};

export default CTASection;
