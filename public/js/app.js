document.querySelectorAll(".carousel-all").forEach(parent => {
    const type = Array.from(parent.querySelectorAll(".carousel, .carousel1, .carousel2"));
    const captions = Array.from(parent.querySelectorAll(".b-s6"));

    const wrapper = parent.querySelector(".memorys, .gallery");
    const isSection7 = parent.querySelector(".memorys") !== null;
    const isSection10 = parent.querySelector(".gallery") !== null;
    let counter = 0;

    // Function for Section10 - 5 slides visible
    function UpdateCarousel2() {
        const totalSlides = type.length;
        wrapper.innerHTML = '';
        
        // Add 5 slides
        for (let i = 0; i < 5; i++) {
            const slideIndex = (counter + i) % totalSlides;
            const clone = type[slideIndex].cloneNode(true);
            wrapper.appendChild(clone);
        }

        wrapper.style.transform = 'translateX(0)';

        // Update captions
        captions.forEach(c => c.classList.remove("active"));
        if (captions[counter]) captions[counter].classList.add("active");
    }

    // Function for Section7 - 3 slides visible
    function UpdateCarousel1() {
        const totalSlides = type.length;
        wrapper.innerHTML = '';
        
        // Add 3 slides
        for (let i = 0; i < 3; i++) {
            const slideIndex = (counter + i) % totalSlides;
            const clone = type[slideIndex].cloneNode(true);
            wrapper.appendChild(clone);
        }

        wrapper.style.transform = 'translateX(0)';

        captions.forEach(c => c.classList.remove("active"));
        if (captions[counter]) captions[counter].classList.add("active");
    }

    // Function for Section6 - 1 slide visible
    function UpdateCarousel() {
        type.forEach(s => s.classList.remove("active"));
        captions.forEach(c => c.classList.remove("active"));

        if (type[counter]) type[counter].classList.add("active");
        if (captions[counter]) captions[counter].classList.add("active");
    }

    function Run() {
        if (isSection10) {
            UpdateCarousel2();
        } else if (isSection7) {
            UpdateCarousel1();
        } else {
            UpdateCarousel();
        }
    }

    // Initialize
    Run();

    // Auto-play
    setInterval(() => {
        counter = (counter + 1) % type.length;
        Run();
    }, 5000);

    // Button clicks
    captions.forEach((cap, i) => {
        cap.onclick = () => {
            counter = i;
            Run();
        };
    });
});