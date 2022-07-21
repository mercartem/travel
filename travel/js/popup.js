window.addEventListener('DOMContentLoaded', () => {

    const loginButton = document.querySelector('.login_form-button');
    const accountButton = document.getElementById('account');
    const popup = document.querySelector('.popup_login');
    const overlayPopup = document.querySelector('.popup_overlay');
    const register = document.querySelector('.link_popup-sign');
    const registerWrapper = document.querySelector('.register_wrapper');
    const linkTitle = document.querySelector('.link_title');
    const title = document.querySelector('.popup_title');
    const sign = document.querySelector('.button_register');
    const question = document.querySelector('.question');
    const form = document.querySelector('.button_register');
    const email = document.querySelector('.email_input');
    const password = document.querySelector('.password_input');

    const toggler = () => {
        popup.classList.toggle('popup_login-active');
        overlayPopup.classList.toggle('popup_overlay-active');
        popup.classList.contains('popup_login-active') ? document.body.style.overflow = '' : document.body.style.overflow = 'hidden';
    }

    const getRegister = () => {
        registerWrapper.classList.toggle('popup-active');
        linkTitle.classList.toggle('popup-active');

        if (title.textContent === 'Log in to your account') {
            title.textContent = 'Create account';
        } else {
            title.textContent = 'Log in to your account';
        }
        if (sign.textContent === 'Sign In') {
            sign.textContent = 'Sign Up';
        } else {
            sign.textContent = 'Sign In';
        }
        if (register.textContent === 'Register') {
            register.textContent = 'Log in';
        } else {
            register.textContent = 'Register';
        }
        if (question.innerHTML === 'Don`t have an account?&nbsp;') {
            question.innerHTML = 'Already have an account?&nbsp;';
        } else {
            question.innerHTML = 'Don`t have an account?&nbsp;';
        }

    }

    const getAlert = () => {
        alert(`Введенные данные:
            email: ${email.value}
            password: ${password.value}`);
    }

    loginButton.addEventListener('click', toggler);
    accountButton.addEventListener('click', toggler);
    overlayPopup.addEventListener('click', toggler);
    register.addEventListener('click', getRegister);
    form.addEventListener('click', getAlert);
});