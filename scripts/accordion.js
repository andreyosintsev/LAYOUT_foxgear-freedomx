(function(){

    document.addEventListener('DOMContentLoaded', () => {

        const accordions = document.querySelectorAll('.accordion');

        accordions.forEach(accordion => {
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
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    }
                )
            )
        })

        window.addEventListener('resize', accordionContentResize);
    });

    function accordionContentResize() {
        const activeAccordionItems = document.querySelectorAll('.accordion__item_active');

        activeAccordionItems.forEach(accordionItem => {
            const content = accordionItem.querySelector('.accordion__item-content');
            if (content) content.style.maxHeight = content.scrollHeight + 'px';
        });
    }
})();
