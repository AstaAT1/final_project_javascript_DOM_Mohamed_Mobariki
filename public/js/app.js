document.querySelectorAll(".carousel-all").forEach(parent => {
    const type = Array.from(parent.querySelectorAll(".carousel, .carousel1"));
    const captions = Array.from(parent.querySelectorAll(".b-s6"));

    const isGroup = parent.querySelector(".memorys") !== null;
    const group = isGroup ? 3 : 1;
    let counter = 0;

    const wrapper = parent.querySelector(".memorys");

    function getVisibleSlides() {
        // circular logic
        let slides = [];
        for (let i = 0; i < group; i++) {
            slides.push(type[(counter + i) % type.length]);
        }
        return slides;
    }

    function Update() {
        if (!isGroup) return;

        const slideWidth = type[0].offsetWidth;

        // reset transform
        wrapper.style.transform = `translateX(0px)`;

        // hide all slides temporarily
        type.forEach(s => s.style.display = "none");

        // show only the circular 3 slides
        const visible = getVisibleSlides();
        visible.forEach((slide, i) => {
            slide.style.display = "block";
            slide.style.transform = `translateX(${i * slideWidth}px)`;
        });

        // update captions
        captions.forEach(c => c.classList.remove("active"));
        if (captions[counter]) captions[counter].classList.add("active");
    }

    function Change() {
        type.forEach(s => s.classList.remove("active"));
        captions.forEach(c => c.classList.remove("active"));

        if (type[counter]) type[counter].classList.add("active");
        if (captions[counter]) captions[counter].classList.add("active");
    }

    function Run() {
        if (isGroup) {
            Update();
        } else {
            Change();
        }
    }

    Run();

    setInterval(() => {
        counter = (counter + 1) % type.length;
        Run();
    }, 5000);

    captions.forEach((cap, i) => {
        cap.onclick = () => {
            counter = i;
            Run();
        };
    });
});