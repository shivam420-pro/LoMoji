import React from 'react';

const CompanyLogos = () => {
  const logoRows = [
    [
      { src: '/images/img_svg_blue_gray_300.svg', alt: 'Google' },
      { src: '/images/img_svg_white_a700.svg', alt: 'Tide' },
    ],
    [
      { src: '/images/img_svg_black_900_1.svg', alt: 'Webflow' },
      { src: '/images/img_svg_blue_gray_300_40x82.svg', alt: 'Figma' },
    ],
  ];

  const centerLogos = [
    { src: '/images/img_svg_40x82.svg', alt: 'Bolt' },
    {
      icons: [
        { src: '/images/img_vector_blue_gray_300.svg', alt: 'Icon 1' },
        { src: '/images/img_vector_blue_gray_300_10x8.svg', alt: 'Icon 2' },
        { src: '/images/img_vector_blue_gray_300_10x18.svg', alt: 'Icon 3' },
        { src: '/images/img_vector_blue_gray_300_14x22.svg', alt: 'Icon 4' },
        { src: '/images/img_vector_blue_gray_300_2x2.svg', alt: 'Icon 5' },
        { src: '/images/img_vector_blue_gray_300_1x1.svg', alt: 'Icon 6' },
      ],
    },
  ];

  const rightLogos = [
    { src: '/images/img_svg_1.svg', alt: 'Company 1' },
    { src: '/images/img_vector_blue_gray_300_18x82.svg', alt: 'Company 2' },
  ];

  const farRightLogos = [
    [
      { src: '/images/img_svg_2.svg', alt: 'Microsoft' },
      { src: '/images/img_svg_blue_gray_300_40x68.svg', alt: 'Adobe' },
    ],
    [
      { src: '/images/img_svg_3.svg', alt: 'Shopify' },
      { src: '/images/img_svg_4.svg', alt: 'Airbnb' },
    ],
  ];

  return (
    <section className="bg-white py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center items-start gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left column */}
          <div className="flex flex-col justify-start items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {logoRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-row justify-between items-center gap-4 sm:gap-6 w-full sm:w-auto"
              >
                {row.map((logo, logoIndex) => (
                  <img
                    key={logoIndex}
                    src={logo.src}
                    alt={logo.alt}
                    className="w-16 sm:w-20 md:w-[82px] h-8 sm:h-10 md:h-[40px] object-contain"
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Center column */}
          <div className="flex flex-col justify-start items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-8 md:px-14">
            <img
              src={centerLogos[0].src}
              alt={centerLogos[0].alt}
              className="w-16 sm:w-20 md:w-[82px] h-8 sm:h-10 md:h-[40px] object-contain"
            />
            <div className="flex flex-row justify-center items-start gap-1 sm:gap-2 w-full">
              {centerLogos[1].icons.map((icon, index) => (
                <img
                  key={index}
                  src={icon.src}
                  alt={icon.alt}
                  className={`object-contain ${
                    index === 0
                      ? 'w-6 h-6 self-center'
                      : index === 1
                        ? 'w-2 h-2 self-center'
                        : index === 2
                          ? 'w-2 h-4 self-end'
                          : index === 3
                            ? 'w-3 h-5 self-end'
                            : index === 4
                              ? 'w-0.5 h-0.5 mt-2'
                              : 'w-0.5 h-0.5 mt-2'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-start items-center gap-4 sm:gap-6 w-full sm:w-auto">
            {rightLogos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="w-16 sm:w-20 md:w-[82px] h-8 sm:h-10 md:h-[40px] object-contain"
              />
            ))}
          </div>

          {/* Far right column */}
          <div className="flex flex-col justify-start items-center gap-3 sm:gap-4 w-full sm:w-auto ml-0 sm:ml-8 md:ml-20">
            {farRightLogos.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-row justify-between items-center gap-4 sm:gap-6 w-full sm:w-auto"
              >
                {row.map((logo, logoIndex) => (
                  <img
                    key={logoIndex}
                    src={logo.src}
                    alt={logo.alt}
                    className="w-16 sm:w-20 md:w-[82px] h-8 sm:h-10 md:h-[40px] object-contain"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-global-9 mt-12 sm:mt-16 md:mt-20"></div>
      </div>
    </section>
  );
};

export default CompanyLogos;
