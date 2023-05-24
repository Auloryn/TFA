"use strict";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//navigation

document.addEventListener('DOMContentLoaded', function () {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    navSlide();
});



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
