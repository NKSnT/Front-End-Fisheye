const modal = document.getElementById('contact_modal');

function displayModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}
const form = document.getElementById('form');
form.onsubmit = function (event) {
    event.preventDefault();
    const firstNameInput = document.querySelector('#firstNameInput');
    const lastNameInput = document.querySelector('#lastNameInput');
    const emailInput = document.querySelector('#emailInput');
    const messageInput = document.querySelector('#messageInput');
    console.log('returned first nam : ' + firstNameInput.value);
    console.log('returned last name : ' + lastNameInput.value);
    console.log('returned email : ' + emailInput.value);
    console.log('returned msg : ' + messageInput.value);
};
