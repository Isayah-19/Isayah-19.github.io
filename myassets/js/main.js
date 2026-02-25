/*==================== MENU SHOW Y HIDDEN ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58
        const sectionId = current.getAttribute('id')
        const navItem = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (navItem) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItem.classList.add('active')
            } else {
                navItem.classList.remove('active')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== PROJECT SLIDER (SWIPER) ====================*/
let swiperProjects = new Swiper(".projects__container", {
    loop: true,
    spaceBetween: 24,
    grabCursor: true,
    
    // This helps if the slider initializes before the page is fully styled
    observer: true,
    observeParents: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true, // Makes dots look cleaner
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // Setting a default first
    slidesPerView: 1,

    breakpoints: {
        // Mobile: 1 slide
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // Tablet: 2 slides
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        // Desktop: 3 slides
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data, .about__img, .section-title', { interval: 100 });
sr.reveal('.about__text, .experience__card, .award__card, .cert-card', { delay: 400, interval: 100 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .project__card, .contact__box, .contact__form', { interval: 200 });

/*==================== CONTACT FORM VALIDATION ====================*/
(function($) {
    "use strict";
    if ($('#contactForm').length > 0) {
        $("#contactForm").validate({
            rules: {
                name: "required",
                subject: "required",
                email: { required: true, email: true },
                message: { required: true, minlength: 5 }
            },
            submitHandler: function(form) {
                const $submit = $('.submitting'),
                      waitText = 'Sending...';
                $.ajax({
                    type: "POST",
                    url: "php/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function() {
                        $submit.css('display', 'block').text(waitText);
                    },
                    success: function(msg) {
                        if (msg == 'OK') {
                            alert("Message Sent Successfully!");
                            form.reset();
                            $submit.css('display', 'none');
                        } else {
                            alert("Error: " + msg);
                            $submit.css('display', 'none');
                        }
                    }
                });
            }
        });
    }
})(jQuery);
