window.addEventListener('DOMContentLoaded', () => {
    'use srict';
    //timer
    function countTimer(deadLine) {
            // объявляем переменные
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timarSeconds = document.querySelector('#timer-seconds');

            function getTimeRamaining(){
            let dateStop = new Date(deadLine).getTime(), // deadline передаем в при вызове функции counterTimer
            dateNow = new Date().getTime(); // берем сегодняшний день
            timeRamainig = (dateStop - dateNow) / 1000; // вычитываем милисекунды до конца deadLine-ф 
            seconds = Math.floor(timeRamainig % 60);    // округляем с помощью mathfloor и полученные милисекунды делим с остатком 
            minutes = Math.floor((timeRamainig / 60) % 60); // так же вычисляем и минуты
            hours = Math.floor(timeRamainig / 60 / 60); // так же и часы 
            // возвращаем в объект (что бы было видно в следующих функциях);
            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                getTimeRamaining: getTimeRamaining
            }
        }
        //условие для добавки 0 если число в таймере меньше 10 для отображение 04: 09: 08
        function zero(num){
            if(num >= 0 && num < 10){
                return `0${num}`
            }else{
                return num;
            }
        };
        updateClock ();      // что бы при перезагрузке не выдавал картинку при верстке а сразу показывал нужный нам таймер
        function updateClock (){
            let timer = getTimeRamaining();
            timerHours.textContent = zero(timer.hours);
            timerMinutes.textContent = zero(timer.minutes);
            timarSeconds.textContent = zero(timer.seconds);
            // запускаем таймер каждую секунду с условием 
                if(timeRamainig <= 0){
                    clearInterval(updateClock);
                    timerHours.textContent = '00';
                    timerMinutes.textContent = '00';
                    timarSeconds.textContent = '00';
            }
        }
        //updateClock();
        setInterval(updateClock, 1000);
    }
    countTimer('07 march 2021');

    //menu

    const toogleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            // можно получать элементы с HTML страницы так (выделяем все li)
            menuItems = menu.querySelectorAll('ul>li');
        // Закрывание и открывание кнопки меню (что бы код не повторять перенсли сюда и передали функцию в события)
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        // при нажатии на кнопку "меню" открывает и скрывает всплывающее меню меню(условие их handlerMenu)
        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', event => {
            const target = event.target;

            if (target.classList.contains('close-btn')) {
                menu.style.transform = `translate(-100%)`;
            }
            if (target.tagName === 'MENU') {
                return;
            }
            if(target.tagName === 'A'){
                menu.style.transform = `translate(-100%)`;
            }
        });
    };
    toogleMenu();

    //popUp модальные окна

    const tooglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContetn = document.querySelector('.popup-content');
            popupContetn.style.transform = 'translateY(-500px)'; //сначала прячем popup
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                let count = -100; // лугче с минусов задавать
                if(window.screen.width > 768){  //если ширина экрана больше указаной, анимация работает  
                    //анимация модального окна
                    setInterval(() => {
                        if(count < 50){
                            count++;
                            popupContetn.style.transform = `translateY(${count}px)`;
                        }
                    }, 1)
                }else{
                    // анимация не работает
                    popup.style.display = 'block';
                    popupContetn.style.transform = '';
                }

            })
        });
        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            }else{
                target = target.closest('.popup-content')
                if(!target){
                    popup.style.display = 'none';
                }
            }

        })
    };
    tooglePopUp();

    //tab смена табов

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

            //если перебираем массив получный(если мы кликаем на трагет он должен выдать нам тот же индекс и показать спрятанный блок )
        const toogleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    //задаем у даляем классы по необходимости
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        // event target 
            tabHeader.addEventListener('click', (event) => {
                // присваиваем переменоой target = событие event.target
                let target = event.target;
                    target = target.closest('.service-header-tab')
                // проверяем принадлжеит ли таргет к родителю с классом service-header-tab, если да то уловие работает
                if(target){
                tab.forEach((item, i) => {

                    if(item === target){
                            toogleTabContent(i);
                        }
                    });

                }
                
            })
        }
    tabs();
});
