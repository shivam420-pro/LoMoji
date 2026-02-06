import React from 'react';
import Button from '../../components/ui/Button';

const TemplatesSection = () => {
  const templateCards = [
    [
      { src: '/images/img_svg_black_900_8.svg', bg: 'bg-global-14', category: 'Product' },
      { src: '/images/img_svg_black_900_9.png', bg: 'bg-white', category: 'Resources' },
      { src: '/images/img_svg_black_900_10.svg', bg: 'bg-global-12', category: 'Company' },
      { src: '/images/img_svg_black_900_11.svg', bg: 'bg-white' },
      { src: '/images/img_svg_black_900_12.svg', bg: 'bg-global-2' },
      { src: '/images/img_svg_black_900_13.svg', bg: 'bg-global-12' },
    ],
    [
      { src: '/images/img_svg_black_900_14.svg', bg: 'bg-global-2' },
      { src: '/images/img_svg_black_900_15.svg', bg: 'bg-global-10' },
      { src: '/images/img_svg_black_900_16.svg', bg: 'bg-global-14' },
      { src: '/images/img_svg_black_900_17.svg', bg: 'bg-global-12' },
      { src: '/images/img_svg_black_900_18.png', bg: 'bg-white' },
      { src: '/images/img_svg_black_900_19.svg', bg: 'bg-global-14' },
    ],
  ];

  return (
    <section id="templates-section" className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-start items-center gap-8 sm:gap-12 md:gap-16">
          {/* Header */}
          <div className="flex flex-col justify-start items-center gap-4 sm:gap-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-global-7">
              Templates for all scenarios
            </h2>
            <p className="text-sm sm:text-base text-global-7 max-w-2xl">
              Explore our collection of free templates to speed up your workflow.
            </p>
            <Button className="bg-global-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-normal mt-4 sm:mt-6">
              Browse all templates
            </Button>
          </div>

          {/* Template Grid */}
          <div className="flex flex-col justify-start items-center gap-4 w-full">
            {templateCards.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-row justify-center items-center gap-4 w-full"
              >
                {row.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className={`relative flex flex-col justify-center items-center w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 rounded-xl shadow-sm ${card.bg}`}
                    style={{ border: '1px solid #f0f0f0' }}
                  >
                    <img
                      src={card.src}
                      alt={`Template ${rowIndex}-${cardIndex}`}
                      className="w-16 h-16 object-contain mt-4"
                    />
                    {card.category && (
                      <span className="mt-4 text-xs sm:text-sm md:text-base font-semibold text-global-3">
                        {card.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
