function mediaBis(data, index, photographerName) {
    const { title, image, video, likes, date } = data;
    const mediaIndex = index;
    let ref = photographerName;
    ref = ref.replaceAll('-', ' ');
    const lightBox = document.getElementById('lightBox');

    function createMediaBis() {
        const lightBoxImage = document.getElementById('lightBoxImage');
        const lightBoxVideo = document.getElementById('lightBoxVideo');
        // creat DOM element for the card media
        const article = document.createElement('article');
        article.className = 'mediaCard';
        const fileInfoContainer = document.createElement('div');
        fileInfoContainer.className = 'mediaCard_Info';
        const h3 = document.createElement('h3');
        h3.textContent = title;
        h3.addEventListener('click', displayLightBox);
        const likesContainer = document.createElement('div');
        const likesNumber = document.createElement('p');
        likesNumber.textContent = likes;
        const likeIcone = document.createElement('img');
        likeIcone.setAttribute('src', './assets/icons/favorite_brown.svg');
        likeIcone.setAttribute('alt', 'like');
        likeIcone.setAttribute('tabindex', '0');
        likeIcone.className = 'mediacard_ico';
        likesContainer.appendChild(likesNumber);
        likesContainer.appendChild(likeIcone);
        // display the lightbox on card's img and title click if isn't already on display,
        // otherwise, do nothing
        function displayLightBox() {
            if (lightBox.parentElement.style.display == 'none') {
                if (article.firstChild.tagName == 'IMG') {
                    lightBoxVideo.style.display = 'none';
                    lightBoxImage.style.display = 'block';
                    lightBoxImage.setAttribute(
                        'src',
                        `./assets/photographers/Sample Photos/${ref}/${image}`
                    );
                    lightBoxImage.setAttribute('alt', title);
                    localStorage.setItem('imgIndex', mediaIndex);
                } else if (article.firstChild.tagName == 'VIDEO') {
                    lightBoxImage.style.display = 'none';
                    lightBoxVideo.style.display = 'block';
                    lightBoxVideo.setAttribute(
                        'src',
                        `./assets/photographers/Sample Photos/${ref}/${video}`
                    );
                    lightBoxVideo.setAttribute('controls', '');
                    lightBoxVideo.setAttribute('aria-label', 'video of' + title);
                    //lightBoxVideo.setAttribute('alt', title); does not work
                    localStorage.setItem('imgIndex', mediaIndex);
                }
                lightBox.setAttribute('aria-hidden', 'false');
                document.getElementById('main').setAttribute('aria-hidden', 'true');
                document.querySelectorAll('.mediaCard_Media').forEach((Element) => {
                    Element.tabIndex = '-1';
                });
                lightBox.parentElement.style.display = 'block';
                document.getElementById('lightBoxArrowRight').tabIndex = '0';
                document.getElementById('lightBoxArrowLeft').tabIndex = '0';
                document.getElementById('lightBoxArrowLeft').tabIndex = '0';
                document.getElementById('lightBoxCloseBtn').tabIndex = '0';
            } else if (!lightBox.parentElement.style.display == 'block') {
                throw 'it apear media display did not work as intented';
            }
        }
        var myHandler = (function () {
            var click = 0;
            return function () {
                if (click === 0) {
                    likesNumber.textConten = `${++likesNumber.textContent}`;
                    const totalLikeNumber = document.querySelector('#totalLike');
                    var localTotalLikeNumber = localStorage.getItem('totalLikeNumber');
                    var newlocalTotalLikesNumber = ++localTotalLikeNumber;
                    localStorage.setItem('totalLikeNumber', newlocalTotalLikesNumber);
                    totalLikeNumber.textContent = newlocalTotalLikesNumber;
                }
                click++;
            };
        })();

        likeIcone.addEventListener('click', myHandler, false);
        likeIcone.addEventListener(
            'keydown',
            (event) => {
                if (event.isComposing || event.keyCode === 13) {
                    myHandler();
                }
            },
            false
        );

        fileInfoContainer.appendChild(h3);
        fileInfoContainer.appendChild(likesContainer);

        if (image) {
            const img = document.createElement('img');
            img.setAttribute('src', `./assets/photographers/Sample Photos/${ref}/${image}`);
            img.setAttribute('alt', 'photo  ' + title);
            img.setAttribute('tabindex', '0');
            img.className = 'mediaCard_Media';
            article.appendChild(img);
            article.appendChild(fileInfoContainer);
            img.addEventListener('click', displayLightBox);
            img.addEventListener('keydown', (event) => {
                if (event.isComposing || event.keyCode === 13) {
                    displayLightBox();
                }
            });
        } else if (video) {
            const vid = document.createElement('video');
            vid.setAttribute(
                'src',
                `./assets/photographers/Sample Photos/${ref}/${video}` + '#t=0.1'
            );
            vid.setAttribute('aria-label', 'video, ' + title);
            vid.setAttribute('preload', 'metadata');
            vid.setAttribute('tabindex', '0');
            vid.className = 'mediaCard_Media';
            article.appendChild(vid);
            article.appendChild(fileInfoContainer);
            vid.addEventListener('click', displayLightBox);
            vid.addEventListener('keydown', (event) => {
                if (event.isComposing || event.keyCode === 13) {
                    displayLightBox();
                }
            });
        } else {
            throw 'unsuported media format';
        }
        return article;
    }

    return { createMediaBis };
}
