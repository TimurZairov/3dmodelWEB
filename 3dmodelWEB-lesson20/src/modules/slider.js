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

export default slider;