window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header_nav');
          burger = document.querySelector('.header_burger');
          overlay = document.querySelector('.header_overlay');
          toggler=()=>{
            menu.classList.toggle('header_nav-active');
            overlay.classList.toggle('header_overlay-active');
            menu.classList.contains('header_nav-active') ? document.body.style.overflow = '' : document.body.style.overflow = 'hidden';
        };
            
    burger.addEventListener('click', toggler);
    menu.childNodes.forEach(item => item.addEventListener('click', toggler));   
    overlay.addEventListener('click', toggler);
});


