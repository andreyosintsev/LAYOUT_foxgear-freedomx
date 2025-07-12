/*
    НАСТРОЙКИ ОТПРАВКИ ФОРМЫ ОБРАТНОЙ СВЯЗИ
*/
    //Публичный ключ API keys Public Key - https://dashboard.emailjs.com/admin/account
    const mailPublicKey = '';

    //Почтовый сервис - https://dashboard.emailjs.com/admin
    const mailServiceID = '';

    //Шаблон письма - https://dashboard.emailjs.com/admin/templates
    const mailTemplateID = '';


const placeholders = {};

document.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('body');
    const popup = document.querySelector('#popup-order');
    const popupSuccess = document.querySelector('#popup-success');
    const popupFailed = document.querySelector('#popup-failed');
    const form = document.querySelector('.form');
    const closeButtons = document.querySelectorAll('.popup__close');
    const overlay = document.querySelector('.overlay');
    const loader = document.querySelector('.loader');
    
/*
    РАБОТА C POPUP
*/
    const buyButtons = document.querySelectorAll('.button_buy');

    if (!popup) {
        return console.error('DOM: element ".popup" not found');
    }
    
    buyButtons.forEach(
        button => button.addEventListener('click', (e) => {
            showPopup(body, popup, overlay);
            setProduct(e.target, popup);
        })
    );

    closeButtons.forEach(button => button.addEventListener('click', hidePopups));
        
    if (overlay) {
        overlay.addEventListener('click', hidePopups);
    }

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            hidePopups();
        }
    });

    function hidePopupAndResetForm() {
        hidePopup(body, popup, overlay);
        setProduct(undefined, popup);
        resetForm(form);
        clearFormErrors(form);
        hideLoader(loader);
    }

    function hidePopups() {
        hidePopupAndResetForm();
        hidePopup(body, popupSuccess, overlay);
        hidePopup(body, popupFailed, overlay);
    }

/*
    РАБОТА С ФОРМОЙ
*/  
    if (!form) {
        console.error('Ошибка: в HTML отсутствует form');
        return;
    }

    form.addEventListener('submit', (e) => {
        if (!checkFormErrors(e)) return;

        showLoader(loader);

        emailjs.sendForm(mailServiceID, mailTemplateID, form)
        .then(
            (response) => {
                console.log('Письмо успешно отправлено!', response.status, response.text);
                hidePopupAndResetForm();        
                showPopup(body, popupSuccess, overlay);
            },
            (error) => {
                console.error('Не удалось отправить письмо', error);
                hidePopupAndResetForm();        
                showPopup(body, popupFailed, overlay);
            }
        )
        .finally(
            () => {
                hideLoader(loader);
            }
        );
    });

    form.addEventListener('click', (e) => clearFormErrors(e.currentTarget));

    const inputs = form.querySelectorAll('.form__input');
    inputs.forEach(input => placeholders[input.name] = input.placeholder);

/*
    ПОДГОТОВКА ОТПРАВКИ ФОРМЫ ПРИ ПОМОЩИ EMAILJS.COM
*/
    // emailjs.init({
    //     publicKey: mailPublicKey,
    // });
});

function showPopup (body, popup, overlay) {
    body.classList.add('noscroll');
    popup.classList.remove('hidden');
    if (overlay) overlay.classList.remove('hidden');
}

function hidePopup (body, popup, overlay) {
    body.classList.remove('noscroll');
    popup.classList.add('hidden');
    if (overlay) overlay.classList.add('hidden');
}

function setProduct (button, popup) {
    if (!popup) {
        return console.error('DOM: no elemen #popup-order found');
    }

    const product = button ? button.dataset.product : '';
    const inputProduct = popup.querySelector('.form input[name="product"]');

    if (!inputProduct) {
        return console.error('DOM: no data-product specified in .button_buy');
    }
       
    inputProduct.value = product;

    const popupProduct = popup.querySelector('.popup__product');
    if (!popupProduct) {
        return console.error('DOM: no .popup__product element found');
    }

    popupProduct.innerHTML = product ? 'Модель: ' + product : '';
}

function checkFormErrors(e) {
    e.preventDefault();

    let isFormValid = true;

    const form = e.currentTarget;
    
    const formName = form.querySelector('input[name="name"]');
    const formTel = form.querySelector('input[name="tel"]');
    const formEmail = form.querySelector('input[name="email"]');

    if (!formName || !formName.value) {
        console.warn('Error: no input "name" or no name specified in form');
        
        formName.classList.add('form__input_error');
        formName.placeholder = 'Укажите ваше имя';
        
        isFormValid = false;
    }

    if (!((formTel && formTel.value) || (formEmail && formEmail.value))) {
        console.warn('Error: no input "tel" or "e-mail" in form');
        console.warn('Error: or no tel or e-mail specified in form');
        
        formTel.classList.add('form__input_error');
        formEmail.classList.add('form__input_error');
        formTel.placeholder = 'Укажите телефон';
        formEmail.placeholder = 'или адрес e-mail';
        
        isFormValid = false;
    }

    return isFormValid;
}

function clearFormErrors(form) {
    if (!form) {
        return console.error('DOM: no .form element found');
    }  

    const inputs = form.querySelectorAll('.form__input');
    inputs.forEach(input => {
        input.classList.remove('form__input_error');
        input.placeholder = placeholders[input.name] ? placeholders[input.name] : '';
    });
}

function resetForm(form) {
    if (!form) {
        return console.error('DOM: no .form element found');
    }          

    const inputs = form.querySelectorAll('.form__input');
    inputs.forEach(input => input.value = '');

    const popupProduct = document.querySelector('.popup__product');
    if (!popupProduct) {
        return console.error('DOM: no .popup__product element found');
    }

    popupProduct.innerHTML = '';
}

function showLoader(loader){
    if (!loader) return;

    loader.classList.remove('hidden');
}

function hideLoader(loader){
    if (!loader) return;

    loader.classList.add('hidden');
}
