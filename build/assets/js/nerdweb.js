"use-strict";

new Swiper("#services-carousel", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

new Swiper("#products-carousel", {
  slidesPerView: 3,
  scrollbar: {
    el: "#products-carousel .swiper-scrollbar",
    draggable: true,
  },
});

new Swiper("#selection-carousel", {
  slidesPerView: 1,
  scrollbar: {
    el: "#selection-carousel .swiper-scrollbar",
    draggable: true,
  },
});
