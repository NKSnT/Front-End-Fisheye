let mediaIndex = undefined;
function mediaTemplate(data, index, photographerName) {
    const { title, image, video, likes } = data; //take all media info
    //let mediaIndex = index; //*
    let ref = photographerName; //*
    ref = ref.replaceAll('-', ' '); //help to match files's name with photographerName
    const lightBox = document.getElementById('lightBox');

    function createMediaCard() {
        // create DOM element for the card media:
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
        var myHandler = (function () {
            // like event management f()
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
        //:onfocus:onpress enter key event
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
        let mediaElement = mediaFactory(data, ref);
        mediaElement.setAttribute('tabindex', '0');
        mediaElement.className = 'mediaCard_Media';
        mediaElement.addEventListener('click', displayLightBox);
        mediaElement.addEventListener('keydown', (event) => {
            if (event.isComposing || event.keyCode === 13) {
                displayLightBox();
            }
        });
        article.appendChild(mediaElement);
        article.appendChild(fileInfoContainer);

        function displayLightBox() {
            // display the lightbox on card's media and title click if isn't already on display,
            // otherwise, do nothing
            if (lightBox.parentElement.style.display == 'none') {
                let lightboxMediaElement = mediaFactory(data, ref);
                lightboxMediaElement.setAttribute('class', 'lightBoxFocus');
                const anchore = document.getElementById('lightBox_media-container');
                if (anchore.hasChildNodes()) {
                    //delete child if already have one, can be set up on close modal too
                    anchore.removeChild(anchore.firstChild);
                }
                anchore.appendChild(lightboxMediaElement);
                mediaIndex = index;
                lightBox.setAttribute('aria-hidden', 'false');
                document.getElementById('main').setAttribute('aria-hidden', 'true');
                document.querySelectorAll('.mediaCard_Media').forEach((Element) => {
                    Element.tabIndex = '-1';
                });
                lightBox.parentElement.style.display = 'block';

                document.getElementById('lightBoxCloseBtn').tabIndex = '0';
                document.getElementById('lightBoxCloseBtn').focus();
                document.getElementById('lightBoxArrowRight').tabIndex = '0';
                document.getElementById('lightBoxArrowLeft').tabIndex = '0';
            } else if (!lightBox.parentElement.style.display == 'block') {
                throw 'it apear media display did not work as intented';
            }
        }
        return article;
    }

    return { createMediaCard };
}
