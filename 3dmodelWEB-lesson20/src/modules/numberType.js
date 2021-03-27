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

export default numberType;