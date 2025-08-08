$(document).ready(function() {
    /* Карусель с товарами и выбором карточки по клику на превью */

    if ($('.hero-single__images').length > 0) {
        const $carousel = $('.hero-single__images');

        $carousel.owlCarousel({
            loop: true,
            autoplay: false,
            nav: false,
            dots: false,
            center: true,
            touchDrag: true,
            pullDrag: true,
            responsive: {
                0: {
                    items: 1.7,
                    margin: 10
                },
                769: {
                    items: 1,
                    margin: 0
                }
            }
        });

        $('.hero-single__gallery-image').on('click', function() {
            const index = $(this).data('index');
            $carousel.trigger('to.owl.carousel', [index, 300]);
        });

        $('.form__label').on('click', function() {
            const index = $(this).data('index');

            if (index == undefined) return
            $carousel.trigger('to.owl.carousel', [index, 300]);
        });
    }

    const $owl = $('.image-slider__cards').owlCarousel(
        {
            margin: 5,
            loop: true,
            nav: false,
            dots: false,
            animateIn: "fadeInLeft",
            animateOut: "fadeOutLeft",
            pullDrag: true,
            autoWidth: true,
            autoHeight: false,
        });
        $(".image-slider__button_next").click(function() {
            $owl.trigger("next.owl.carousel");
        });

        $(".image-slider__button_prev").click(function() {
            $owl.trigger("prev.owl.carousel");
    });

});
