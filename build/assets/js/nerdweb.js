"use-strict";

new Swiper("#services-carousel", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    },
  },
});

new Swiper("#products-carousel", {
  slidesPerView: "auto",
  spaceBetween: 16,
  scrollbar: {
    el: "#products-carousel .swiper-scrollbar",
    draggable: true,
  },
  breakpoints: {
    640: {
      spaceBetween: 26,
    },
  },
});

new Swiper("#selection-carousel", {
  slidesPerView: 1,
  scrollbar: {
    el: "#selection-carousel .swiper-scrollbar",
    draggable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

// Dropdowns Animate
const dropdowns = document.querySelectorAll(".dropdown-button");

dropdowns.forEach((dropdownButton) => {
  const items = dropdownButton.parentNode.querySelector("ul");

  dropdownButton.addEventListener("click", function (event) {
    event.preventDefault();
    const isVisible = dropdownButton.classList.contains("is-active");

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

    dropdownButton.classList.toggle("is-active");
  });
});

// Menu Animate
const menu = document.querySelectorAll(".hamburger");

menu.forEach((menu) => {
  menu.addEventListener("click", function () {
    const menuMobile = document.querySelector(".navbar__mobile");
    const isVisible = menuMobile.classList.contains("is-active");

    if (isVisible) {
      menuMobile.classList.remove("fadeInRightBig");
      menuMobile.classList.add("fadeOutRight");
      setTimeout(function () {
        menuMobile.classList.remove("is-active");
      }, 1000);
    } else {
      menuMobile.classList.remove("fadeOutRight");
      menuMobile.classList.add("fadeInRightBig");
      menuMobile.classList.add("is-active");
    }
  });
});
