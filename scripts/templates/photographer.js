function photographerTemplate(data, mediasList) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const fList = mediasList;
    let ref = name.split(' ')[0]; //split the name to find the corect folder
    ref = ref.replaceAll('-', ' ');
    const totalLikeNumber = localStorage.getItem('totalLikeNumber');

    function getUserCardDOM() {
        const detail = document.createElement('a');
        detail.setAttribute('href', './photographer.html?id=' + id);
        detail.setAttribute('aria-label', name);
        const article = document.createElement('article');
        const imgContainer = document.createElement('div');
        imgContainer.classList = 'imgContainer';
        const img = document.createElement('img');
        img.setAttribute(
            'src',
            `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`
        );
        //img.setAttribute('alt', 'photo de ' + name); il veullent un alt vide ?
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

    function getPhotographerCardDom() {
        const btn = document.querySelector('.contact_button');
        const article = document.createElement('article');
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
        //article.appendChild(insert);

        return { article, insert };
    }

    function lightBox() {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'lightBox-wrapper');
        wrapper.style.display = 'none';
        const lightBox = document.createElement('div');
        lightBox.setAttribute('id', 'lightBox');
        lightBox.className = 'lightBox';
        const mediaContainer = document.createElement('div');
        mediaContainer.setAttribute('id', 'lightBox_media-container');
        const lightBoxImage = document.createElement('img');
        lightBoxImage.setAttribute('class', 'lightBoxFocus');
        lightBoxImage.setAttribute('id', 'lightBoxImage');
        const lightBoxVideo = document.createElement('video');
        lightBoxVideo.setAttribute('class', 'lightBoxFocus');
        lightBoxVideo.setAttribute('id', 'lightBoxVideo');

        const closeBtn = document.createElement('img');
        closeBtn.setAttribute('src', './assets/icons/close_brown.svg');
        closeBtn.setAttribute('id', 'lightBoxCloseBtn');
        closeBtn.addEventListener('click', (event) => {
            wrapper.style.display = 'none';
        });
        const arrowLeft = document.createElement('img');
        arrowLeft.setAttribute('src', './assets/icons/arrow_left.svg');
        arrowLeft.setAttribute('id', 'lightBoxArrowLeft');
        arrowLeft.addEventListener('click', (event) => {
            var findex = localStorage.getItem('imgIndex');
            var nextMedia;
            var newfindex;
            if (findex > 0 && findex <= fList.length - 1) {
                newfindex = findex - 1;
            } else if (findex == 0 && fList.length > 1) {
                newfindex = fList.length - 1;
            }
            if (fList[newfindex].hasOwnProperty('image')) {
                lightBoxVideo.style.display = 'none';
                nextMedia = fList[newfindex].image;
                lightBoxImage.setAttribute(
                    'src',
                    `./assets/photographers/Sample Photos/${ref}/${nextMedia}`
                );
                lightBoxImage.style.display = 'block';
            } else if (fList[newfindex].hasOwnProperty('video')) {
                lightBoxImage.style.display = 'none';
                nextMedia = fList[newfindex].video;
                lightBoxVideo.setAttribute(
                    'src',
                    `./assets/photographers/Sample Photos/${ref}/${nextMedia}#t=0.1`
                );
                lightBoxVideo.style.display = 'block';
            }
            localStorage.setItem('imgIndex', newfindex);
        });
        const arrowRight = document.createElement('img');
        arrowRight.setAttribute('src', './assets/icons/arrow_right.svg');
        arrowRight.setAttribute('id', 'lightBoxArrowRight');
        arrowRight.addEventListener('click', (event) => {
            var findex = localStorage.getItem('imgIndex');
            var nextMedia;
            var newfindex;
            if (findex >= 0 && findex <= fList.length - 2) {
                newfindex = ++findex;
            } else if (findex == fList.length - 1 && fList.length > 1) {
                newfindex = 0;
            }
            if (fList[newfindex].hasOwnProperty('image')) {
                lightBoxVideo.style.display = 'none';
                nextMedia = fList[newfindex].image;
                lightBoxImage.setAttribute(
                    'src',
                    `./assets/photographers/Sample Photos/${ref}/${nextMedia}`
                );
                lightBoxImage.style.display = 'block';
            } else if (fList[newfindex].hasOwnProperty('video')) {
                lightBoxImage.style.display = 'none';
                nextMedia = fList[newfindex].video;
                lightBoxVideo.setAttribute(
                    'src',
                    `./assets/photographers/Sample Photos/${ref}/${nextMedia}#t=0.1`
                );
                lightBoxVideo.style.display = 'block';
            }
            localStorage.setItem('imgIndex', newfindex);
        });
        mediaContainer.appendChild(lightBoxImage);
        mediaContainer.appendChild(lightBoxVideo);
        lightBox.appendChild(mediaContainer);
        // lightBox.appendChild(lightBoxImage);
        // lightBox.appendChild(lightBoxVideo);
        lightBox.appendChild(closeBtn);
        lightBox.appendChild(arrowLeft);
        lightBox.appendChild(arrowRight);
        wrapper.appendChild(lightBox);

        /// il faut que je passe les nom de fichier en data, comme sa ici et dans la media je lais ai
        return wrapper;
    }
    return { getUserCardDOM, getPhotographerCardDom, lightBox };

    // générer aussi la light box ici et la metre en cdisplay none puis l'afficher quadn bien voulut ensuite
}
