place = {}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      $('.navbar').css({
        'background-color': 'transparent',
        'box-shadow': 'none'
      })
    } else {
      $('.navbar').css({
        'background-color': 'black',
        'box-shadow': '1px 1px 4px 0 rgba(0, 0, 0, 0.1);'
      })
    }
  })
})

observer.observe(document.querySelector(".video-container"))

function carousel() {
    console.log(place)
    const displayedImage = document.querySelector(".displayed-image")

    displayedImage.src = place.image_1

    const images = document.querySelectorAll(".side-image")
    images.forEach((image, index) => {

        if (index == 0) {
            image.src = place.image_1
        }
        else if (index == 1) {
            image.src = place.image_2
        }
        else if (index == 2) {
            image.src = place.image_3
        }

        image.addEventListener("click", () => {
            document.querySelector(".side-image.active").classList.remove("active")
            displayedImage.src = image.src
            image.classList.add("active")
        })
    })
}

function initDetails() {

    document.querySelector('video').src = place.video

    document.querySelectorAll(".title").forEach(title => {
        title.textContent = place.name
    })

    document.querySelector(".description").textContent = place.description

    document.querySelectorAll('.activity-image').forEach((image, index) => {
        image.src = place.activities[index].image_url
    })
    document.querySelectorAll(".activity-name").forEach((name, index) => {
        name.textContent = place.activities[index].name
    })

    document.querySelector('iframe').src = place.map
}

function initPlace() {
    result = JSON.parse(localStorage.getItem("Place"))
    if (result == null) {
        window.location.href = "places.html"
    }
    return result
}

document.addEventListener("DOMContentLoaded", () => {
    place = initPlace()
    initDetails()
    carousel()
})

