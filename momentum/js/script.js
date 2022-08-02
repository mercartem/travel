// greeting

const getTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 5 && hours < 12) {
        return 'morning';
    }
    if (hours > 11 && hours < 18) {
        return 'afternoon';
    }
    if (hours > 17 && hours < 24) {
        return 'evening';
    }
    if (hours >= 0 && hours < 6) {
        return 'night';
    }
}

const showGreeting = () => {
    const greeting = document.querySelector('.greeting');
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
}

// time and date

const showDate = () => {
    const time = document.querySelector('.date');
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentTime = date.toLocaleDateString(0, options);
    time.textContent = currentTime;
};

function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString(0, { hour12: false });
    time.textContent = currentTime;
    showGreeting();
    showDate();
    setTimeout(showTime, 1000);
};
showTime();

// name

const setLocalStorage = () => {
    const name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

const getLocalStorage = () => {
    const name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

// background

const getRandomNum = (min = 1, max = 20) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum();

function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    const body = document.querySelector('body');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/mercartem/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/mercartem/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    };
}
setBg();

const slideNext = document.querySelector('.slide-next');
const getSlideNext = () => {
    if (randomNum < 20) {
        randomNum++;
    } else {
        randomNum = 1;
    }
    setBg();
}
slideNext.addEventListener('click', getSlideNext);

const slidePrev = document.querySelector('.slide-prev');
const getSlidePrev = () => {
    if (randomNum > 1) {
        randomNum--;
    } else {
        randomNum = 20;
    }
    setBg();
}
slidePrev.addEventListener('click', getSlidePrev);

//weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');
document.querySelector('.city').value = 'Минск';

const setLocalStorageWeather = () => {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageWeather);

const getLocalStorageWeather = () => {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    getWeather();
}
window.addEventListener('load', getLocalStorageWeather);

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=34d724473457813dd0ad2021fbd92589&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok === true) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        weatherError.textContent = ``;
    } else {
        weatherError.textContent = `Error! ${data.message} for \"${city.value}\"!`;
        weatherIcon.className = '';
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        wind.textContent = ``;
        humidity.textContent = ``;
    }
}
getWeather()

city.addEventListener('change', getWeather);

// quotes

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let random = data[getRandomNum(0,1642)];

    quote.textContent = random.text;
    author.textContent = random.author;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);

// audio

const playBtn = document.querySelector('.play');
const audio = new Audio();
let isPlay = false;

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if (isPlay === false) {
        audio.play();
        isPlay = true;
        itemBefore[playNum].classList.add('item-active');
    } else {
        audio.pause();
        isPlay = false;
    }
}
playBtn.addEventListener('click', playAudio);

function toggleBtn() {
    if (isPlay === false) {
        playBtn.classList.remove('pause');
    } else {
        playBtn.classList.add('pause');
    }
}
playBtn.addEventListener('click', toggleBtn);

let playNum = 0;

function playSlideAudio() {
    audio.src = playList[playNum].src;
    audio.play();
    playBtn.classList.add('pause');
    isPlay = true;
}

const playNextBtn = document.querySelector('.play-next');
const PlayNext = () => {
    if (playNum < 3) {
        playNum++;
        itemBefore[playNum-1].classList.remove('item-active');
    } else {
        playNum = 0;
        itemBefore[playList.length-1].classList.remove('item-active');
    }
    itemBefore[playNum].classList.add('item-active');
    playSlideAudio();
}
playNextBtn.addEventListener('click', PlayNext);
audio.addEventListener('ended', PlayNext);

const playPrevBtn = document.querySelector('.play-prev');
const PlayPrev = () => {
    if (playNum > 0) {
        playNum--;
        itemBefore[playNum+1].classList.remove('item-active');
    } else {
        playNum = 3;
        itemBefore[0].classList.remove('item-active');
    }
    itemBefore[playNum].classList.add('item-active');
    playSlideAudio();
}
playPrevBtn.addEventListener('click', PlayPrev);

import playList from './playList.js';

playList.forEach(el => {
    const li = document.createElement('li');
    const playListContainer = document.querySelector('.play-list');

    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
})

const itemBefore = document.querySelectorAll('.play-item');





  
  