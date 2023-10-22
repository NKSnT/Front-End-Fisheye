const urlparams = window.location.search;
const urlSearchParams = new URLSearchParams(urlparams);
const photographerId = urlSearchParams.get('id');
const sortby = urlSearchParams.get('sortby'); //get param for the sorting

async function getPhotographers() {
    //get Photographers data
    return await fetch('./data/photographers.json')
        .then((res) => res.json())
        .catch((err) => console.log('Unexpected error occured', err));
}
function getPhotographersMedias(medias) {
    // get all media, then select and arrange them if they are from the targeted Photographer
    let mediaList = new Array();
    let totalLikeNumber = 0;
    medias.forEach((media) => {
        if (media.photographerId == photographerId) {
            mediaList.push(media);
            let mediaLikes = media.likes;
            totalLikeNumber = totalLikeNumber + mediaLikes;
        }
    });
    if (sortby == '1') {
        function sortByPopularity(a, b) {
            //return a.likes - b.likes; is ascending
            return b.likes - a.likes;
        }
        mediaList.sort(sortByPopularity);
    } else if (sortby == '2') {
        function sortByDate(a, b) {
            var date1 = new Date(a.data);
            var date2 = new Date(b.date);
            return date2 - date1;
        }
        mediaList.sort(sortByDate);
    } else if (sortby == '3') {
        function sortByTitle(a, b) {
            return a.title.localeCompare(b.title);
        }
        mediaList.sort(sortByTitle);
    }
    localStorage.setItem('totalLikeNumber', totalLikeNumber);
    return mediaList;
}
async function displayData(photographers, mediasList) {
    //main f()
    const photographersHeader = document.querySelector('.photograph-header');
    const main = document.getElementById('main');
    photographers.forEach((photographer) => {
        if (photographer.id == photographerId) {
            const photographerModel = photographerTemplate(photographer, mediasList); //call photographerTemplate
            const userCardDOM = photographerModel.getPhotographerCardDom();
            const lightBox = photographerModel.lightBox();
            photographersHeader.appendChild(userCardDOM.article); //then display content
            main.appendChild(userCardDOM.insert); //*
            document.getElementById('lightbox-modal').appendChild(lightBox);
        }
    });
}
async function displayMedia(mediaList, photographers) {
    //media display f()
    const main = document.getElementById('main');
    const section = document.createElement('section');
    section.id = 'mediaSection';
    photographers.forEach((photographer) => {
        if (photographer.id == photographerId) {
            const photographerName = photographer.name.split(' ')[0];
            const sortOrderDom = sortOrder(); //call the sorting element f()
            main.appendChild(sortOrderDom); //main balise take child in order
            main.appendChild(section); //*

            mediaList.forEach((media, index) => {
                // call the media card creation f() for each given media
                const mediaModel = mediaBis(media, index, photographerName);
                const mediaCardDOM = mediaModel.createMediaBis();
                section.appendChild(mediaCardDOM);
            });
        }
    });
}

async function init() {
    // start the page load
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    const mediasList = getPhotographersMedias(media);
    displayData(photographers, mediasList);
    displayMedia(mediasList, photographers);
}
init();
