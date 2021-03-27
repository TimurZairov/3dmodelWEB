const emailInput = () => {
    const formEmail = document.querySelectorAll('.form-email');
    formEmail.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^@A-Za-z\-\_\.\!\~\*\']/g, '');
            return item.value.replace(/w+@\w+\.\w{3}/g, '');
        });

    });

};

export default emailInput;