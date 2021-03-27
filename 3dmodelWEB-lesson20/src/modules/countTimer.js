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

export default countTimer;