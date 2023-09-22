const urlId = window.location.search;
const urlSearchParams = new URLSearchParams(urlId);
const photographerId = urlSearchParams.get('id');
console.log(photographerId);

async function getPhotographers() {
    return await fetch('./data/photographers.json')
        .then((res) => res.json())
        .catch((err) => console.log('Unexpected error occured', err));
}
async function displayData(photographers) {
    const photographersHeader = document.querySelector('.photograph-header');
    const button = document.querySelector('.contact_button');
    photographers.forEach((photographer) => {
        if (photographer.id == photographerId) {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            const newDiv = document.createElement('div');
            newDiv.appendChild(userCardDOM.firstChild.nextSibling);
            newDiv.appendChild(userCardDOM.firstChild.nextSibling);
            newDiv.appendChild(userCardDOM.firstChild.nextSibling);
            userCardDOM.firstChild.insertAdjacentElement('afterend', button);
            userCardDOM.appendChild(newDiv);
            photographersHeader.appendChild(userCardDOM);
        }
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
