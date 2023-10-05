const urlId = window.location.search;
const urlSearchParams = new URLSearchParams(urlId);
const photographerId = urlSearchParams.get('id');

async function getPhotographers() {
    return await fetch('./data/photographers.json')
        .then((res) => res.json())
        .catch((err) => console.log('Unexpected error occured', err));
}
function getPhotographersMedias(ref) {
    let fList = new Object();
    if (ref == 'Ellie Rose') {
        fList = [
            { name: 'Architecture_Connected_Curves.jpg' },
            { name: 'Architecture_Cross_Bar.jpg' },
            { name: 'Architecture_Water_on_Modern.jpg' },
            { name: 'Architecture_White_Light.jpg' },
            { name: 'Sport_Jump.jpg' },
            { name: 'Sport_Next_Hold.jpg' },
            { name: 'Sport_Race_End.jpg' },
            { name: 'Sport_Sky_Cross.jpg' },
            { name: 'Sport_Race_End.jpg' },
            { name: 'Sport_Tricks_in_the_air.mp4' },
            { name: 'sport_water_tunnel.jpg' }
        ];
    } else if (ref == 'Marcel') {
        fList = [
            { name: 'Architecture_Corner_Room.jpg' },
            {
                name: 'Architecture_coverr_circle_empty_highway_in_buenos_aires_587740985637.mp4'
            },
            { name: 'Architecture_Dome.jpg' },
            { name: 'Architecture_On_a_hill.jpg' },
            { name: 'Architecure_Contrast.jpg' },
            { name: 'Travel _Adventure_Door.jpg' },
            { name: 'Travel_Bike_and_Stair.jpg' },
            { name: 'Travel_OpenMountain.jpg' },
            { name: 'Travel_SunsetonCanals.jpg' },
            { name: 'Travel_Tower.jpg' }
        ];
    } else if (ref == 'Mimi') {
        fList = [
            { name: 'Animals_Rainbow.jpg' },
            { name: 'Animals_Wild_Horses_in_the_mountains.mp4' },
            { name: 'Event_BenevidesWedding.jpg' },
            { name: 'Event_PintoWedding.jpg' },
            { name: 'Event_SeasideWedding.jpg' },
            { name: 'Portrait_Background.jpg' },
            { name: 'Portrait_Nora.jpg' },
            { name: 'Portrait_Wednesday.jpg' },
            { name: 'Travel_HillsideColor.jpg' },
            { name: 'Travel_Lonesome.jpg' }
        ];
    } else if (ref == 'Nabeel') {
        fList = [
            { name: 'Portrait_AfternoonBreak.jpg' },
            { name: 'Portrait_Alexandra.jpg' },
            { name: 'Portrait_Shaw.jpg' },
            { name: 'Portrait_Sunkissed.jpg' },
            { name: 'ravel_Boat_Wanderer.jpg' },
            { name: 'Travel_Bridge_into_Forest.jpg' },
            { name: 'Travel_On_the_Road.jpg' },
            { name: 'Travel_Outdoor_Baths.jpg' },
            { name: 'Travel_Road_into_Hil.jpg' },
            { name: 'Travel_Rock_Mountains.mp4' }
        ];
    } else if (ref == 'Rhode') {
        fList = [
            { name: 'Animals_Majesty.jpg' },
            { name: 'Animals_Puppiness.mp4' },
            { name: 'Event_Emcee.jpg' },
            { name: 'Event_KeyboardCheck.jpg' },
            { name: 'Event_ProductPitch.jpg' },
            { name: 'Event_VentureConference.jpg' },
            { name: 'Fashion_Melody_Red_on_Stripes.jpg' },
            { name: 'Fashion_Wings.jpg' },
            { name: 'Sport_2000_with_8.jpg' },
            { name: 'Sport_Butterfly.jpg' }
        ];
    } else if (ref == 'Tracy') {
        fList = [
            { name: 'Art_Mine.jpg' },
            { name: 'Art_Purple_light.mp4' },
            { name: 'Art_Triangle_Man.jpg' },
            { name: 'Art_Wooden_Horse_Sculpture.jpg' },
            { name: 'Event_18thAnniversary.jpg' },
            { name: 'Event_Sparklersy.jpg' },
            { name: 'Event_WeddingGazebo.jpg' },
            { name: 'Fashion_Pattern_on_Pattern.jpg' },
            { name: 'Fashion_Urban_Jungle.jpg' },
            { name: 'Fashion_Yellow_Beach.jpg' }
        ];
    }
    return fList;
}

async function displayData(photographers) {
    const photographersHeader = document.querySelector('.photograph-header');
    const main = document.getElementById('main');
    //const main = document.querySelector('#main');
    photographers.forEach((photographer) => {
        if (photographer.id == photographerId) {
            let ref = photographer.name.split(' ')[0]; //split the name to find the corect folder
            ref = ref.replaceAll('-', ' '); //help to match ref name and folder name
            const mediasList = getPhotographersMedias(ref);

            const photographerModel = photographerTemplate(photographer, mediasList);
            const userCardDOM = photographerModel.getPhotographerCardDom();
            const lightBox = photographerModel.lightBox();
            photographersHeader.appendChild(userCardDOM.article);
            main.appendChild(userCardDOM.insert);
            main.appendChild(lightBox);

            // console.log('fList dans display data : ');
            // console.log(mediasList);
            // console.log('ref dans display data');
            // //console.log(ref);
            const photographerMedia = mediaFactory(mediasList, ref); //mediaFactoryTemplate()
            //const photographerMedia = mediaFactory(ref); //mediaFactoryTemplate()

            const userCardDOM2 = photographerMedia.creatMediaDOM();
            main.appendChild(userCardDOM2);

            // console.log(mediaDOM);
            //main.appendChild(mediaDOM);
        }
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}
init();
