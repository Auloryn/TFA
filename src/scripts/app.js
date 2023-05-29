"use strict";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

//navigation
const section = document.querySelectorAll("section");
const nav = document.querySelector("nav__menu");
const navList = document.querySelectorAll(".nav__menu li");

const options = {
    threshold: "0.3"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            navList.forEach(link => {
                link.classList.remove("active");
                if (e.target.id === link.dataset.nav) {
                    link.classList.add("active");
                }
            })
        }
    });

}, options);

section.forEach(section => {
    observer.observe(section);
})

const BurgOpenElement = document.querySelector(".burger__close");
const BurgElement = document.querySelector(".burger__lines");
const BurgNav = document.querySelector(".nav__menu");
BurgElement.addEventListener("click", Menuburger);
BurgNav.addEventListener("click", Menuburger);

function Menuburger() {
    BurgOpenElement.classList.toggle("burger__close");
    BurgOpenElement.classList.toggle("nav-active");

    BurgElement.classList.toggle("toggle");

}


//sticky menu
// Get the navbar container
const navbar = document.querySelector('.nav');

// Get the offset position of the navbar
const sticky = 0;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function Sticky() {
//     if (window.pageYOffset > sticky) {
//         navbar.classList.add("sticky")
//     } else {
//         navbar.classList.remove("sticky");
//     }


// }
// listen for the scroll event to invoke the function
// window.addEventListener('scroll', Sticky);


//CAROUSEL MOBILE
let slideIndex = 0;
let startX = 0; // To store the starting X position of the touch
let endX = 0; // To store the ending X position of the touch
const slides = document.querySelectorAll('.carousel_slides');
const totalSlides = slides.length;

function updateSlidePosition() {
    if (window.innerWidth <= 768) {

        const slideWidth = slides[0].offsetWidth;
        let newTranslateX = -slideIndex * slideWidth;
        document.querySelector('.slides-container').style.transform = `translateX(${newTranslateX}px)`;
    } else {
        document.querySelector('.slides-container').style.transform = 'none';

    }

}

window.addEventListener('resize', updateSlidePosition); // Adjust slide positions when window is resized

// Touch event listeners
document.querySelector('.carousel').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.carousel').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    // Compare the start and end X positions to determine slide direction
    if (startX > endX + 50) {
        // Next slide
        slideIndex++;
    } else if (startX + 50 < endX) {
        // Previous slide
        slideIndex--;
    }
    // Ensure slide index is within bounds
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    updateSlidePosition();
});

document.getElementById('next').addEventListener('click', function () {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    updateSlidePosition();
});

document.getElementById('prev').addEventListener('click', function () {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    updateSlidePosition();
});

updateSlidePosition(); // Initialize slide positions when script loads

//Section problèmes mobile

function bigger(params) {
    // Let's assume the class you want to add is 'active' and the element has an id 'target'

    document.addEventListener("DOMContentLoaded", function () {
        let target = document.querySelector(".dot4");
        let observer;

        let observerOptions = {
            root: null, // relative to document viewport 
            rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
            threshold: 0.5 // visible amount of item shown in relation to root
        };

        let observerCallback = function (entries, observer) {
            entries.forEach(entry => {
                // if element is visible in viewport, add 'active' class, else remove it
                if (entry.isIntersecting) {
                    entry.target.classList.add("bigger");
                }

            });
        };

        // instantiate a new Intersection Observer
        observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(target); // observe the 'target' element
    });

}
// if (window.innerWidth <= 768) {
// }
let mm = gsap.matchMedia();
mm.add("(max-width: 768px)", () => {
    let dot = document.querySelector(".dot4");

    gsap.to(dot, {
        scale: 80,
        duration: 1,
        scrollTrigger: {
            trigger: dot,
            start: "bottom 80%",
            end: "top -800px",
            scrub: true,
        },
    });
});


//CAROUSEL DESKTOP


const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
let slider = document.querySelector(".carousel");

next.addEventListener('click', Next);
prev.addEventListener('click', Previous);

function Next(params) {
    if (window.innerWidth > 768) {
        let currentSlide = slider.querySelector(".carousel_slides--actif");
        let nextSlide = currentSlide.nextElementSibling;

        if (!nextSlide) {
            nextSlide = currentSlide.parentNode.firstElementChild;
        }
        console.log(nextSlide);
        for (const el of slides) {
            el.classList.remove("carousel_slides--actif", "carousel_slides--over");
        }
        currentSlide.classList.add("carousel_slides--over");

        nextSlide.classList.add("carousel_slides--actif");

    } else {

    }

}
function Previous(params) {
    if (window.innerWidth > 768) {

        let currentSlide = slider.querySelector(".carousel_slides--actif");
        let prevSlide = currentSlide.previousElementSibling;

        if (!prevSlide) {
            prevSlide = currentSlide.parentNode.lastElementChild;
        }
        console.log(prevSlide);
        for (const el of slides) {
            el.classList.remove("carousel_slides--actif", "carousel_slides--over");
        }
        currentSlide.classList.add("carousel_slides--over");
        prevSlide.classList.add("carousel_slides--actif");

    } else {

    }
}


//section problèmes desktop
mm.add("(min-width: 768px)", () => {
    let dot = document.querySelector(".dot4");

    gsap.to(".scroll-container", {
        x: -window.innerWidth,
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            scrub: true,
            pin: true,
        },

    });

    gsap.to(dot, {
        scale: 10,
        x: 700,
        y: -75,
        duration: 2,
        scrollTrigger: {
            trigger: dot,
            start: "left 50vh",
            end: "bottom bottom",
        },
    });

});

//Bouton qui remonte la page

const btnUp = document.querySelector(".btn--up");
btnUp.addEventListener('click', Up);

window.onscroll = function () {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        btnUp.style.display = "block";
    } else {
        btnUp.style.display = "none";
    }
};

function Up(params) {
    if (btnUp) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

}
