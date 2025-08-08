document.addEventListener('DOMContentLoaded', () => {
    console.log('hero-single js loaded!');

    const gallery = document.querySelector('.hero-single__gallery');

    if (!gallery) return console.error('DOM: no .hero-single__gallery element found');

    const buttonUp = document.querySelector('.hero-single__gallery-nav_up');
    const buttonDown = document.querySelector('.hero-single__gallery-nav_down');

    if (buttonUp) {
        buttonUp.addEventListener('click', galleryScrollUp);
    } else {
        return console.warn('DOM: no element ".hero-single__gallery-nav_up" found');        
    }

    if (buttonDown) {
        buttonDown.addEventListener('click', galleryScrollDown);
    } else {
        return console.warn('DOM: no element ".hero-single__gallery-nav_down" found');        
    }

    function galleryScrollUp () {
        gallery.scrollBy({ top: -220, behavior: 'smooth' });
    }

    function galleryScrollDown () {
        gallery.scrollBy({ top: 220, behavior: 'smooth' });
    }    
});