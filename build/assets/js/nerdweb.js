"use-strict";

const swiperCarousels = document.querySelectorAll(".swiper[data-swiper]");

swiperCarousels.forEach((swiperCarousel) => {
  const id = `#${swiperCarousel.id}`;
  const options = swiperCarousel.getAttribute("data-swiper");

  new Swiper(id, JSON.parse(options));
});

// Dropdowns Animate
const dropdowns = document.querySelectorAll(".dropdown-button");

dropdowns.forEach((dropdownButton) => {
  const items = dropdownButton.parentNode.querySelector(".dropdown-menu");

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

window.addEventListener("scroll", function () {
  const scrollCurrent = this.scrollY;
  const subNavbar = this.document.querySelector(".subnavbar");

  if (scrollCurrent > 50) {
    subNavbar.classList.add("fadeOutUp");
  } else {
    subNavbar.classList.add("fadeInDown");
    subNavbar.classList.remove("fadeOutUp");
  }
});
