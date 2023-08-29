import { AvaRbcPreparator } from "./AvaRbcPreparator.js";
import { AvaUrlGenerator } from "./AvaUrlGenerator.js";
export class Manager {
    constructor() {
        this.preUrl = 'https://cors-anywhere.herokuapp.com'; // url cors proxy
        this.generator = new AvaUrlGenerator();
        this.preparator = new AvaRbcPreparator();
        this.initialization();
    }
    initialization() {
        var _a;
        this.startInput = document.getElementById("rozsahOd");
        // this.endInput = document.getElementById("rozsahDo") as HTMLInputElement;
        this.startButton = document.getElementById("startButton");
        this.results = document.getElementById("vysledky");
        let neco = document.getElementById("setCheckbox");
        if (neco === null || neco === void 0 ? void 0 : neco.checked) {
            this.includeSet = true;
        }
        else {
            this.includeSet = false;
        }
        (_a = this.startButton) === null || _a === void 0 ? void 0 : _a.addEventListener(`click`, () => {
            console.log("Button inicialzovan");
            if (this.startInput) {
                this.start = parseInt(this.startInput.value);
                // this.end = parseInt(this.endInput.value);
                if (this.results) {
                    this.results.innerHTML = ``;
                    this.results.innerHTML = `<img src="img/loading.gif">`;
                }
                this.download(this.start);
            }
            console.log(this.start);
        });
    }
    // začne stahovat html string
    download(rbcNumber) {
        console.log("Manager starts download");
        // for (let i = this.start; i <= this.end; i++) {
        //vygenerujeme url
        let targetUrl = this.generator.generateUrl(rbcNumber);
        let proxyUrl = `${this.preUrl}/${targetUrl}`;
        console.log("Manager downloads: " + proxyUrl);
        //stáhneme html string stránky
        fetch(proxyUrl)
            .then(response => {
            if (response.ok) {
                return response.text();
            }
            else {
                throw new Error(`Error: ${response.status}`);
            }
        })
            .then(data => { this.prepareRbc(data, targetUrl); }).catch(error => { console.error(error); });
    }
    // příprava html stringu 
    prepareRbc(htmlString, targetUrl) {
        if (this.isValidForRbc(htmlString)) {
            console.log("Manager starts prepareRbc()");
            let rbc = this.preparator.prepare(htmlString, targetUrl);
            this.appendRbc(rbc);
        }
    }
    // připne vytvořené rbc do html
    appendRbc(rbc) {
        var _a, _b;
        console.log("Manager starts appendRbc()");
        //vymaže obsah výsledku
        if (this.results)
            this.results.innerHTML = "";
        //rbc exustuje (má foto)
        if (rbc.imageUrl) {
            let child = document.createElement("div");
            child.className = "m-2 card text-center";
            child.style.width = "300px";
            child.style.minWidth = "300px";
            let card = `<div">
                        <div> 
                            <img src="${rbc.imageUrl}" alt="${rbc.name}" class="img-fluid"> 
                        </div>
                        <div>
                            <div>
                               <a href="${rbc.url}" target="_blank" class="text-decoration-none" ><p>${rbc.name}</p></a>
                             <div>
                             <div>
                                 <p>Cena: ${rbc.price} Kč</p></a>
                                <p>Rozměry: ${rbc.size}</p></a>
                                <p>Váha: ${rbc.weight}</p></a>
                            <div>
                         </div>
                     </div>`;
            child.innerHTML = card;
            (_a = this.results) === null || _a === void 0 ? void 0 : _a.appendChild(child);
        }
        else {
            let child = document.createElement("div");
            child.className = "m-2 card text-center";
            child.style.width = "300px";
            child.style.minWidth = "300px";
            let card = `<div">
                            <div> 
                                 <img src="img/notFound.gif" class="img-fluid"> 
                            </div>
                        
                             <div>
                                 <p class="text-danger fw-bold">RBC nenalezeno</p>
                              <div>
                         </div>`;
            child.innerHTML = card;
            (_b = this.results) === null || _b === void 0 ? void 0 : _b.appendChild(child);
            `<img src="img/notFound.gif" class="img-fluid">`;
        }
    }
    //zkontroluje html string jestli není stejný jako defaultní => url s daným rbc existuje
    isValidForRbc(htmlString) {
        if (htmlString === this.uselesHtmlString || htmlString === "" || htmlString === undefined || htmlString === null) {
            console.log("Manager isValidForRbc - OK");
            return false;
        }
        console.log("Manager isValidForRbc - NotOK");
        return true;
    }
}
