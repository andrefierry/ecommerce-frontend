let barraTop = document.querySelector("#barraTop");
let articlesNumber = document.querySelector("#articlesNumber");
let usersNumber = document.querySelector("#usersNumber");
let productsNumber = document.querySelector("#productsNumber");

// Funzione per far muovere la navbar
window.addEventListener("scroll", ()=> {
    if (window.scrollY > 0){
        barraTop.classList.add("barraCustom");
    } else {
        barraTop.classList.remove("barraCustom");
    }
})

// Funzione del contatore
function contatore(numeroCicli, variabileArticoli, cadenza) {
    let counter = 0;
    let intervallo = setInterval( ()=> {
             if (counter < numeroCicli){
                 counter++;
                 variabileArticoli.innerHTML = counter;
              } else {
                 clearInterval(intervallo);
              }
        },cadenza)
}

let isObserved = false;
let observer = new IntersectionObserver (entries => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && isObserved == false ){
            contatore(800, articlesNumber, 10);
            contatore(500, usersNumber, 20);
            contatore(750, productsNumber, 15);
            isObserved = true;
        }
    })
}, { threshold: 1 })
observer.observe(articlesNumber);



// window.addEventListener('contextmenu', function(ev) {
//     ev.preventDefault();
//     alert('Non osare copiare niente dalla mia pagina!');
//     return false;
// }, false);

let cardWrapper = document.querySelector("#cardWrapper");
let creaCard = document.querySelector("#creaCard");

let annunci = [
    {nome: "Katana di Hattori Hanzo", categoria: "Accessori", prezzo: 500, url: "https://picsum.photos/200"},
    {nome: "Occhio di Pai Mei", categoria: "Reliquie", prezzo: 1500, url: "https://picsum.photos/201"},
    {nome: "Vaso Ming", categoria: "Arredamento", prezzo: 350, url: "https://picsum.photos/202"},
    {nome: "Soldato di Terracotta", categoria: "Oggettistica", prezzo: 2000, url: "https://picsum.photos/203"},
    {nome: "Kimono Giapponese", categoria: "Abbigliamento", prezzo: 700, url: "https://picsum.photos/204"},
]



annunci.forEach((el, i) =>{
    if ( i >= annunci.length - 3 ){
        let div = document.createElement("div");
        div.classList.add("col-12", "col-md-4", "col-lg-3", "d-flex", "justify-content-center", "my-5");
        div.innerHTML = `
        <div class="card border-primary" style="width: 18rem;">
                        <img class="fotoCard transition" src="${el.url}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${el.nome}</h5>
                          <p class="card-text">${el.categoria}</p>
                          <p class="card-text fs-3">${el.prezzo}$</p>
                          <div class="d-flex justify-content-between align-items-center">
                              <a class="btn btn-primary">Vai all'articolo</a>
                              <i class="bi hearts bi-heart fs-3 text-primary me-2"></i>
                          </div>
                        </div>
                      </div>
        `;
        cardWrapper.appendChild(div);
    }
})

let isObserved2 = false;
let observer2 = new IntersectionObserver (entries => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && isObserved2 == false ){
            barraTop.classList.add("d-none");
        } else {
            barraTop.classList.remove("d-none");
        }
    })
}, { threshold: 0.1 })
observer2.observe(hideBar);

let hearts = document.querySelectorAll(".hearts");

hearts.forEach((el)=>{

    el.addEventListener("click", ()=>{
        el.classList.toggle("bi-heart");
        el.classList.toggle("bi-heart-fill");
    })
})

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });