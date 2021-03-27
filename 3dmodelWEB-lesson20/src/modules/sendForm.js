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
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
                }
            statusMessage.textContent = successMessage;
        })
        .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.log(error);
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
    .then((response) => {
        if (response.status !== 200) {
            throw new Error('status network not 200');
            }
        statusMessage.textContent = successMessage;
    })
    .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.log(error);
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
    .then((response) => {
        if (response.status !== 200) {
            throw new Error('status network not 200');
            }
        statusMessage.textContent = successMessage;
    })
    .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.log(error);
    });
});
};
form3();
// берем нашу форму вторая форма
const postData = (body) => {
    return fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });
    };
};

export default sendForm;