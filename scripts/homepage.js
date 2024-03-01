function castParallax() {
    window.addEventListener('scroll', () => {
        let top = window.scrollY
        let speed, yPos
        let layers = document.querySelectorAll('.parallax-layer')
        layers.forEach(layer => {
            speed = layer.getAttribute('data-speed')
            yPos = (top * speed / 100)
            layer.setAttribute('style', `transform: translate3d(0px, ${yPos}px, 0px)`)
        })
    })
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))  
}

function onLoadAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                if (entry.target.classList.contains("parallax-section")) {
                    observer.unobserve(entry.target)
                }
            } else {
                entry.target.classList.remove('visible')
            }
        })
    })

    const elements = document.querySelectorAll('section')
    elements.forEach((element) => observer.observe(element))
}

const castObservers = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry)
                if (entry.target.classList.contains('parallax-section')) {
                    $('.navbar').css({
                        'opacity': '0',
                        'margin-top': '-25px',
                    })
                    $('.map-section').css({
                        'opacity': '0',
                    })
                }
                else if (entry.target.classList.contains('map-section')) {
                    $('.parallax-section').css({
                        'opacity': '0',
                    })
                }
            } 
            else {
                if (entry.target.classList.contains('parallax-section')) {
                    $('.navbar').css({
                        'opacity': '1',
                        'margin-top': '0px',
                    })
                    $('.map-section').css({
                        'opacity': '1',
                    })
                }
                else if (entry.target.classList.contains('map-section')) {
                    $('.parallax-section').css({
                        'opacity': '1',
                    })
                }
            }
        })
    })
    
    observer.observe(document.querySelector('.parallax-section'))
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        castParallax()
    }
    onLoadAnimation()
    castObservers()
})