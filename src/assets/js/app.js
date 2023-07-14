document.addEventListener("DOMContentLoaded", () => {


    //= components/


    var textElement = document.querySelector(".header__logo");
    var textToType = "AGB Trading\ncompany";
    textElement.innerText = "";

    function typeText(text, i) {
        if (i < text.length) {
            textElement.innerText += text.charAt(i);
            textElement.innerHTML += '<span class="cursor"></span>';
            setTimeout(function () {
                typeText(text, i + 1);
            },100);
        }
    }
    typeText(textToType, 0);

    gsap.to(".main-about-company__top-container .main-about-company__line", {
        width: "64.286%",
        scrollTrigger: {
            trigger: ".main-about-company__top-container",
            start: "bottom-=300 center",
            end: "top+=300 center",
            scrub: true,
        }
    });

    gsap.from(".main-about-company__top-container h2", {
        x: "-100%",
        opacity: "0",
        scrollTrigger: {
            trigger: ".main-about-company__top-container",
            start: "bottom-=100 center",
            end: "top+=100 center",
            scrub: true,
        }
    });

    gsap.to(".main-about-company__bottom-container .main-about-company__line", {
        width: "39.556%",
        scrollTrigger: {
            trigger: ".main-about-company__bottom-container",
            start: "bottom-=250 center",
            end: "top+=250 center",
            scrub: true,
        }
    });

    gsap.from(".main-products__text h2", {
        x: "-100%",
        opacity: "0",
        scrollTrigger: {
            trigger: ".main-products__content",
            start: "top 80%",
            end: "top 40%",
            scrub: true,
        }
    });

    gsap.from(".main-contacts h2", {
        x: "-100%",
        opacity: "0",
        scrollTrigger: {
            trigger: ".main-contacts__content",
            start: "top 90%",
            end: "top 60%",
            scrub: true,
        }
    });

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateNumbers() {
        const letters = document.querySelectorAll('.main-about-company__letter p');
        letters.forEach((letter) => {
            const finalNumber = parseInt(letter.innerText, 10);
            let currentNumber = 0;
            const animationInterval = setInterval(() => {
                if (currentNumber === finalNumber) {
                    clearInterval(animationInterval);
                } else {
                    currentNumber++;
                    letter.innerText = currentNumber;
                }
            }, 20);
        });
    }

    let animationTriggered = false;

    document.addEventListener('scroll', () => {
        const bottomContainer = document.querySelector('.main-about-company__bottom-container');
        if (!animationTriggered && isElementInViewport(bottomContainer)) {
            animateNumbers();
            animationTriggered = true;
            const letters = document.querySelectorAll('.main-about-company__letter p');
            letters.forEach(e => {
                e.classList.add('opacity')
            })
        }
    });

    let mainProductsSwiper = new Swiper(".main-products-swiper", {
        slidesPerView: 3.2,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: '.main-products__btn-right',
            prevEl: '.main-products__btn-left'
        },

        on: {
            init: function () {
                updatePaginationProgress.call(this);
            },
            slideChange: function () {
                updatePaginationProgress.call(this);
            }
        }
    });

    function updatePaginationProgress() {
        const slideWidth = this.slides[0].offsetWidth;
        const slideGap = parseInt(window.getComputedStyle(this.slides[0]).marginRight);
        const slidesInView = this.slides.length / this.params.slidesPerView;
        const progress = Math.ceil(this.realIndex + 2) / slidesInView;
        const paginationBar = document.querySelector('.main-products__pagination-container div');
        paginationBar.style.width = `${(slideWidth + slideGap) * progress}px`;
    }
})