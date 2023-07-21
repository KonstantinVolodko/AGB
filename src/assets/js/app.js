document.addEventListener("DOMContentLoaded", () => {


    //= components/


    let textElement = document.querySelector(".header__logo");
    let textToType = "AGB Trading\ncompany";
    textElement.innerText = "";

    function typeText(text, i) {
        if (i < text.length) {
            textElement.innerText += text.charAt(i);
            textElement.innerHTML += '<span class="cursor"></span>';
            setTimeout(function () {
                typeText(text, i + 1);
            }, 100);
        }
    }
    typeText(textToType, 0);

    const widthValue = window.matchMedia("(max-width: 650px)").matches ? "52.4749%" : "64.286%";

    if (window.matchMedia("(min-width: 500px)").matches) {
        gsap.to(".main-about-company__top-container .main-about-company__line", {
            width: widthValue,
            scrollTrigger: {
                trigger: ".main-about-company__top-container",
                start: "bottom-=300 center",
                end: "top+=300 center",
                scrub: true,
            }
        });
    }

    if (window.matchMedia("(min-width: 500px)").matches) {
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
    }

    if (window.matchMedia("(min-width: 500px)").matches) {
        gsap.to(".main-about-company__bottom-container .main-about-company__line", {
            width: "39.556%",
            scrollTrigger: {
                trigger: ".main-about-company__bottom-container",
                start: "bottom-=250 center",
                end: "top+=250 center",
                scrub: true,
            }
        });
    }

    if (window.matchMedia("(min-width: 500px)").matches) {
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
    }

    if (window.matchMedia("(min-width: 500px)").matches) {
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
    }


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
        const bottomContainer = document.querySelector('.main-about-company__letter-container');
        if (bottomContainer && !animationTriggered && isElementInViewport(bottomContainer)) {
            animateNumbers();
            animationTriggered = true;
            const letters = document.querySelectorAll('.main-about-company__letter p');
            letters.forEach(e => {
                e.classList.add('opacity')
            })
        }
    });

    document.addEventListener('scroll', () => {
        const aboutCompanybottomContainer = document.querySelector('.aboutCompany__numbers');
        if (aboutCompanybottomContainer && !animationTriggered && isElementInViewport(aboutCompanybottomContainer)) {
            animateNumbers();
            animationTriggered = true;
            const letters = document.querySelectorAll('.main-about-company__letter p');
            letters.forEach(e => {
                e.classList.add('opacity')
            })
        }
    });

    let mainProductsSwiper = new Swiper(".main-products-swiper", {
        slidesPerView: 1.4,
        spaceBetween: 20,
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
        },

        breakpoints: {
            500: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },

            650: {
                slidesPerView: 3.2,
                spaceBetween: 30,
            }
        }
    });

    function updatePaginationProgress() {
        const parentWidth = document.querySelector('.main-products__pagination-container').offsetWidth;
        const slideCount = this.slides.length;
        const slidesInView = this.params.slidesPerView;
        const progress = (this.realIndex + slidesInView) / slideCount;
        const paginationBar = document.querySelector('.main-products__pagination-container div');
        const slideWidthPercentage = 100 / slidesInView;
        const slideGapPercentage = (100 - slideWidthPercentage) / (slideCount - slidesInView);
        const paginationBarWidth = (slideWidthPercentage * progress) + (slideGapPercentage * this.realIndex);
        paginationBar.style.width = `${paginationBarWidth}%`;
    }
    
    let headerLanguage = document.querySelector('.header__language')
    let headerLanguageBtn = document.querySelector('.header__language button')
    let headerLanguageDropdown = document.querySelector('.header__language-dropdown')

    let hideLanguage = () => {
        headerLanguageDropdown.style.border = 'none'
        headerLanguageDropdown.style.height = '0';
        headerLanguage.classList.remove('active')
    }

    let showLanguage = () => {
        headerLanguageDropdown.style.borderLeft = '0.1rem solid #E1E1E1';
        headerLanguageDropdown.style.borderRight = '0.1rem solid #E1E1E1';
        headerLanguageDropdown.style.borderBottom = '0.1rem solid #E1E1E1';
        headerLanguageDropdown.style.height = `${headerLanguageDropdown.scrollHeight}px`;
        headerLanguage.classList.add('active')
    }
 
    headerLanguageBtn.addEventListener('click', e => {
        if (headerLanguageDropdown.offsetHeight > 0) {
            hideLanguage()
        } else {
            showLanguage()
        }
    })

    let headerSearchBtn = document.querySelector('.header__search button');
    let headerSearchContainer = document.querySelector('.header__search .header__search-field');
    let headerSearchList = document.querySelector('.header__search ul');
    let headerSearchInput = document.querySelector('.header__search .header__search-field input');

    headerSearchBtn.addEventListener('click', e => {
        if (headerSearchContainer.offsetWidth > 0 && headerSearchInput.value === "") {
            closeHeaderSearchContainer();
        } else {
            openHeaderSearchContainer();
            hideLanguage()
        }
    });

    headerSearchContainer.addEventListener('keyup', () => {
        if (headerSearchInput.value === "") {
            if (headerSearchContainer.offsetWidth > 0) {
                closeHeaderSearchContainer();
            }
        } else {
            openHeaderSearchContainer();
        }
        headerSearchList.style.height = "max-content";
        headerSearchList.style.marginTop = "2rem";
    });

    function closeHeaderSearchContainer() {
        headerSearchContainer.style.width = "0rem";
        headerSearchContainer.style.padding = "0rem";
        headerSearchContainer.style.overflow = "hidden";
    }

    function openHeaderSearchContainer() {
        headerSearchContainer.style.width = "58rem";
        headerSearchContainer.style.padding = "2rem";
        headerSearchContainer.style.overflow = "visible";
    }

    document.addEventListener('click', e => {
        if (!headerSearchContainer.contains(e.target) && headerSearchContainer.offsetWidth > 0) {
            closeHeaderSearchContainer();
        }
    });

    window.addEventListener('resize', () => {
        if (headerSearchContainer.offsetWidth > 0) {
            closeHeaderSearchContainer();
        }
    });




    class Modal {
        constructor(modalId, openButtons) {
        this.modal = document.getElementById(modalId);
        this.openButtons = [];

        if (typeof openButtons === 'string') {
            this.openButtons = Array.from(document.getElementsByClassName(openButtons));
        } else if (Array.isArray(openButtons)) {
            this.openButtons = openButtons.map(buttonId => document.getElementById(buttonId));
        } else if (typeof openButtons === 'object') {
            for (const className in openButtons) {
                if (openButtons.hasOwnProperty(className)) {
                    this.openButtons.push(...Array.from(document.getElementsByClassName(className)));
                }
            }
        }

        this.openButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.open();
                this.disableBodyScroll();
            });
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.close();
                this.enableBodyScroll();
            }
        });

        const closeButton = this.modal.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.close();
                this.enableBodyScroll();
            });
        }

    }

        open() {
            this.modal.style.display = 'block';
            setTimeout(() => {
                this.modal.classList.add('open');
            }, 10);
        }

        close() {
            this.modal.classList.remove('open');
            setTimeout(() => {
                this.modal.style.display = 'none';
            }, 300);
        }

        disableBodyScroll() {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = scrollBarWidth + 'px';
            document.body.style.overflow = 'hidden';
        }

        enableBodyScroll() {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
        
    }

    const myModalByClass = new Modal('header__burger-modal');
    const feedBackModal = new Modal('feedback-modal', 'feedback-modal-btn');
    const filterModal = new Modal('catalog-filter-modal', 'catalog-filter-button');

    let headerBurgerModal = document.querySelector('.header__burger-modal')
    headerBurgerModal.style.marginTop = `${document.querySelector('.header__content').scrollHeight}px`

    let catalogFilterModal = document.querySelector('.catalog-filter-modal')
    catalogFilterModal.style.marginTop = `${document.querySelector('.header__content').scrollHeight}px`


    document.querySelector('.header__burger-modal-menu').innerHTML = document.querySelector('.header__menu-list').innerHTML
    document.querySelector('.header__burger-modal-search').innerHTML = document.querySelector('.header__search').innerHTML
    document.querySelector('.header__burger-modal-button').innerHTML = document.querySelector('.header__form-button').innerHTML
    document.querySelector('.footer-right__bottom-mobile-text').innerHTML = document.querySelector('.footer-left div').innerHTML
    document.querySelector('.footer-right__bottom-mobile-btns').innerHTML = document.querySelector('.footer-right__contacts-btns').innerHTML

    let headerBurgerButton = document.querySelector('.header__burger-button')
    headerBurgerButton.addEventListener('click', e => {
        if (!headerBurgerModal.classList.contains("open")) {
            myModalByClass.open()
            headerBurgerButton.classList.add('cross')
            document.body.style.overflow = 'hidden';
        } else if (headerBurgerModal.classList.contains("open")) {
            myModalByClass.close()
            headerBurgerButton.classList.remove('cross')
            document.body.style.overflow = '';
        }

    })

    if (document.querySelector('.catalog-filter-modal-content div') && document.querySelector('.catalog-filter')) {
        document.querySelector('.catalog-filter-modal-content div').innerHTML = document.querySelector('.catalog-filter').innerHTML
    }



    let acc = document.getElementsByClassName("catalog-filter__accordion");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.paddingTop = "0px";
                panel.style.maxHeight = null;
                this.querySelector('.arrow').classList.remove('active')
            } else {
                panel.style.paddingTop = "15px";
                panel.style.maxHeight = panel.scrollHeight + "px";
                this.querySelector('.arrow').classList.add('active')

            }
        });
    }

    if (acc[0]) {
        acc[0].click()
    }

    let mobileSearchList = document.querySelector('.header__burger-modal-search ul')
    let mobileSearchInput = document.querySelector('.header__burger-modal-search input')

    mobileSearchInput.addEventListener('keyup', () => {
        mobileSearchList.style.height = "max-content";
        mobileSearchList.style.marginTop = "1rem";
    });

    let prevScrollPosition = window.pageYOffset;
    let header = document.querySelector('.header');
    let headerHeight = header.offsetHeight;


    window.onscroll = function () {
        let currentScrollPosition = window.pageYOffset;

        if (prevScrollPosition > currentScrollPosition) {
            header.style.top = "0";
        } else {
            header.style.top = `-${headerHeight + 20 + 'px'}`;
            hideLanguage()
            closeHeaderSearchContainer()
        }

        prevScrollPosition = currentScrollPosition;
    }

})