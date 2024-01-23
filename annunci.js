let cardWrapper = document.querySelector("#cardWrapper");

fetch("./annunci.json").then((response)=> response.json()).then((data)=> {
    
    function createCards(array){
        cardWrapper.innerHTML = "";
        array.forEach((el, i) => {
                let div = document.createElement("div");
                div.classList.add("col-12", "col-md-6", "my-5", "d-flex", "justify-content-center");
                div.innerHTML = `
                <div class="card me-2 border-primary">
                            <div class="overflow-hidden">
                                <img src="https://picsum.photos/20${i}" class="card-img-top transition" alt="...">
                            </div>
                            <div class="card-body">
                            <h5 class="card-title text-truncate">${el.nome}</h5>
                            <p class="card-text">${el.categoria}</p>
                            <p class="card-text fw-bold">Prezzo: ${el.prezzo}$</p>
                            <div class="d-flex justify-content-between">
                                <a href="#" class="btn btn-outline-primary">Aggiungi al carrello</a>
                                <i class="bi bi-heart fs-4"></i>
                            </div>
                            <p class="card-text mt-3 text-end"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    `
                cardWrapper.appendChild(div);
            }
        )
    }
    createCards(data);

    // GENERA LE CATEGORIE
    function setCategories(){
        let containerRadio = document.querySelector("#containerRadio");
        let categories = data.map ((el)=> el.categoria)
        let uniqueCategories = [];
        categories.forEach((el)=> {
            if (!uniqueCategories.includes(el)){
                uniqueCategories.push(el);
            }
        });
    
        uniqueCategories.forEach((el)=>{
            div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${el}">
                <label class="form-check-label" for="${el}">
                ${el}
                </label>
            `;
            containerRadio.appendChild(div);
        })
    }
    setCategories();

    //  FILTRA PER CATEGORIA
    let inputChecks = document.querySelectorAll(".form-check-input");

    function filterByCategory(){
        let arrayButtons = Array.from(inputChecks);
        let checked = arrayButtons.find((el) => el.checked)
        if(checked.id == "All"){
            return array;

        }else {
            let filtered = data.filter((el)=> el.categoria == checked.id )
            return filtered;
        }
    }

    inputChecks.forEach((el)=> {
        el.addEventListener("click", () =>{
            globalFilter();
        })
    })

    // FILTRA PER PREZZO
    let inputPrice = document.querySelector("#inputPrice");
    let price = document.querySelector("#price");
    
    function minMaxPrices(){
        let prices = data.map ((el)=> el.prezzo)
        let max = Math.max(...prices);
        let min = Math.min(...prices);
        inputPrice.max = max;
        inputPrice.value = max;
        inputPrice.min = min;
        price.innerHTML = max;
    }
    minMaxPrices();

    function filterByPrice(array){
        let filtered = array.filter((el)=> el.prezzo <= inputPrice.value).sort((a, b)=> b.prezzo - a.prezzo)
        price.innerHTML = inputPrice.value;
        return filtered;
    }

    inputPrice.addEventListener("input", ()=>{
        globalFilter();
    })

    //  FILTRA PER PAROLA
    let wordInput = document.querySelector("#wordInput");

    function filterByWord(array){
        let value = wordInput.value;
        let filtered = array.filter((el)=> el.nome.toLowerCase().includes(value.toLowerCase()))
        return filtered;
    }

    wordInput.addEventListener("input", ()=>{
        globalFilter();
    })

    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);
        createCards(filteredByWord);
    }

})

