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

export default tooglePopUp;