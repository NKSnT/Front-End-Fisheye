async function getPhotographers() {
    /* //detailed version 
    let res = await fetch('./data/photographers.json');
    let response = await res.json();
    console.log(response);
    return response;
    */

    return await fetch('./data/photographers.json')
        .then((res) => res.json())
        .catch((err) => console.log('Unexpected error occured', err));
}

async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        const detail = document.createElement('a');
        detail.setAttribute('href', './photographer.html?id=' + photographer.id);
        detail.appendChild(userCardDOM.firstChild);
        detail.appendChild(userCardDOM.firstChild);
        userCardDOM.insertBefore(detail, userCardDOM.firstChild);
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
