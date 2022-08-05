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
    const currentTime = date.toLocaleDateString('en-Br', options);
    time.textContent = currentTime;
};

function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString('en-Br', { hour12: false });
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
const durationSound = document.querySelector('.duration');
let isPlay = false;

function playAudio() {
    let restoreTitle = playTitle.textContent;
    audio.src = playList[playNum].src;
    playTitle.textContent = playList[playNum].title;
    durationSound.textContent = playList[playNum].duration;
    if (restoreTitle != playList[playNum].title) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = progressBar.value;
    }
    if (isPlay === false) {
        audio.play();
        isPlay = true;
        for (let i = 0; i < itemBefore.length; i++) {
            if (itemBefore[i].classList.contains('item-active') === true) {
                itemBefore[i].classList.remove('item-active');
            }
        }
        itemBefore[playNum].classList.add('item-active');
        playBtn.classList.add('pause');
        for (let i = 0; i < playMini.length; i++) {
            if (playMini[i].classList.contains('pause-mini') === true) {
                playMini[i].classList.remove('pause-mini');
            }
        }
        playMini[playNum].classList.add('pause-mini');
    } else {
        audio.pause();
        isPlay = false;
        playBtn.classList.remove('pause');
        playMini[playNum].classList.remove('pause-mini');
    }
}
playBtn.addEventListener('click', playAudio);

let playNum = 0;

function playSlideAudio() {
    audio.src = playList[playNum].src;
    playTitle.textContent = playList[playNum].title;
    durationSound.textContent = playList[playNum].duration;
    audio.play();
    playBtn.classList.add('pause');
    for (let i = 0; i < playMini.length; i++) {
        if (playMini[i].classList.contains('pause-mini') === true) {
            playMini[i].classList.remove('pause-mini');
        }
    }
    playMini[playNum].classList.add('pause-mini');
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

itemBefore.forEach(el => {
    const div = document.createElement('div');

    div.classList.add('play-mini');
    el.append(div);
})

// advanced aidio

const playTitle = document.querySelector('.play-title');
const progressBar = document.querySelector('.play-progress');
const playMini = document.querySelectorAll('.play-mini');

for (let i = 0; i < playMini.length; i++) {
    playMini[i].addEventListener('click', () => {
        playNum = i;
        if (isPlay === true && playMini[i].classList.contains('pause-mini') === false) {
            isPlay = false;
            progressBar.value = 0;
            playAudio();
        } else {
            playAudio();
        }
    })    
}

const volumeProgress = document.querySelector('.volume-progress');
const volume = document.querySelector('.volume');

volumeProgress.addEventListener('input', () => {
    audio.volume = volumeProgress.value;
    if (audio.volume === 0) {
        volume.classList.add('mute');
    } else {
        volume.classList.remove('mute');
    }
})

let restoreValue;
function muteSound() {
    if (volumeProgress.value != 0) {
        restoreValue = volumeProgress.value;
        audio.volume = 0;
        volumeProgress.value = 0;
        volume.classList.add('mute');
    } else {
        volume.classList.remove('mute');
        volumeProgress.value = restoreValue;
        audio.volume = volumeProgress.value;
    }
}

volume.addEventListener('click', muteSound);

const current = document.querySelector('.time-now');

function updateProgressValue() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    current.innerHTML = (formatTime(Math.floor(audio.currentTime)));
};

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
    audio.currentTime = progressBar.value;
};

progressBar.addEventListener('input', changeProgressBar);

// languages












  
  