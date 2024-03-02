let items = document.querySelectorAll(".slider .list .item")
let thumbnails = document.querySelectorAll(".thumbnail .item")

let countItem = items.length
let itemActive = 0

function onPrev() {
  itemActive = itemActive - 1
  if (itemActive <= 0) {
    itemActive = countItem - 1
  }
  showSlider()
}

function onNext() {
  itemActive = itemActive + 1
  if (itemActive >= countItem) {
    itemActive = 0
  }
  showSlider()
}

next.onclick = onNext
prev.onclick = onPrev

function showSlider() {
  let itemActiveOld = document.querySelector(".slider .list .item.active")
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active")
  itemActiveOld.classList.remove("active")
  thumbnailActiveOld.classList.remove("active")

  items[itemActive].classList.add("active")
  thumbnails[itemActive].classList.add("active")

  clearInterval(refreshInterval)
}

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index
    showSlider()
  })
})
