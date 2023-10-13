const urlparams = window.location.search;
const urlSearchParams = new URLSearchParams(urlparams);
const photographerId = urlSearchParams.get('id');
const sortby = urlSearchParams.get('sortby');

async function getPhotographers() {
    return await fetch('./data/photographers.json')
        .then((res) => res.json())
        .catch((err) => console.log('Unexpected error occured', err));
}
function getPhotographersMedias(medias) {
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
        //data.reverse(); is décending
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
    const photographersHeader = document.querySelector('.photograph-header');
    const main = document.getElementById('main');
    //const main = document.querySelector('#main');
    photographers.forEach((photographer) => {
        if (photographer.id == photographerId) {
            let ref = photographer.name.split(' ')[0]; //split the name to find the corect folder

            //const mediasList = getPhotographersMedias(ref);

            const photographerModel = photographerTemplate(photographer, mediasList);
            const userCardDOM = photographerModel.getPhotographerCardDom();
            const lightBox = photographerModel.lightBox();
            photographersHeader.appendChild(userCardDOM.article);
            main.appendChild(userCardDOM.insert);
            main.appendChild(lightBox);

            // const photographerMedia = mediaFactory(mediasList, ref); //mediaFactoryTemplate()
            // const mediaCardDOM = photographerMedia.creatMediaDOM();
            // main.appendChild(mediaCardDOM);
        }
    });
}
async function displayMedia(mediaList, photographers) {
    const main = document.getElementById('main');
    const section = document.createElement('section');
    section.id = 'mediaSection';

    const lightBox = document.getElementById('lightBox');

    photographers.forEach((photographer) => {
        if (photographer.id == photographerId) {
            const photographerName = photographer.name.split(' ')[0];
            const sortOrderDom = sortOrder();

            main.appendChild(sortOrderDom);
            main.appendChild(section);
            //let mediaList = new Array();

            mediaList.forEach((media, index) => {
                //console.log(media);
                const mediaModel = mediaBis(media, index, photographerName);
                const mediaCardDOM = mediaModel.createMediaBis();

                //console.log(mediaCardDOM);
                section.appendChild(mediaCardDOM);

                //mediaList.push(media);
            });
        }
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    const mediasList = getPhotographersMedias(media);
    displayData(photographers, mediasList);
    displayMedia(mediasList, photographers);
}
init();
