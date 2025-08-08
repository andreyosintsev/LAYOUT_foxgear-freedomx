(function(){

    document.addEventListener('DOMContentLoaded', () => {

        const accordion = document.querySelector('.accordion');

        if (!accordion) {
            return console.error('DOM: no .accordion element found');
        };

        const accordionItemTitles = accordion.querySelectorAll('.accordion__item-title');

        accordionItemTitles.forEach(accordionItemTitle =>
            accordionItemTitle.addEventListener('click', function() {
                    const item = this.closest('.accordion__item');
                    const content = item.querySelector('.accordion__item-content');

                    if (item.classList.contains('accordion__item_active')) {
                        content.style.maxHeight = '0';
                        item.classList.remove('accordion__item_active');
                    } else {
                        item.classList.add('accordion__item_active');
                        content.style.maxHeight = content.scrollHeight + 'px'; //
                    }
                }
            )
        );

    });

})();
