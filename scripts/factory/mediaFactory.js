function mediaFactory(media, ref) {
    //factory for media
    const { title, image, video, likes } = media;
    if (media.hasOwnProperty('image')) {
        const img = document.createElement('img');
        img.setAttribute('src', `./assets/photographers/Sample Photos/${ref}/${image}`);
        img.setAttribute('alt', 'photo  ' + title);
        return img;
    } else if (media.hasOwnProperty('video')) {
        const vid = document.createElement('video');
        vid.setAttribute('src', `./assets/photographers/Sample Photos/${ref}/${video}` + '#t=0.1');
        vid.setAttribute('aria-label', 'video, ' + title);
        vid.setAttribute('preload', 'metadata');
        vid.setAttribute('controls', '');
        return vid;
    } else {
        throw 'unsuported media format';
    }
}
