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

    export default tabs;