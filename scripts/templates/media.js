function mediaFactory(data, photographerName) {
    const fList = data;
    const ref = photographerName;

    function creatMediaDOM() {
        const section = document.createElement('section');
        const lightBox = document.getElementById('lightBox');
        const likesMaxLimit = 10000;

        section.setAttribute('id', 'mediaSection');
        fList.forEach((file) => {
            let rand = Math.random() * likesMaxLimit;
            rand = Math.floor(rand);

            let type = file.name.split('.').pop();
            let name = file.name.substring(0, file.name.lastIndexOf('.'));
            name = name.replaceAll('_', ' ');
            const article = document.createElement('article');
            article.className = 'mediaCard';
            const fileInfoContainer = document.createElement('div');
            fileInfoContainer.className = 'mediaCard_Info';
            const h3 = document.createElement('h3');
            h3.textContent = name;
            const likesContainer = document.createElement('div');
            const likes = document.createElement('p');
            likes.textContent = rand.toString();
            const likeIcone = document.createElement('img');
            likeIcone.setAttribute('src', './assets/icons/favorite_brown.svg');
            likesContainer.appendChild(likes);
            likesContainer.appendChild(likeIcone);
            fileInfoContainer.appendChild(h3);
            fileInfoContainer.appendChild(likesContainer);
            // likes.innerText = 'test';
            // likes.addEventListener('click', (Event) => {});
            article.addEventListener('click', (event) => {
                lightBox.firstChild.setAttribute(
                    'src',
                    `./assets/photographers/Sample Photos/${ref}/${file.name}`
                );
                lightBox.parentElement.style.display = 'block';
                const index = fList.indexOf(file);
                localStorage.setItem('imgIndex', index);
            });
            if (type == 'jpg' || type == 'png') {
                const img = document.createElement('img');
                img.setAttribute('src', `./assets/photographers/Sample Photos/${ref}/${file.name}`);
                img.setAttribute('alt', name);
                img.className = 'mediaCard_Media';
                article.appendChild(img);
                article.appendChild(fileInfoContainer);
                section.appendChild(article);
            } else if (type == 'mp4' || type == 'avi') {
                const video = document.createElement('video');
                video.setAttribute(
                    'src',
                    `./assets/photographers/Sample Photos/${ref}/${file.name}` + '#t=0.1'
                );
                video.setAttribute('alt', name);
                video.setAttribute('preload', 'metadata');
                video.className = 'mediaCard_Media';
                article.appendChild(video);
                article.appendChild(fileInfoContainer);
                section.appendChild(article);
            } else {
                console.log('can not load : ' + file.name + ', format error');
            }
        });
        return section;
    }
    return { creatMediaDOM };
}

/*
    function createMediaDOM() {
        //console.log('fList in createMedia' + fList);
        const section = document.createElement('section');
        // fList.forEach((file) => {
        //     console.log('file element : ' + file);
        //     //const article = document.createElement('article');
        //     //const img = document.createElement('img');
        //     //img.setAttribute('src', dir + 'Fashion_Urban_Jungle');

        //     //article.appendChild(img);
        //     //section.appendChild(article);

        //     //img.setAttribute('alt', 'photo de ' + name);
        //     // if (type === 'img') {

        //     // } else if (type === 'video') {
        //     //     console.log('video are not supported yet');
        //     // }
        // });
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute('src', dir + 'Fashion_Urban_Jungle');
        article.appendChild(img);
        section.appendChild(article);
        console.log('why ? : ' + section);
        return section;
    }
    return createMediaDOM;
*/
