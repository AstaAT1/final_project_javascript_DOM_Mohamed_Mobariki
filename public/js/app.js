document.querySelectorAll(".carousel-all").forEach(parent => {

    let type =parent.querySelectorAll(".carousel")
    let captions=parent.querySelectorAll(".b-s6")
    let counter = 0
  function Change() {
  type.forEach(s => s.classList.remove("active"));
  captions.forEach(c => c.classList.remove("active"));

  type[counter].classList.add("active");
  captions[counter].classList.add("active");
}
Change()
    setInterval(()=>{
        counter++
        if (counter == type.length) {
            counter = 0
        }
        Change()
    }, 5000)
    captions.forEach((cap, e)=>{
        cap.onclick = () => {
            counter = e
            Change()
        }
    })

});