// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
// import { motion } from 'framer-motion';

// const images = [
//   { src: '/placement/fair1.jpg', caption: 'Placement Fair — Interview Hall' },
//   { src: '/placement/fair4.jpg', caption: 'Students Receiving Offer Letters' },
//   { src: '/placement/fair5.png', caption: 'Placement Day 2025 — Hits New Highs' },
//   { src: '/placement/fair6.png', caption: 'Placement seeker University Achieves 90% Placement Rate' },
//   { src: '/campus/img3.png', caption: "Placement seeker University" }
// ];

// export default function CampusCarousel() {
//   return (
//     <section className="py-24 bg-[#fdfaff] dark:bg-black overflow-hidden relative border-t border-purple-100 dark:border-white/10">
//       {/* Heading — stays in a centered container */}
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-2 mb-8">
//             <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">
//               Placements
//             </span>
//           </div>
//           <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
//             Placement Fairs at Placement seeker
//           </h3>
//           <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400 mx-auto">
//             Witness the success stories — top recruiters, enthusiastic students, and offer letters that mark the beginning of bright careers.
//           </p>
//         </motion.div>
//       </div>

//       {/* Carousel — back inside container, height fixed */}
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
//         >
//           <Swiper
//             spaceBetween={0}
//             effect={'fade'}
//             navigation={true}
//             pagination={{
//               clickable: true,
//               dynamicBullets: true,
//             }}
//             autoplay={{
//               delay: 4500,
//               disableOnInteraction: false,
//             }}
//             modules={[Autoplay, EffectFade, Navigation, Pagination]}
//             className="w-full h-[400px] sm:h-[500px] lg:h-[700px] [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination-bullet-active]:bg-white"
//           >
//             {images.map((item, index) => (
//               <SwiperSlide key={index}>
//                 <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
//                   <img
//                     src={item.src}
//                     alt={item.caption}
//                     className="w-full h-full object-contain"
//                   />
//                   <div className="absolute bottom-6 left-0 right-0 flex justify-center">
//                     <span className="bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
//                       {item.caption}
//                     </span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </motion.div>
//       </div>

//       {/* Decorative background blurs matching the theme */}
//       <div className="absolute top-1/2 left-0 -ml-20 w-72 h-72 bg-purple-400/10 rounded-full blur-[100px] pointer-events-none"></div>
//       <div className="absolute bottom-0 right-0 -mr-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none"></div>
//     </section>
//   );
// }
