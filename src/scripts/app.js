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


//CAROUSEL MOBILE
let slideIndex = 0;
let startX = 0;
let endX = 0;
const slides = document.querySelectorAll('.carousel_slides');
const totalSlides = slides.length;

function updateSlidePosition() {
    if (window.innerWidth <= 1000) {

        const slideWidth = slides[0].offsetWidth;
        let newTranslateX = -slideIndex * slideWidth;
        document.querySelector('.slides-container').style.transform = `translateX(${newTranslateX}px)`;
    } else {
        document.querySelector('.slides-container').style.transform = 'none';

    }

}

window.addEventListener('resize', updateSlidePosition);

document.querySelector('.carousel').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.carousel').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        slideIndex++;
    } else if (startX + 50 < endX) {
        slideIndex--;
    }
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

updateSlidePosition();

//Section problèmes mobile

function bigger(params) {

    document.addEventListener("DOMContentLoaded", function () {
        let target = document.querySelector(".dot4");
        let observer;

        let observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        let observerCallback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("bigger");
                }

            });
        };

        observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(target);
    });

}
// if (window.innerWidth <= 768) {
// }
let mm = gsap.matchMedia();
mm.add("(max-width: 1000px)", () => {
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
    if (window.innerWidth > 1000) {
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
    if (window.innerWidth > 1000) {

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
let dot = document.querySelector(".dot4");
mm.add("(min-width: 1000px)", () => {

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
mm.add("(min-width: 1600px)", () => {
    gsap.to(dot, {
        scale: 15,
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
