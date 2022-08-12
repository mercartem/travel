// local sorage

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

const timeOfDay = getTimeOfDay();

let key = 'en';
let tagImg = timeOfDay;
const chooseImg = document.querySelector('.image');
const show = document.querySelectorAll('.show');
const tag = document.querySelector('.tag');

const setLocalStorageSetting = () => {
    localStorage.setItem('lang', key);
    localStorage.setItem('img', chooseImg.textContent);
    localStorage.setItem('tag', tagImg);
    let arrayShow = [];
    for (let i = 0; i < show.length; i++) {
        arrayShow.push(show[i].textContent);
    }
    localStorage.setItem('show', JSON.stringify(arrayShow));
}
window.addEventListener('beforeunload', setLocalStorageSetting)

const getLocalStorageSetting = () => {
    if (localStorage.getItem('lang')) {
        key = localStorage.getItem('lang');
        chooseImg.textContent = localStorage.getItem('img');
        tagImg = localStorage.getItem('tag');
        tag.value = localStorage.getItem('tag');
        let arrayShow = JSON.parse(localStorage.getItem('show'));
        for (let i = 0; i < show.length; i++) {
            show[i].textContent = arrayShow[i];
        }
    }
}
getLocalStorageSetting()

const state = {
    changeLanguage: 'en',
    photoSource: 'github',
    blocks: ['time', 'date','greeting-container', 'quotes', 'weather', 'player', 'todo-list']
}

const ShowBlocks = () => {
    for (let i = 0; i < show.length; i++) {
        let block = document.querySelector(`.${state.blocks[i]}`);
        if (show[i].textContent === 'Hide' || show[i].textContent === 'Скрыто') {
            show[i].style.opacity = '0.8';
            block.style.opacity = '0';
        } else {
            show[i].style.opacity = '1';
            block.style.opacity = '1';
        }
    }
}
ShowBlocks();

//language

const language = document.querySelector('.language');
const settingsTitle = document.querySelector('.popup-title');
const settingsTitle2 = document.querySelector('.popup-title2')
const settingLanguage = document.querySelector('.change-language');
const settingImage = document.querySelector('.change-img');
const todoBtn = document.querySelector('.todo-list');
const todoOpt = document.querySelector('.todo-options');
const todoPlaceholder = document.querySelector('.todo-text');
const blockName = document.querySelectorAll('.block-name');
const arrayBlocks = [
                    ['Время:', 'Дата:', 'Приветствие:', 'Цитата:', 'Погода:', 'Плеер:', 'Список дел:'], 
                    ['Time:', 'Date:','Greeting:', 'Quote:', 'Weather:', 'Player:', 'ToDo list:']
                    ];

const getAppLanguage = (key) => {
    if (key === 'ru') {
        language.textContent = 'Русский';
        settingsTitle.textContent = 'Настройки';
        settingLanguage.textContent = 'Выбрать язык приложения:';
        settingImage.textContent = 'Выбрать источник изображений:';
        settingsTitle2.textContent = 'Отображаемые блоки';
        todoBtn.textContent = 'Список дел';
        todoOpt.textContent = 'Входящие';
        todoPlaceholder.placeholder = 'Новая задача';
        for (let i = 0; i < show.length; i++) {
            if (show[i].textContent === 'Видно' || show[i].textContent === 'Show') {
                show[i].textContent = 'Видно';
            } else {
                show[i].textContent = 'Скрыто';
            }
        }
        for (let i = 0; i < blockName.length; i++) {
            blockName[i].textContent = arrayBlocks[0][i];
        }
    } else {
        language.textContent = 'English';
        settingsTitle.textContent = 'Settings';
        settingLanguage.textContent = 'Select app language:';
        settingImage.textContent = 'Select images source:';
        settingsTitle2.textContent = 'Visible blocks';
        todoBtn.textContent = 'Todo';
        todoOpt.textContent = 'Inbox';
        todoPlaceholder.placeholder = 'New Todo';
        for (let i = 0; i < show.length; i++) {
            if (show[i].textContent === 'Show' || show[i].textContent === 'Видно') {
                show[i].textContent = 'Show';
            } else {
                show[i].textContent = 'Hide';
            }
        }
        for (let i = 0; i < blockName.length; i++) {
            blockName[i].textContent = arrayBlocks[1][i];
        }
    }  
}
getAppLanguage(key);

language.addEventListener('click', () => {
    if (key === 'en') {
        language.textContent = 'Русский';
        settingsTitle.textContent = 'Настройки';
        settingLanguage.textContent = 'Выбрать язык приложения:';
        settingImage.textContent = 'Выбрать источник изображений:';
        settingsTitle2.textContent = 'Отображаемые блоки';
        todoBtn.textContent = 'Список дел';
        todoOpt.textContent = 'Входящие';
        todoPlaceholder.placeholder = 'Новая задача';

        for (let i = 0; i < show.length; i++) {
            if (show[i].textContent === 'Show') {
                show[i].textContent = 'Видно';
            } else {
                show[i].textContent = 'Скрыто';
            }
        }
        for (let i = 0; i < blockName.length; i++) {
            blockName[i].textContent = arrayBlocks[0][i];
        }
        key = 'ru';
    } else {
        language.textContent = 'English';
        settingsTitle.textContent = 'Settings';
        settingLanguage.textContent = 'Select app language:';
        settingImage.textContent = 'Select images source:';
        settingsTitle2.textContent = 'Visible blocks';
        todoBtn.textContent = 'Todo';
        todoOpt.textContent = 'Inbox';
        todoPlaceholder.placeholder = 'New Todo';
        for (let i = 0; i < show.length; i++) {
            if (show[i].textContent === 'Видно') {
                show[i].textContent = 'Show';
            } else {
                show[i].textContent = 'Hide';
            }
        }
        for (let i = 0; i < blockName.length; i++) {
            blockName[i].textContent = arrayBlocks[1][i];
        }
        key = 'en';
    }
    showTime(key);
    getWeather(key);
    getQuotes(key);
})

const greetingTranslation = {
    ru: {
        night: 'Доброй ночи,',
        morning: 'Доброе утро,',
        afternoon: 'Добрый день,',
        evening: 'Добрый вечер,',
        placeholder: '[Введите имя]',
        localDate: 'ru-RU'
    },
    en: {
        night: 'Good night',
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
        placeholder: '[Enter name]',
        localDate: 'en-US'
    }
}

//greeting

const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

const showGreeting = (key) => {
    const greetingText = greetingTranslation[key][timeOfDay];
    greeting.textContent = greetingText;
    const placeholderText = greetingTranslation[key]['placeholder'];
    name.placeholder = placeholderText;

}

// time and date

const showDate = (key) => {
    const time = document.querySelector('.date');
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const localDate = greetingTranslation[key]['localDate'];
    const currentTime = date.toLocaleDateString(localDate, options);
    time.textContent = currentTime;
};

const showTime = () => {
    const time = document.querySelector('.time');
    const date = new Date();
    const localDate = greetingTranslation[key]['localDate'];
    const currentTime = date.toLocaleTimeString(localDate, { hour12: false });
    time.textContent = currentTime;
    showGreeting(key);
    showDate(key);
    setTimeout(showTime, 1000, key);
};
showTime(key);

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

const slideNext = document.querySelector('.slide-next');
const getSlideNext = () => {
    if (randomNum < 20) {
        randomNum++;
    } else {
        randomNum = 1;
    }
    setBg();
}

const slidePrev = document.querySelector('.slide-prev');
const getSlidePrev = () => {
    if (randomNum > 1) {
        randomNum--;
    } else {
        randomNum = 20;
    }
    setBg();
}

//weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');

console.log(key)
if (key === 'ru') {
    document.querySelector('.city').value = 'Минск';
} else {
    document.querySelector('.city').value = 'Minsk';
}


const setLocalStorageWeather = () => {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageWeather);

const getLocalStorageWeather = () => {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    getWeather(key);
}
window.addEventListener('load', getLocalStorageWeather);

async function getWeather(key) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${key}&appid=34d724473457813dd0ad2021fbd92589&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok === true) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if (key === 'en') {
            wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
        } else {
            wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;
        }
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
getWeather(key);

city.addEventListener('change', () => {
    getWeather(key);
});

// quotes

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes(key) {
    let quotes;
    if (key === 'en') {
        quotes = 'data.json';
    } else {
        quotes = 'data2.json';
    }
    const res = await fetch(quotes);
    const data = await res.json();
    let random = data[getRandomNum(0, data.length-1)];

    quote.textContent = random.text;
    author.textContent = random.author;
}
getQuotes(key);

changeQuote.addEventListener('click', () => getQuotes(key));

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

setInterval(updateProgressValue, 1000);

function changeProgressBar() {
    audio.currentTime = progressBar.value;
};

progressBar.addEventListener('input', changeProgressBar);

// settings

const settingsBtn = document.querySelector('.settings');
const settingsPopup = document.querySelector('.popup-settings');
const settingsOverlay = document.querySelector('.popup-overlay');
const popup = document.querySelector('.popup');

function toggler() {
    settingsPopup.classList.toggle('popup-settings-active');
    settingsOverlay.classList.toggle('popup-overlay-active');
    popup.classList.toggle('popup-active');
}

settingsBtn.addEventListener('click', toggler)
settingsOverlay.addEventListener('click', toggler)

for (let i = 0; i < show.length; i++) {
    let block = document.querySelector(`.${state.blocks[i]}`);
    show[i].addEventListener('click', () => {
        if (show[i].textContent === 'Show' || show[i].textContent === 'Видно') {
            show[i].style.opacity = '0.8';
            if (key === 'en') {
                show[i].textContent = 'Hide';
            } else {
                show[i].textContent = 'Скрыто';
            }
            block.style.opacity = '0';
            block.style.transition = '1s';
        } else {
            show[i].style.opacity = '1';
            if (key === 'en') {
                show[i].textContent = 'Show';
            } else {
                show[i].textContent = 'Видно';
            }
            block.style.opacity = '1';
            block.style.transition = '1s';
        }
    })
}

// images API

async function getLinkFromUnsplash() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tagImg}&client_id=QoTpT0busaeJrpc-o_FPtWuqm7N_S1BeLhwtQ8TtGYk`
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok === false) {
        tagImg = timeOfDay;
        getLinkFromUnsplash();
    }
    const body = document.querySelector('body');
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
};

async function getLinkFromFlickr() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2476e6004fc81b8644b5cd4e6102e807&tags=${tagImg}&extras=url_l&format=json&nojsoncallback=1`
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok === false) {
        tagImg = timeOfDay;
        getLinkFromFlickr();
    }
    const body = document.querySelector('body');
    const img = new Image();
    img.src = data.photos.photo[getRandomNum(0, data.photos.photo.length-1)].url_l;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
};

const getBg = () => {
    if (chooseImg.textContent === 'Unsplash API') {
        getLinkFromUnsplash();
        tag.style.display = 'block';
    }
    else if ((chooseImg.textContent === 'Flickr API')) {
        getLinkFromFlickr();
        tag.style.display = 'block';
    } else {
        setBg();
        tag.style.display = 'none';
    }
}
getBg();

chooseImg.addEventListener('click', () => {
    if (chooseImg.textContent === 'GitHub') {
        getLinkFromUnsplash();
        chooseImg.textContent = 'Unsplash API';
        tag.style.display = 'block';
    }
    else if ((chooseImg.textContent === 'Unsplash API')) {
        getLinkFromFlickr();
        chooseImg.textContent = 'Flickr API'
        tag.style.display = 'block';
    } else {
        setBg();
        chooseImg.textContent = 'GitHub';
        tag.style.display = 'none';
    }
})

slideNext.addEventListener('click', () => {
    if (chooseImg.textContent === 'GitHub') {
        getSlideNext();
    } 
    else if (chooseImg.textContent === 'Unsplash API') {
        getLinkFromUnsplash();
    } else {
        getLinkFromFlickr();
    }
});
slidePrev.addEventListener('click', () => {
    if (chooseImg.textContent === 'GitHub') {
        getSlidePrev();
    } 
    else if (chooseImg.textContent === 'Unsplash API') {
        getLinkFromUnsplash();
    } else {
        getLinkFromFlickr();
    }
});

tag.addEventListener('change', () => {
    if (!!tag.value) {
        tagImg = tag.value;
    }
    if (tag.value === '') {
        tagImg = timeOfDay;
    }
    if (chooseImg.textContent === 'Flickr API') {
        getLinkFromFlickr();
    } 
    if (chooseImg.textContent === 'Unsplash API') {
        getLinkFromUnsplash();
    }
});

// todo

const todoList = document.querySelector('.todo');

todoBtn.addEventListener('click', () => {
    todoList.classList.toggle('todo-active');
})

const input = document.querySelector('.todo-text');
const ul = document.querySelector('.todo-items');

const listenDeleteTodo = (element) => {
    element.addEventListener("click", () => {
        element.parentElement.remove();
    });
}

const createTodo = () => {
    const li = document.createElement('li');
    li.classList.add('todo-item')

    const textLabel = document.createElement('label');
    textLabel.classList.add('todo-content');
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    const textSpan = document.createElement('span')
    textSpan.textContent = input.value;
    textLabel.append(check);
    textLabel.append(textSpan);

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('todo-trash');

    ul.appendChild(li).append(textLabel, deleteBtn);
    input.value = '';
    listenDeleteTodo(deleteBtn);

}

input.addEventListener("keypress", (key) => {
    const keyEnter = 13;
    if (key.which == keyEnter) {
        createTodo();
    }
});

const setLocalStorageTodo = () => {
    const ul = document.querySelector('.todo-items');
    localStorage.setItem('todo', ul.innerHTML);
    const check = document.querySelectorAll('input[type="checkbox"]');
    let array = [];
    for (let i = 0; i < check.length; i++) {
        array.push(check[i].checked);
    }
    localStorage.setItem('check', JSON.stringify(array));
}
window.addEventListener('beforeunload', setLocalStorageTodo);

const getLocalStorageTodo = () => {
    const data = localStorage.getItem('todo');
    if (data) {
        ul.innerHTML = data;
    }
    const deleteButtons = document.querySelectorAll('.todo-trash');
    for (const button of deleteButtons) {
        listenDeleteTodo(button);
    }
    const check = document.querySelectorAll('input[type="checkbox"]');
    let array = JSON.parse(localStorage.getItem('check'));
    for (let i = 0; i < check.length; i++) {
        check[i].checked = array[i];
    }
}
getLocalStorageTodo();










  
  