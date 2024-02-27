places = {}
resorts = {}

const placeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-img')
            placeObserver.unobserve(entry.target)
        } 
    })
})

const resortObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-resort')
            resortObserver.unobserve(entry.target)
        } 
    })
})

async function fetchPlaces() {
    try {
        const response = await fetch('scripts/json/places.json')
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON. Status: ${response.status}`)
        }
        const data = await response.json()
        places = data.places
        console.log(places)
    } 
    catch (error) {
        console.error('Error fetching JSON:', error.message)
    }
}

async function fetchResorts() {
    try {
        const response = await fetch('scripts/json/hotels.json')
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON. Status: ${response.status}`)
        }
        const data = await response.json()
        resorts = data.hotels
        console.log(resorts)
    }
    catch (error) {
        console.error('Error fetching JSON:', error.message)
    }
}

function insertPlaces() {
    console.log(places)
    let leftContainer = document.querySelector(".left-container")
    let rightContainer = document.querySelector(".right-container")

    const baseDelay = 100

    places.forEach((place, index) => {
        if (index % 2 == 0) {
            leftContainer.innerHTML += `<img src="${place.image}" class="place-img" style="animation-delay: calc(${index + 1} * ${baseDelay}ms)">`
        }
        else {
            rightContainer.innerHTML += `<img src="${place.image}" class="place-img" style="animation-delay: calc(${index + 1} * ${baseDelay}ms)">`
        }
    })
    const leftImg = leftContainer.querySelectorAll('img')
    const rightImg = rightContainer.querySelectorAll('img')
    leftImg.forEach(img => placeObserver.observe(img))
    rightImg.forEach(img => placeObserver.observe(img))
}

function insertResorts() {
    const resortContainer = document.querySelector(".resort-container")
    resorts.forEach((resort, index) => {
        resortContainer.innerHTML += `
            <div class="resort" style="animation-delay: ${index * 200}ms">
                <div class="resort-img-container">
                <img src="${resort.image}" class="resort-img">
                <div class="resort-overlay">
                    <a href="${resort.link}" class="view-on">
                        View on tripadvisor 
                    </a>
                </div>
                </div>
                <p class="resort-name">${resort.name}</p>
                <p class="resort-location">📍 ${resort.location}</p>
            </div>
        `
    })
    const resortContainers = resortContainer.querySelectorAll('.resort')
    resortContainers.forEach(resort => resortObserver.observe(resort))
}

fetchPlaces().then(() => {
    insertPlaces()
})

fetchResorts().then(() => {
    insertResorts()
})