const imageAuthorEl = document.getElementById('imageAuthorEl');
const coinImage = document.getElementById('coinImage');
const coinName = document.getElementById('coinName');
const currentPrice = document.getElementById('currentPrice');
const dayHigh = document.getElementById('dayHigh');
const dayLow = document.getElementById('dayLow');
const currentTimeEl = document.getElementById('currentTimeEl');
const weather = document.getElementById('weather');
// prettier-ignore
//background api
fetch('https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=Skxs6jA7rhnbHXQekaJ4ISMGdaNntVJ6zs_CuczDzFA')
    .then(res => res.json())
    .then(data => {
        let backgroundImage = data.urls.regular
        document.body.style.backgroundImage = `url(${backgroundImage})`
        const imageAuthor = `By: ${data.user.name}`
        imageAuthorEl.textContent = imageAuthor
    })
.catch(err=> {
    document.body.style.backgroundImage= `url(https://placekitten.com/1000/1000)`
})
//bitcoin api
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then(res => {
        if (!res.ok) {
            throw Error('Something went wrong')
        }
        return res.json()
    })
    .then(data => {
        coinImage.src = data.image.small
        coinName.textContent = data.name
        currentPrice.textContent = `Current price: ${data.market_data.current_price.usd} USD`
        dayHigh.textContent = `24-hour High: ${data.market_data.high_24h.usd}`
        dayLow.textContent = `24-hour Low: ${data.market_data.low_24h.usd}`
    })
    .catch(err => console.error(err))
//time
function getCurrentTime() {
    const date = new Date()
    const currentTime = date.toLocaleTimeString('en-US', {
        timeStyle: 'medium',
    })
    currentTimeEl.textContent = currentTime
}

setInterval(getCurrentTime, 1000)
//weather api
navigator.geolocation.getCurrentPosition(position => {
    // prettier-ignore
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=d29e27ca0e8de83fab6738e0e963cd24`)
        .then(res => {
            if (!res.ok) {
            throw Error('Weather data not available.')
        }
            return res.json()
        })
        .then(data => {
                console.log(data)
                const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                const city = data.name
                const temperature = Math.round(data.main.temp)

                weather.innerHTML = `
                    <div class="weather-header">
                        <img src=${iconURL} />
                        <p class="weather-temperature">${temperature}&deg;</p>
                    </div>
                    <p class="weather-city">${city}</p>
                `
            })
        .catch(err => console.error(err))
})


