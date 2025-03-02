
'use strict';


/* PRELOAD */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});


/* add  event listener on multiple elements */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}


/* NAVBAR */

/* Selecting both navbar and aboutnav */
const navbar = document.querySelector("[data-navbar]");
const aboutNav = document.querySelector("[data-aboutnav]");

/* Select nav togglers and overlay */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

/* Function to togglenavbars andoverlay */
const toggleNavbar = function () {
  navbar.classList.toggle("active");     // Toggles main navbar
  aboutNav.classList.toggle("active");   // Toggles about nav
  overlay.classList.toggle("active");    // Toggles the overlay
  document.body.classList.toggle("nav-active");  // Toggles body class
}

/* Adding event listener to all toggler buttons */
addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 Header & Back up Top Inputs
 */

// Target all headers with the same attribute
const headers = document.querySelectorAll("[data-header]");

headers.forEach(header => {
  let lastScrollPos = 0;

  const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
      header.classList.add("active");
      hideHeader();
    } else {
      header.classList.remove("active");
    }
  });
});


function showPage(pageId) {
  // Array of all possible page IDs
  const pages = ['home', 'about', 'redirect'];
  
  // Hide all pages
  pages.forEach(page => {
    const pageElement = document.getElementById(page);
    if (pageElement) {
      pageElement.style.display = 'none';
    } else {
      console.warn(`Page element '${page}' not found`);
    }
  });

  // Show the target page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.style.display = 'block';
    
    // Update browser history
    history.pushState({ page: pageId }, '', `#${pageId}`);
  } else {
    console.error(`Page '${pageId}' not found`);
  }
}

// Event listener for page load
document.addEventListener("DOMContentLoaded", function() {
  showPage('home');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.page) {
    showPage(event.state.page);
  } else {
    // Default to home if no state is found
    showPage('home');
  }
});



/* Hero Slider */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/* Auto Slide */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/* Parallax Effect */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});
