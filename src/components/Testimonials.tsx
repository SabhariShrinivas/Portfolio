import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
}

const testimonialsData: Testimonial[] = [
  {
    quote: "Sabhari worked with me for a long time by designing 100 beautiful 3D levels and also developed and designed the rest of the Unity game. He's one of the best people who I ever worked with! He did a fantastic job adding in all of the elements of the game, was great with researching different parts of the game, is very friendly to work with, great with teamwork, is very intelligent, and knows how to quickly develop high-quality Unity games with rich features. I will definitely ask him to help out on future projects!",
    author: "Brandon Podell via Upwork"
  },
  {
    quote: "great communications skills, organized and delivers everything on time.",
    author: "Victor Pereira via Upwork"
  },
  {
    quote: "Job completed successfully. Thanks for your helpful submission! I would recommend him!",
    author: "Kao via Upwork"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 8000); // Auto-scroll every 8 seconds
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    startAutoplay(); // Reset timer
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    startAutoplay(); // Reset timer
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    startAutoplay(); // Reset timer
  };

  // Variants for slide-and-fade animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 border-b border-white/5 relative bg-[#0e0d0f]/60 overflow-hidden">
      {/* Decorative technical grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(173,198,255,0.06),transparent_60%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-white/5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-white/5 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
            <span className="font-mono text-[10px] tracking-widest text-[#4edea3] uppercase font-bold">
              VERIFICATION_STREAM // VALIDATED_FEEDBACK
            </span>
          </div>
          <h3 className="font-mono text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            CLIENT_TESTIMONIALS
          </h3>
        </div>

        {/* Testimonial Box */}
        <div 
          className="w-full min-h-[260px] flex flex-col items-center justify-center text-center relative px-2 py-4"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* Animated quotes backdrops */}
          <div className="text-primary/10 select-none mb-6">
            <Quote size={52} className="mx-auto" />
          </div>

          <div className="relative w-full overflow-hidden flex justify-center items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full flex flex-col items-center"
              >
                {/* Visual quote text wrapper */}
                <p className="font-sans text-base sm:text-lg leading-relaxed text-[#f3f4f6] max-w-2xl font-medium tracking-normal">
                  “{testimonialsData[currentIndex].quote}”
                </p>

                {/* Rating indicator */}
                <div className="flex items-center gap-1 mt-6 text-[#ffb4ab]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" className="stroke-none" />
                  ))}
                </div>

                {/* Author Name */}
                <span className="font-mono text-[10px] tracking-wider text-primary uppercase font-bold block mt-3">
                  // CLIENT_SOURCE_ID: {testimonialsData[currentIndex].author}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel UI Controls & Dot indicators */}
        <div className="flex items-center gap-6 mt-8 font-mono">
          {/* Previous Arrow */}
          <button 
            onClick={handlePrev}
            className="p-1 px-1.5 border border-white/5 hover:border-primary/30 rounded text-on-surface-variant hover:text-white transition-all text-[10px] uppercase flex items-center gap-1 shrink-0"
            title="Retrieve previous payload"
          >
            <ChevronLeft size={12} />
          </button>

          {/* Dynamic dot array */}
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="group relative flex items-center justify-center p-2 focus:outline-none"
                aria-label={`Show testimonial ${index + 1}`}
              >
                {/* Bullet layout rings */}
                <span 
                  className={`block rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-2 h-2 bg-primary ring-2 ring-primary/30 shadow-[0_0_8px_rgba(173,198,255,0.7)]' 
                      : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/45'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Next Arrow */}
          <button 
            onClick={handleNext}
            className="p-1 px-1.5 border border-white/5 hover:border-primary/30 rounded text-on-surface-variant hover:text-white transition-all text-[10px] uppercase flex items-center gap-1 shrink-0"
            title="Retrieve next payload"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
