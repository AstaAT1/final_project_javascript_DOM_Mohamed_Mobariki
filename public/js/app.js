document.querySelectorAll(".carousel-all").forEach(parent => {
    const type = Array.from(parent.querySelectorAll(".carousel, .carousel1, .carousel2"));
    const captions = Array.from(parent.querySelectorAll(".b-s6"));

    const wrapper = parent.querySelector(".memorys, .gallery");
    const isSection7 = parent.querySelector(".memorys") !== null;
    const isSection10 = parent.querySelector(".gallery") !== null;
    let counter = 0;
    const menuLinks = document.querySelectorAll('.choix a');
const menuSections = document.querySelectorAll('.p2-s5');

// Initially show only Starters
menuSections.forEach((section, index) => {
    if (index === 0) {
        section.classList.add('active-menu');
        section.classList.remove('bo');
    }
});

// Add click events to menu links
menuLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        menuLinks.forEach(l => l.classList.remove('active-link'));
        
        // Add active class to clicked link
        link.classList.add('active-link');
        
        // Hide all menu sections
        menuSections.forEach(section => {
            section.classList.add('bo');
            section.classList.remove('active-menu');
        });
        
        // Show corresponding menu section
        menuSections[index].classList.remove('bo');
        menuSections[index].classList.add('active-menu');
    });
});

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
let modal1 = document.querySelector(".modal1")
document.querySelectorAll(".modal-all").forEach(btn => {
    btn.addEventListener("click" , () => {
        let modal = document.createElement("div")
        modal.classList.add("modal")
           if(btn === modal1) {
            modal.innerHTML = `
                <div class="modal-content">
                    <h2>Modal 1</h2>
                    
                    <p>Ana Modal 1</p>
                    <button class="closeBtn"><i class="fa-solid fa-x"></i></button>
                </div>
            `
        }
        document.body.append(modal)
        modal.querySelector(".closeBtn").onclick = () => modal.remove()
        modal.onclick = (e) => {
            if(e.target === modal){
                modal.remove()
            }
        }
    })
})