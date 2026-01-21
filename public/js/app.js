document.querySelectorAll(".carousel-all").forEach(function (parent) {
    let type = Array.from(parent.querySelectorAll(".carousel, .carousel1, .carousel2"))
    let captions = Array.from(parent.querySelectorAll(".b-s6"))
    let wrapper = parent.querySelector(".memorys, .gallery")
    let isSection7 = parent.querySelector(".memorys") !== null
    let isSection10 = parent.querySelector(".gallery") !== null
    let counter = 0

    function UpdateCarousel2() {
        let totalSlides = type.length
        wrapper.innerHTML = ''

        for (let i = 0; i < 5; i++) {
            let slideIndex = (counter + i) % totalSlides
            let clone = type[slideIndex].cloneNode(true)
            wrapper.appendChild(clone)
        }

        wrapper.style.transform = 'translateX(0)'
        captions.forEach(function (c) { c.classList.remove("active") })
        if (captions[counter]) captions[counter].classList.add("active")
    }

    function UpdateCarousel1() {
        let totalSlides = type.length
        wrapper.innerHTML = ''

        for (let i = 0; i < 3; i++) {
            let slideIndex = (counter + i) % totalSlides
            let clone = type[slideIndex].cloneNode(true)
            wrapper.appendChild(clone)
        }

        wrapper.style.transform = 'translateX(0)'
        captions.forEach(function (c) { c.classList.remove("active") })
        if (captions[counter]) captions[counter].classList.add("active")
    }

    function UpdateCarousel() {
        type.forEach(function (s) { s.classList.remove("active") })
        captions.forEach(function (c) { c.classList.remove("active") })
        if (type[counter]) type[counter].classList.add("active")
        if (captions[counter]) captions[counter].classList.add("active")
    }

    function Run() {
        if (isSection10) {
            UpdateCarousel2()
        } else if (isSection7) {
            UpdateCarousel1()
        } else {
            UpdateCarousel()
        }
    }

    Run()

    setInterval(function () {
        counter = (counter + 1) % type.length
        Run()
    }, 5000)

    captions.forEach(function (cap, i) {
        cap.onclick = function () {
            counter = i
            Run()
        }
    })
})

// MENU TABS
let menuLinks = document.querySelectorAll('.choix a')
let menuSections = document.querySelectorAll('.p2-s5')

menuSections.forEach(function (section, index) {
    if (index === 0) {
        section.classList.add('active-menu')
        section.classList.remove('bo')
    }
})

menuLinks.forEach(function (link, index) {
    link.addEventListener('click', function (e) {
        e.preventDefault()

        menuLinks.forEach(function (l) { l.classList.remove('active-link') })
        link.classList.add('active-link')

        menuSections.forEach(function (section) {
            section.classList.add('bo')
            section.classList.remove('active-menu')
        })

        menuSections[index].classList.remove('bo')
        menuSections[index].classList.add('active-menu')
    })
})

// GALLERY MODAL
document.querySelectorAll(".modal-all").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault()

        let modal = document.createElement("div")
        modal.classList.add("modal")

        modal.innerHTML = `
            <div class="modal-content">
                <button class="closeBtn"><i class="fa-solid fa-x"></i></button>
                <div class="modal-carousel">
                    <div class="modal-slide">
                        <iframe width="870" height="610" src="https://www.youtube.com/embed/O5HQ1sZseKg?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="modal-slide"><img src="./public/Images/menu/menu-item-1.png" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/menu/menu-item-2.png" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/menu/menu-item-3.png" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/menu/menu-item-4.png" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/menu/menu-item-5.png" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/menu/menu-item-6.png" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/gallery/gallery-1.jpg" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/gallery/gallery-2.jpg" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/gallery/gallery-3.jpg" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/gallery/gallery-4.jpg" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/gallery/gallery-5.jpg" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/gallery/gallery-6.jpg" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/gallery/gallery-7.jpg" alt=""></div>
                    <div class="modal-slide"><img src="./public/Images/gallery/gallery-8.jpg" alt=""></div>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-chevron-left prev-slide"></i>
                    <i class="fa-solid fa-chevron-right next-slide"></i>
                </div>
            </div>
        `

        document.body.append(modal)

        let slides = modal.querySelectorAll('.modal-slide')
        let totalSlides = slides.length
        let currentSlide = 0

        if (btn.classList.contains("modal1")) currentSlide = 0
        else if (btn.classList.contains("modal2")) {
            currentSlide = 1
        }
        else if (btn.classList.contains("modal3")) currentSlide = 2
        else if (btn.classList.contains("modal4")) currentSlide = 3
        else if (btn.classList.contains("modal5")) currentSlide = 4
        else if (btn.classList.contains("modal6")) currentSlide = 5
        else if (btn.classList.contains("modal7")) currentSlide = 6

        function showSlide(index) {
            slides.forEach(function (s) { s.classList.remove('active') })
            slides[index].classList.add('active')
        }

        showSlide(currentSlide)

        modal.querySelector('.prev-slide').onclick = function () {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
            showSlide(currentSlide)
        }

        modal.querySelector('.next-slide').onclick = function () {
            currentSlide = (currentSlide + 1) % totalSlides
            showSlide(currentSlide)
        }

        modal.querySelector(".closeBtn").onclick = function () { modal.remove() }
        modal.onclick = function (e) {
            if (e.target == modal) modal.remove()
        }
    })
})

// BOOKING SYSTEM
let reservations = []

window.addEventListener('DOMContentLoaded', function () {
    let bookBtns = document.querySelectorAll('.modal-book')
    if (!bookBtns.length) return

    bookBtns.forEach(function (bookBtn) {
        bookBtn.addEventListener('click', function (e) {
            e.preventDefault()

            let modal = document.createElement('div')
            modal.classList.add('modal')

            modal.innerHTML = `
            <div class="modal-content-book">
                <button class="closeBtn"><i class="fa-solid fa-x"></i></button>
                <h2>Book a Table</h2>
                <div class="book-form">
                    <input type="text" class="inputa" id="guest-name" placeholder="Your name" required>
                    <select class="inputa" id="meal-type" required>
                        <option value="">Select a meal</option>
                        <option value="Magnam Tiste">Magnam Tiste - $5.95</option>
                        <option value="Aut Luia">Aut Luia - $14.95</option>
                        <option value="Est Eligendi">Est Eligendi - $8.95</option>
                        <option value="Eos Luibusdam">Eos Luibusdam - $12.95</option>
                        <option value="Laboriosam Direva">Laboriosam Direva - $9.95</option>
                    </select>
                    <input type="date" class="inputa" id="booking-date" required>
                    <input type="time" class="inputa" id="time-start" placeholder="Start time" required>
                    <input type="time" class="inputa" id="time-end" placeholder="End time" required>
                    <input type="number" class="inputa" id="num-people" placeholder="Number of people" min="1" max="20" required>
                    <div class="error-message" style="display: none;"></div>
                    <button class="submit-booking">Book Now</button>
                </div>
            </div>
        `

            document.body.appendChild(modal)

            modal.querySelector('.closeBtn').onclick = function () { modal.remove() }
            modal.onclick = function (e) {
                if (e.target === modal) modal.remove()
            }

            modal.querySelector('.submit-booking').onclick = function () {
                let name = document.getElementById('guest-name').value.trim()
                let meal = document.getElementById('meal-type').value
                let date = document.getElementById('booking-date').value
                let timeStart = document.getElementById('time-start').value
                let timeEnd = document.getElementById('time-end').value
                let people = document.getElementById('num-people').value
                let errorDiv = modal.querySelector('.error-message')

                errorDiv.style.display = 'none'
                errorDiv.style.backgroundColor = '#ffe6e6'
                errorDiv.style.color = '#ce1212'

                if (!name || !meal || !date || !timeStart || !timeEnd || !people) {
                    errorDiv.textContent = 'Please fill all fields!'
                    errorDiv.style.display = 'block'
                    return
                }

                if (timeEnd <= timeStart) {
                    errorDiv.textContent = 'End time must be after start time!'
                    errorDiv.style.display = 'block'
                    return
                }

                let hasConflict = false
                for (let i = 0; i < reservations.length; i++) {
                    let booking = reservations[i]
                    if (booking.date === date) {
                        let existStart = booking.timeStart
                        let existEnd = booking.timeEnd
                        let overlap1 = (timeStart >= existStart && timeStart < existEnd)
                        let overlap2 = (timeEnd > existStart && timeEnd <= existEnd)
                        let overlap3 = (timeStart <= existStart && timeEnd >= existEnd)
                        if (overlap1 || overlap2 || overlap3) {
                            hasConflict = true
                            break
                        }
                    }
                }

                if (hasConflict) {
                    errorDiv.textContent = 'Sorry! This time is already booked. Please choose another time.'
                    errorDiv.style.display = 'block'
                    return
                }

                reservations.push({
                    name: name,
                    meal: meal,
                    date: date,
                    timeStart: timeStart,
                    timeEnd: timeEnd,
                    people: people
                })

                errorDiv.style.backgroundColor = '#d4edda'
                errorDiv.style.color = '#155724'
                errorDiv.textContent = 'Success! Your table has been booked!'
                errorDiv.style.display = 'block'
            }
        })
    })
})