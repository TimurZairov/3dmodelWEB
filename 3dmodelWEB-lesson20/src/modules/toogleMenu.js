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

export default toogleMenu;