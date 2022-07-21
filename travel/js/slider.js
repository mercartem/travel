const rightArrow = document.querySelector('.right_arrow');
const leftArrow = document.querySelector('.left_arrow');

const cards = document.querySelector('.destinations_cards');

const ellipseOne = document.querySelector('.destinations_ellipse_1');
const ellipseTwo = document.querySelector('.destinations_ellipse_2');
const ellipseThree = document.querySelector('.destinations_ellipse_3');

let left = 0;
let cardWidth = document.querySelector('.destinations_slider-item').offsetWidth + 60;

function init() {
    cardWidth = document.querySelector('.destinations_slider-item').offsetWidth + 60;
}

window.addEventListener('resize', init);

slideTo = (direction) => {
    if (direction === 'left') {
        left = left - cardWidth;
        ellipseOne.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseTwo.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseThree.style.background = '#F2785C';
        
    }
    if (direction === 'right') {
        left = left + cardWidth;
        ellipseThree.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseTwo.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseOne.style.background = '#F2785C';
    }
    if (left === 0) {
        ellipseOne.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseThree.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseTwo.style.background = '#F2785C';
    }
    if (left < -cardWidth) {
        left = cardWidth;
        ellipseThree.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseTwo.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseOne.style.background = '#F2785C';
    }
    if (left > cardWidth) {
        left = -cardWidth;
        ellipseOne.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseTwo.style.background = 'rgba(242, 120, 92, 0.5)';
        ellipseThree.style.background = '#F2785C';
    }

    cards.style.left = left + 'px';
}

leftArrow.addEventListener('click', () => {
    slideTo('left');
})

rightArrow.addEventListener('click', () => {
    slideTo('right');
})

