import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

const images = [
  '/campus/img1.jpg',
  '/campus/img2.png',
  '/campus/img3.png',
  '/campus/img4.png',
  '/campus/img5.png',
];

export default function CampusCarousel() {
  return (
    <section className="py-24 bg-[#fdfaff] dark:bg-black overflow-hidden relative border-t border-purple-100 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-2 mb-4">
             <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">
               Our Campus
             </span>
          </div>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Life at Invertis
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400 mx-auto">
            Experience our world-class infrastructure designed to foster innovation, learning, and growth.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 group bg-white dark:bg-gray-900"
        >
          <Swiper
            spaceBetween={0}
            effect={'fade'}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="w-full h-[400px] sm:h-[500px] lg:h-[700px] [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination-bullet-active]:bg-white"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={src}
                    alt={`Campus view ${index + 1}`}
                    className="absolute block w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Decorative background blurs matching the theme */}
      <div className="absolute top-1/2 left-0 -ml-20 w-72 h-72 bg-purple-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 -mr-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
}
