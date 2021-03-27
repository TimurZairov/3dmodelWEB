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

export default russianType;