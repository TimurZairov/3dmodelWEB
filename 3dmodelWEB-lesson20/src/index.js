'use strict';
//наша команда
//photo
    // менять картинки команды
    const photoImg = document.querySelectorAll('.command__photo');
    photoImg.forEach(item => {
        const imgSrc = item.src;
        item.addEventListener('mouseenter', (e) => {
            e.target.src = e.target.dataset.img;
        });
        item.addEventListener('mouseout', (e) => {
            e.target.src = imgSrc;
        });
    });

import countTimer from './modules/countTimer';
import toogleMenu from './modules/toogleMenu';
import tooglePopUp from './modules/tooglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import numberType from './modules/numberType';
import russianType from './modules/russianType';
import emailInput from './modules/emailInput';
import sendForm from './modules/sendForm';

//timer
countTimer('28 march 2021');
//menu 
toogleMenu();
//popUp модальные окна
tooglePopUp();
//tab смена табов
tabs();
//slider 
slider();
//можно писать только цифры надо исправить тут есть глюк
numberType();
//ввод только кириллицы
russianType();
//emailform 
emailInput();
//отправка данных
sendForm();