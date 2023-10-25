function photographerTemplate(data, mediasList) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const fList = mediasList;
    let ref = name.split(' ')[0]; //split the name to find the corect folder
    ref = ref.replaceAll('-', ' '); //match with folder nametag if needed
    const totalLikeNumber = localStorage.getItem('totalLikeNumber'); //get the total like number for the insert
    /*create all photographers cards in main index page*/
    function getUserCardDOM() {
        const detail = document.createElement('a');
        detail.setAttribute('href', `./photographer.html?id=${id}&sortby=${0}`);
        detail.setAttribute('aria-label', name);
        const article = document.createElement('article');
        const imgContainer = document.createElement('div');
        imgContainer.classList = 'imgContainer';
        const img = document.createElement('img');
        img.setAttribute(
            'src',
            `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`
        );
        imgContainer.appendChild(img);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const location = document.createElement('p');
        location.innerText = city + ', ' + country;
        location.className = 'location_20px';
        const day_rate = document.createElement('p');
        day_rate.innerText = price + '/jour';
        day_rate.className = 'price';
        const quote = document.createElement('p');
        quote.innerText = tagline;
        quote.className = 'tagline';

        detail.appendChild(imgContainer);
        detail.appendChild(h2);
        article.appendChild(detail);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(day_rate);
        return article;
    }
    /*create single photographer cards in photographer page*/
    function getPhotographerCardDom() {
        var br = document.createElement('br');
        const contact_modalTitle = document.getElementById('contact_modalLabel');
        contact_modalTitle.innerHTML = 'Contactez-moi <br/>' + name;
        const btn = document.querySelector('.contact_button');
        const article = document.createElement('article');
        article.setAttribute('aria-label', "photographer's informations");
        const profilInfo = document.createElement('div');
        const insert = document.createElement('div');
        insert.className = 'insert';
        const imgContainer = document.createElement('div');
        imgContainer.classList = 'imgContainer';
        const img = document.createElement('img');
        img.setAttribute(
            'src',
            `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`
        );
        img.setAttribute('alt', 'photo de ' + name);
        imgContainer.appendChild(img);
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const location = document.createElement('p');
        location.innerText = city + ', ' + country;
        location.className = 'location_24px';
        const day_rate = document.createElement('p');
        day_rate.innerText = price + '/jour';
        const quote = document.createElement('p');
        quote.innerText = tagline;
        quote.className = 'tagline';
        const totalLikeContainer = document.createElement('div');
        const totalLike = document.createElement('p');
        totalLike.setAttribute('id', 'totalLike');
        totalLike.innerText = totalLikeNumber;
        const likeIcone = document.createElement('img');
        likeIcone.setAttribute('src', './assets/icons/favorite.svg');
        totalLikeContainer.appendChild(totalLike);
        totalLikeContainer.appendChild(likeIcone);
        insert.appendChild(totalLikeContainer);
        insert.appendChild(day_rate);
        profilInfo.appendChild(h1);
        profilInfo.appendChild(location);
        profilInfo.appendChild(quote);
        article.appendChild(profilInfo);
        article.appendChild(btn);
        article.appendChild(imgContainer);
        return { article, insert };
    }
    /*create the lightboxe with display none by default*/
    function lightBox() {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'lightBox-wrapper');
        wrapper.style.display = 'none';
        const lightBox = document.createElement('div');
        lightBox.setAttribute('id', 'lightBox');
        lightBox.setAttribute('aria-label', 'image closeup view');
        lightBox.className = 'lightBox';
        const mediaContainer = document.createElement('div');
        mediaContainer.setAttribute('id', 'lightBox_media-container');
        const closeBtn = document.createElement('img');
        closeBtn.setAttribute('src', './assets/icons/close_brown.svg');
        closeBtn.setAttribute('id', 'lightBoxCloseBtn');
        closeBtn.setAttribute('aria-label', 'Close dialog');
        closeBtn.addEventListener('click', closeLightBoxEvent); //close event
        closeBtn.addEventListener('keydown', (event) => {
            //*
            if (event.isComposing || event.keyCode === 13) {
                closeLightBoxEvent();
            }
        });
        const arrowLeft = document.createElement('img');
        arrowLeft.setAttribute('src', './assets/icons/arrow_left.svg');
        arrowLeft.setAttribute('id', 'lightBoxArrowLeft');
        arrowLeft.setAttribute('aria-label', 'Previous image');
        arrowLeft.addEventListener('click', arrowleftEvent); //previous img event
        arrowLeft.addEventListener('keydown', (event) => {
            //*
            if (event.isComposing || event.keyCode === 13) {
                arrowleftEvent();
            }
        });
        const arrowRight = document.createElement('img');
        arrowRight.setAttribute('src', './assets/icons/arrow_right.svg');
        arrowRight.setAttribute('id', 'lightBoxArrowRight');
        arrowRight.setAttribute('aria-label', 'Next image');
        arrowRight.addEventListener('click', arrowRightEvent); //previous img event
        arrowRight.addEventListener('keydown', (event) => {
            //*
            if (event.isComposing || event.keyCode === 13) {
                arrowRightEvent();
            }
        });
        lightBox.appendChild(mediaContainer);
        lightBox.appendChild(closeBtn);
        lightBox.appendChild(arrowLeft);
        lightBox.appendChild(arrowRight);
        wrapper.appendChild(lightBox);

        function arrowleftEvent() {
            var findex = mediaIndex;
            var newfindex;
            //set the next index depend on curent index
            if (findex > 0 && findex <= fList.length - 1) {
                //if index is 0 then go to last
                newfindex = findex - 1;
            } else if (findex == 0 && fList.length > 1) {
                newfindex = fList.length - 1;
            }
            let newMediaElement = mediaFactory(fList[newfindex], ref);
            newMediaElement.setAttribute('class', 'lightBoxFocus');
            const anchore = document.getElementById('lightBox_media-container');
            if (anchore.hasChildNodes()) {
                //delete child if already have one, can be set up on close modal too
                anchore.removeChild(anchore.firstChild);
            }
            anchore.appendChild(newMediaElement);
            mediaIndex = newfindex;
        }
        function arrowRightEvent() {
            var findex = mediaIndex;

            var newfindex;
            if (findex >= 0 && findex <= fList.length - 2) {
                newfindex = ++findex;
            } else if (findex == fList.length - 1 && fList.length > 1) {
                newfindex = 0;
            }

            let newMediaElement = mediaFactory(fList[newfindex], ref);
            newMediaElement.setAttribute('class', 'lightBoxFocus');
            const anchore = document.getElementById('lightBox_media-container');
            if (anchore.hasChildNodes()) {
                //delete child if already have one, can be set up on close modal too
                anchore.removeChild(anchore.firstChild);
            }
            anchore.appendChild(newMediaElement);

            mediaIndex = newfindex;
        }
        /*for lightbox key navigate event*/
        document.addEventListener('keydown', (event) => {
            if (wrapper.style.display == 'block') {
                //if lightbox is "on"
                if (event.isComposing || event.keyCode === 37) {
                    arrowleftEvent();
                } else if (event.isComposing || event.keyCode === 39) {
                    arrowRightEvent();
                } else if (event.isComposing || event.keyCode === 27) {
                    closeLightBoxEvent();
                }
            }
        });
        function closeLightBoxEvent() {
            wrapper.style.display = 'none';
            document.getElementById('main').setAttribute('aria-hidden', 'false');
            document.querySelectorAll('.mediaCard_Media').forEach((Element) => {
                Element.tabIndex = '0';
            });
            const anchore = document.getElementById('lightBox_media-container');
            if (anchore.hasChildNodes()) {
                //delete modal child
                anchore.removeChild(anchore.firstChild);
            }
        }
        return wrapper;
    }
    return { getUserCardDOM, getPhotographerCardDom, lightBox };
}
