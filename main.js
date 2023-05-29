const key = `3265874a2c77ae4a04bb96236a642d2f`;

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

var arr = []

// async function geolocation(position) {
//     const {
//         latitude,
//         longitude
//     } = position.coords;
//     const resp = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=88650423c211423597ecc74c9905972f`)
//     const respData = await resp.json()
//     const respDataCity = respData.results[0].components.city;
//     console.log('errrrrorrr',position);
//     arr = []
//     arr.push(respDataCity)
// }

async function getWeather(location) {
    //work with classes
    if (form.className === 'changed') {
        form.style.transform = 'translateY(-42px)'
    } else {
        main.style.opacity = '1'
        main.style.transform = 'translateY(0)'
        form.style.transform = 'translateY(-42px)'
        form.classList.add('changed')
    }

    //fethcing
    try {
        const resp = await fetch(url(location))
        const respData = await resp.json()
        addWeather(respData)
    } catch {
        alert("Something went wrong, this place " + search.value + " doesn't exist")
        // let currPos = navigator.geolocation.getCurrentPosition(geolocation)
        // const current = await fetch(url(currPos))
        // const currentData = await current.json()
        // addWeather(currentData)
    }
}


function addWeather(data) {
    //location weather images
    backgroundImages(data)
    // 
    const temp = kelToCel(data.main.temp)
    const weather = document.createElement('div')
    // console.log(data);
    weather.classList.add('weather')
    weather.innerHTML = `
        <div class="weather-box">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        <h2>${temp}°C</h2>
        </div>
        <small>${data.weather[0].main}</small>
        <p class="location-name">${capitalizeFirstLetter(data.name)}</p>
    `
    main.innerHTML = ``
    search.value = ``

    main.appendChild(weather)
}

function backgroundImages(img) {
    document.body.style.backgroundColor = getRandomColor()
    if (img.weather[0].description === 'clear sky') {
        main.style.color = '#fff'
        main.style.backgroundImage = `url("https://cutewallpaper.org/25/anime-gif-starry-night-sky-wallpaper/anime-602e6-aesthetic-55703-night-35848-sky-6b922-gif-deeae-largest-9ccd8-wallpaper-2d3c7-portal.gif")`
        document.body.style.backgroundImage = `url("https://wallpaperaccess.com/full/8081113.jpg")`
    }
    if (img.weather[0].description === 'few clouds' || img.weather[0].description === 'scattered clouds' || img.weather[0].description === 'broken clouds') {
        main.style.color = '#fff'
        main.style.backgroundImage = `url("https://c.tenor.com/ROUdvMajEh4AAAAC/heart-clouds.gif")`
        document.body.style.backgroundImage = `url("https://wallpaperaccess.com/full/8081113.jpg")`
    }
    if (img.weather[0].icon === '01d' && img.weather[0].description === 'clear sky') {
        main.style.color = '#fff'
        document.body.style.background = `url("https://scontent.ftbs3-2.fna.fbcdn.net/v/t1.15752-9/297626626_1769018566780398_8482937406727416466_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFdO-5UJ7UqzGPVH13l09BSvynxHIgDTM2_KfEciANMzVwwc8rIFw6hTNVXqgnh1DYaPfVqHEhyzk4xVTCB9iWm&_nc_ohc=6CPW1kJoZ-YAX_TDDdI&_nc_ht=scontent.ftbs3-2.fna&oh=03_AVI2UmhmLDukR-ZafAGRwzGFrmSpus2uDbvQKQ5-KdfT-A&oe=631ECF34")`
        main.style.backgroundImage = `url("https://phoneky.co.uk/thumbs/screensavers/down/nature/newanimate_0ET4HBGy.gif")`
    }
    if (img.weather[0].icon === '04n' || img.weather[0].description === 'overcast clouds') {
        main.style.color = '#fff'
        document.body.style.background = `url("https://www.itl.cat/pngfile/big/284-2842668_background-cloud-hd.jpg")`
        main.style.backgroundImage = `url("https://cdn.1tv.ge/app/uploads/2019/11/1573742446-Clouds-on-Mars.gif")`
    }
    if (img.weather[0].icon === '02d' && img.weather[0].description === 'few clouds' || img.weather[0].description === 'broken clouds') {
        main.style.color = '#fff'
        document.body.style.background = `url("https://img.freepik.com/premium-photo/sunny-sky-with-clouds_87394-1064.jpg?w=2000")`
        main.style.backgroundImage = `url("https://c.tenor.com/AXST3pQh5r8AAAAC/sunny-day-when-sharks-attack.gif")`
    }
    if (img.weather[0].icon === '10d' || img.weather[0].main === 'Rain') {
        main.style.color = '#fff'
        document.body.style.background = `url("https://cutewallpaper.org/22/mobile-4k-rain-wallpapers/774314311.jpg")`
        main.style.backgroundImage = `url("https://c.tenor.com/lkisKQwoy6cAAAAC/raining-bad-weather.gif")`
    } else {
        document.body.style.backgroundColor = getRandomColor()
    }
}

//convert kelvit to celcius
function kelToCel(K) {
    return Math.floor(K - 273.15)
}


//capitalize first letter 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}



//random colors with intervals if you want :)

function getRandomColor() {
    let color1 = Math.floor(Math.random() * 256)
    let color2 = Math.floor(Math.random() * 256)
    let color3 = Math.floor(Math.random() * 256)
    let RandomColor = `rgb(` + color1 + `,` + color2 + `,` + color3 + ` )`
    return RandomColor
}

setInterval(() => {
    document.body.style.backgroundColor = getRandomColor()
}, 10000);




//submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = search.value;
    if(arr.length > 0){
        getWeather(arr[0])
        arr = []
    }else{
        getWeather(text)
    }
})



// navigator.geolocation.getCurrentPosition(geolocation,console.log('error'))
