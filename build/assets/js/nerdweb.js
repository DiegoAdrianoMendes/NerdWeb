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

// Dropdowns Animate
const dropdowns = document.querySelectorAll(".dropdown-button");

dropdowns.forEach((dropdownButton) => {
  const items = dropdownButton.parentNode.querySelector("ul");

  dropdownButton.addEventListener("click", function () {
    const isVisible = dropdownButton.classList.contains("is--active");

    if (isVisible) {
      setTimeout(function () {
        items.setAttribute("hidden", "");
      }, 500);
      items.classList.remove("fadeInDown");
      items.classList.add("fadeOutUp");
    } else {
      items.removeAttribute("hidden");
      items.classList.add("fadeInDown");
      items.classList.remove("fadeOutUp");
    }

    dropdownButton.classList.toggle("is--active");
  });
});
