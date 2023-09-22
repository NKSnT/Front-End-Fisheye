function photographerTemplate(data) {
    console.log(data);
    const { name, id, city, country, tagline, price, portrait } = data;

    //const picture = `assets/photographers/${portrait}`;
    const picture = `assets/photographers/account.png`;

    function getUserCardDOM() {
        //const detail = document.createElement('a');
        //detail.setAttribute('href', './photographer.html?id=' + id);
        const article = document.createElement('article');
        const img = document.createElement('img');
        //img.setAttribute('src', picture);
        img.setAttribute('src', picture);
        img.setAttribute('alt', 'photo de ' + name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const location = document.createElement('p');
        location.innerText = city + ', ' + country;
        location.className = 'location';
        const day_rate = document.createElement('p');
        day_rate.innerText = price + '/jour';
        day_rate.className = 'price';
        const quote = document.createElement('p');
        quote.innerText = tagline;
        quote.className = 'tagline';

        //detail.appendChild(img);
        //detail.appendChild(h2);
        article.appendChild(img);
        article.appendChild(h2);
        //article.appendChild(detail);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(day_rate);

        return article;
    }
    return { name, picture, getUserCardDOM };
}
