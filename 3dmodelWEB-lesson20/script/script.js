window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //timer
    function countTimer(deadLine) {
            // объявляем переменные
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timarSeconds = document.querySelector('#timer-seconds');

            function getTimeRamaining(){
            let dateStop = new Date(deadLine).getTime(), // deadline передаем в при вызове функции counterTimer
            dateNow = new Date().getTime(), // берем сегодняшний день
            timeRamainig = (dateStop - dateNow) / 1000, // вычитываем милисекунды до конца deadLine-ф 
            seconds = Math.floor(timeRamainig % 60),    // округляем с помощью mathfloor и полученные милисекунды делим с остатком 
            minutes = Math.floor((timeRamainig / 60) % 60), // так же вычисляем и минуты
            hours = Math.floor(timeRamainig / 60 / 60); // так же и часы 
            // возвращаем в объект (что бы было видно в следующих функциях);
            
            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                getTimeRamaining: getTimeRamaining,
            };
            
        }
        //условие для добавки 0 если число в таймере меньше 10 для отображение 04: 09: 08
        function zero(num){
            if(num >= 0 && num < 10){
                return `0${num}`;
            }else{
                return num;
            }
        }
        
          // что бы при перезагрузке не выдавал картинку при верстке а сразу показывал нужный нам таймер
        function updateClock (){
            let timer = getTimeRamaining();
            timerHours.textContent = zero(timer.hours);
            timerMinutes.textContent = zero(timer.minutes);
            timarSeconds.textContent = zero(timer.seconds);
            // запускаем таймер каждую секунду с условием 
                if(timer.hours <= 0 || timer.minutes <= 0 || timer.seconds <= 0){
                    clearInterval(updateClock);
                    timerHours.textContent = '00';
                    timerMinutes.textContent = '00';
                    timarSeconds.textContent = '00';
            }

        }
        updateClock();
        setInterval(updateClock, 1000);
    }
    countTimer('11 march 2021');

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

        menu.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('close-btn')) {
             menu.classList.toggle('active-menu');
            }else if(target.tagName === 'A'){
                menu.classList.toggle('active-menu');
            }

            if (target.tagName === 'MENU') {
                return;
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
                    }, 1);
                }else{
                    // анимация не работает
                    popup.style.display = 'block';
                    popupContetn.style.transform = '';
                }

            });
        });
        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            }else{
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                }
            }

        });
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
                    target = target.closest('.service-header-tab');
                // проверяем принадлжеит ли таргет к родителю с классом service-header-tab, если да то уловие работает
                if(target){
                tab.forEach((item, i) => {

                    if(item === target){
                            toogleTabContent(i);
                        }
                    });

                }
                
            });
        };
    tabs();

    //slider 
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            portfilioDots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');
        // получили массив из элементов slide и задаем первый слайд из массива индекс 0й

            let currentSlide = 0,
                interval;
        // к кадому слайду создаем свой дот
        let plusDots = () => {
             slide.forEach(() => {
                let newDot = document.createElement('li');
                newDot.classList.add('dot');
                portfilioDots.append(newDot);
            });
        };
        plusDots();
        // добавленные элементы нужно выбрать псоле создания что бы весь скрипт заработал
        let dot = portfilioDots.querySelectorAll('.dot');
        // elem = slide, index = currentSlide, strClass = 'portfolio-item-active'; 
        //элементы получаем из функции autoplayslide
            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };
            
            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };

        // перебор слайдеров атоматически 
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        autoPlaySlide();
        // time передаем когда запускаем функцию
        //передаем 3 секунды в случае если не парадали занчение при вызове
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };
        startSlide(1500);
        // событие на нажатие стрелок слайдера
        slider.addEventListener('click', (event) => {
            event.preventDefault();
            //нажатие на стрлки кнопок
            let target = event.target;
            // условие если кликаем мимо мтрелок на слайде и точек
            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }
            // должен быть вызов функции до условий
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            // работа стрелок и точек
            if(target.matches('#arrow-right')){
                currentSlide++;
            }else if(target.matches('#arrow-left')){
                currentSlide--;
            }else if(target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }
            // условие если если пришли к концу массива, переход к первому элементу масива
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            // если начало масива, и крутить обартно отнимаем от длины масива
            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }
            // запуск функции некст слайд после условий 
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        //событие при наведении стердки на стрелки или на точки
        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            }
        });

    };
    slider();

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
        //можно писать только цифры надо исправить тут есть глюк
        const numberType = () => {
            const calcItem = document.querySelectorAll('.calc-item');
            const formPhone = document.querySelectorAll('.form-phone');
           
            calcItem.forEach((item) => {
                item.addEventListener('input', () => {
                    if(!item.classList.contains('calc-type')){
                        item.value = item.value.replace(/\D/g, '');
                    }
                });
            });
            formPhone.forEach((item) => {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/[A-Za-zА-Яа-я\*\!\@\"\№\;\%\:\?\=\()\#\$\%\^\&\_\'\/\\]/g, '');
                });
            });

        };
        numberType();

        //ввод только кириллицы
        const russianType = () => {
            const nameInput = document.querySelector('.top-form');
            const textInput = document.querySelector('.mess');
            nameInput.addEventListener('input', () => {
                nameInput.value = nameInput.value.replace(/[0-9A-Za-z\*\!\@\"\№\;\%\:\?\+\=\()\#\$\%\^\&\_\'\/\\]/g, '');
            });

            textInput.addEventListener('input', () => {
                textInput.value = textInput.value.replace(/[0-9A-Za-z\*\!\@\"\№\;\%\:\?\+\=\()\#\$\%\^\&\_\'\/\\]/g, '');
            });
        };
        russianType();

        //emailform 
        const emailInput = () => {
            const formEmail = document.querySelectorAll('.form-email');
            formEmail.forEach((item) => {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/[^@A-Za-z\-\_\.\!\~\*\']/g, '');
                    return item.value.replace(/w+@\w+\.\w{3}/g, '');
                });

            });

        };
        emailInput();
//отправка данных
        const sendForm = () => {
            //переменные для вывода сообщение 
            const errorMessage = 'Что то пошло не так...',
                loadMessage = 'Загрузка...',
                successMessage = 'Спасибо! Мы с вами свяжемся!';
            // берем нашу форму первая форма
    const form1 = () => {
                const form = document.getElementById('form1'),
                formName = document.querySelector('.form-name'),
                formEmail = document.querySelector('.form-email'),
                formPhone = document.querySelector('.form-phone');

            // создаем див куда будем выводить сообщение
            const statusMessage = document.createElement('div');
            statusMessage.style.cssText = 'font-size: 2rem;';
            //слушатель на сабмит
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(form);
                //объект body  что бы записывать ткда данные
                let body = {};

/*                 for(let val of formData.entries()){
                    body[val[0]] = val[1];
                } */

                // перебор массива formdata для присваивания в боди знччений 
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                formName.value = '';
                formEmail.value = '';
                formPhone.value = '';
                // передаем body при вызове пост дата(есть колбэк функция)
                postData(body)
                .then(() => {
                    statusMessage.textContent = successMessage;
                })
                .catch((error) => {
                    console.log(error);
                    statusMessage.textContent = errorMessage;
                });
            });
    };
    form1();

    //фторая форма
        const form2 = () => {
            const form2 = document.getElementById('form2'),
            formName2 = document.getElementById('form2-name'),
            formEmail2 = document.getElementById('form2-email'),
            formPhone2 = document.getElementById('form2-phone'),
            formMessage = document.getElementById('form2-message');
        // создаем див куда будем выводить сообщение
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';
        //слушатель на сабмит
        form2.addEventListener('submit', (event) => {
            event.preventDefault();
            form2.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form2);
            //объект body  что бы записывать ткда данные
            let body = {};


            // перебор массива formdata для присваивания в боди знччений 
            formData.forEach((val, key) => {
                body[key] = val;
            });
            console.log(formName2.value);
            formName2.value = '';
            formEmail2.value = '';
            formPhone2.value = '';
            formMessage.value = '';
            // передаем body при вызове пост дата(есть колбэк функция)
            postData(body)
            .then(() => {
                statusMessage.textContent = successMessage;
            })
            .catch((error) => {
                console.log(error);
                statusMessage.textContent = errorMessage;
            });
        });
    };
    form2();
        // форма 3
        const form3 = () => {
            const form3 = document.getElementById('form3');
            const popup = document.querySelector('.popup');
        // создаем див куда будем выводить сообщение
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';
        //слушатель на сабмит
        form3.addEventListener('submit', (event) => {
            event.preventDefault();
            popup.style.display = 'none';
            const formData = new FormData(form3);
            //объект body  что бы записывать ткда данные
            let body = {};
            // перебор массива formdata для присваивания в боди знччений 
            formData.forEach((val, key) => {
                body[key] = val;
            });
            // передаем body при вызове пост дата(есть колбэк функция)
            postData(body)
            .then(() => {
                statusMessage.textContent = successMessage;
            })
            .catch((error) => {
                console.log(error);
                statusMessage.textContent = errorMessage;
            });
        });
    };
    form3();
 // берем нашу форму вторая форма
        const postData = (body) => {
            return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
            return;
            }
            if (request.status === 200) {
            resolve();
            } else {
            reject(request.status);
            }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
            });
            };
        };
        sendForm();

});
