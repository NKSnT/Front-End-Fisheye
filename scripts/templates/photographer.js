function photographerTemplate(data, mediasList) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const fList = mediasList;
    let ref = name.split(' ')[0]; //split the name to find the corect folder
    ref = ref.replaceAll('-', ' ');

    //const picture = `assets/photographers/${portrait}`;
    const picture = `assets/photographers/account.png`;

    function getUserCardDOM() {
        const detail = document.createElement('a');
        detail.setAttribute('href', './photographer.html?id=' + id);
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', 'photo de ' + name);
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

        detail.appendChild(img);
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

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', 'photo de ' + name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
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
        totalLike.innerText = '297 081';
        const likeIcone = document.createElement('img');
        likeIcone.setAttribute('src', './assets/icons/favorite.svg');
        totalLikeContainer.appendChild(totalLike);
        totalLikeContainer.appendChild(likeIcone);
        insert.appendChild(totalLikeContainer);
        insert.appendChild(day_rate);
        profilInfo.appendChild(h2);
        profilInfo.appendChild(location);
        profilInfo.appendChild(quote);
        article.appendChild(profilInfo);
        article.appendChild(btn);
        article.appendChild(img);
        //article.appendChild(insert);

        return { article, insert };
    }

    function lightBox() {
        console.log(mediasList);
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'lightBox-wrapper');
        const lightBox = document.createElement('div');
        lightBox.setAttribute('id', 'lightBox');
        lightBox.className = 'lightBox';
        const img = document.createElement('img');
        img.setAttribute('id', 'lightBoxFocusIMG');
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
            var nextIMG;
            if (findex > 0 && findex <= fList.length - 1) {
                nextIMG = fList[findex - 1];
            } else if (findex == 0 && fList.length > 1) {
                nextIMG = fList[fList.length - 1];
            }
            lightBox.firstChild.setAttribute(
                'src',
                `./assets/photographers/Sample Photos/${ref}/${nextIMG.name}`
            );
            var newfindex = fList.indexOf(nextIMG);
            localStorage.setItem('imgIndex', newfindex);
        });
        const arrowRight = document.createElement('img');
        arrowRight.setAttribute('src', './assets/icons/arrow_right.svg');
        arrowRight.setAttribute('id', 'lightBoxArrowRight');
        arrowRight.addEventListener('click', (event) => {
            var findex = localStorage.getItem('imgIndex');
            console.log('findex : ' + findex);
            var nextIMG;
            console.log(fList);
            if (findex >= 0 && findex <= fList.length - 2) {
                nextIMG = fList[++findex]; //findex+1 do not work idk why
            } else if (findex == fList.length - 1 && fList.length > 1) {
                nextIMG = fList[0];
            }
            lightBox.firstChild.setAttribute(
                'src',
                `./assets/photographers/Sample Photos/${ref}/${nextIMG.name}`
            );

            var newfindex = fList.indexOf(nextIMG);
            console.log('new findex : ' + newfindex);
            localStorage.setItem('imgIndex', newfindex);
        });

        lightBox.appendChild(img);
        lightBox.appendChild(closeBtn);
        lightBox.appendChild(arrowLeft);
        lightBox.appendChild(arrowRight);
        wrapper.appendChild(lightBox);

        /// il faut que je passe les nom de fichier en data, comme sa ici et dans la media je lais ai
        return wrapper;
    }
    return { name, picture, getUserCardDOM, getPhotographerCardDom, lightBox };

    // générer aussi la light box ici et la metre en cdisplay none puis l'afficher quadn bien voulut ensuite
}
