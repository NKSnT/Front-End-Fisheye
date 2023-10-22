function displayModal() {
    //open modal and reorder tabindex focus
    document.getElementById('main').setAttribute('aria-hidden', 'true');
    document.getElementById('contact_modal').setAttribute('aria-hidden', 'false');
    document.getElementById('contact_modal').style.display = 'block';
    document.getElementById('firstNameInput').tabIndex = '1';
    document.getElementById('firstNameInput').focus();
    document.getElementById('lastNameInput').tabIndex = '2';
    document.getElementById('emailInput').tabIndex = '3';
    document.getElementById('messageInput').tabIndex = '4';
    document.getElementById('submitContactModal').tabIndex = '5';
    document.getElementById('closeContactModal').tabIndex = '6';
}
function closeModal() {
    document.getElementById('main').setAttribute('aria-hidden', 'false');
    document.getElementById('contact_modal').setAttribute('aria-hidden', 'true');
    document.getElementById('contact_modal').style.display = 'none';
}
document.getElementById('form').onsubmit = function (event) {
    //return function, (display log input value)
    event.preventDefault();
    const firstNameInput = document.querySelector('#firstNameInput');
    const lastNameInput = document.querySelector('#lastNameInput');
    const emailInput = document.querySelector('#emailInput');
    const messageInput = document.querySelector('#messageInput');
    console.log('returned first name : ' + firstNameInput.value);
    console.log('returned last name : ' + lastNameInput.value);
    console.log('returned email : ' + emailInput.value);
    console.log('returned msg : ' + messageInput.value);
};
document.addEventListener('keydown', (event) => {
    //close modal on escape
    if (document.getElementById('contact_modal').style.display == 'block') {
        if (event.isComposing || event.keyCode === 27) {
            closeModal();
        }
    }
});
