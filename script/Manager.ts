import { AvaRbcPreparator } from "./AvaRbcPreparator.js";
import { AvaUrlGenerator } from "./AvaUrlGenerator.js";
import { Rbc } from "./Rbc.js";


export class Manager {

    private preUrl: string = 'https://cors-anywhere.herokuapp.com';        // url cors proxy
    private uselesHtmlString: string;                                       // defaultní html string - k porovnání jestli stranka existuje

    private results: HTMLElement | null;                                   // html element kde se budou zobrazovat výsledky
    private startInput: HTMLInputElement | null;
    // private endInput: HTMLInputElement | null;
    private startButton: HTMLElement | null;
    private start: number;                                                  // jaké číslo rbc se bude hledat

    // private end: number;                                                    // do jakého čísla rbc se bude hledat
    private includeSet: boolean;                                            // jestli se bude hledat včetně setů (existuje RBC a RBC SET)

    public generator: AvaUrlGenerator;                                      // instance třídy která generuje url adresy k prohledání
    public preparator: AvaRbcPreparator;                                   // instance třídy která vypreparuje vlastnosti rbc z html stringu

    constructor() {

        this.generator = new AvaUrlGenerator();
        this.preparator = new AvaRbcPreparator();
        this.initialization();
    }

    private initialization() {

        this.startInput = document.getElementById("rozsahOd") as HTMLInputElement;
        // this.endInput = document.getElementById("rozsahDo") as HTMLInputElement;
        this.startButton = document.getElementById("startButton");
        this.results = document.getElementById("vysledky");
        let neco = document.getElementById("setCheckbox") as HTMLInputElement;
        if (neco?.checked) {
            this.includeSet = true;
        }
        else {
            this.includeSet = false;
        }

        this.startButton?.addEventListener(`click`, () => {
            console.log("Button inicialzovan")
            if (this.startInput) {
                this.start = parseInt(this.startInput.value);
                // this.end = parseInt(this.endInput.value);

                if (this.results) {
                    this.results.innerHTML = ``;

                    this.results.innerHTML = `<img src="img/loading.gif">`;

                }
                this.download(this.start);
            }
            console.log(this.start)
        });
    }

    // začne stahovat html string
    private download(rbcNumber: number): void {
        console.log("Manager starts download")

        // for (let i = this.start; i <= this.end; i++) {

        //vygenerujeme url
        let targetUrl = this.generator.generateUrl(rbcNumber);
        let proxyUrl = `${this.preUrl}/${targetUrl}`;

        console.log("Manager downloads: " + proxyUrl)

        //stáhneme html string stránky
        fetch(proxyUrl)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => { this.prepareRbc(data, targetUrl) }).catch(error => { console.error(error); });


    }

    // příprava html stringu 
    private prepareRbc(htmlString: string, targetUrl: string): void {
        if (this.isValidForRbc(htmlString)) {
            console.log("Manager starts prepareRbc()");
            let rbc: Rbc = this.preparator.prepare(htmlString, targetUrl);
            this.appendRbc(rbc)
        }

    }

    // připne vytvořené rbc do html
    private appendRbc(rbc: Rbc) {
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
                     </div>`
            child.innerHTML = card;
            this.results?.appendChild(child);

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
                        
                             <div class="mt-2">
                                 <p class="text-danger fw-bold">RBC nenalezeno</p>
                              <div>
                         </div>`

            child.innerHTML = card;
            this.results?.appendChild(child);
               `<img src="img/notFound.gif" class="img-fluid">`;

        }

    }
    //zkontroluje html string jestli není stejný jako defaultní => url s daným rbc existuje
    private isValidForRbc(htmlString: string): boolean {
        if (htmlString === this.uselesHtmlString || htmlString === "" || htmlString === undefined || htmlString === null) {
            console.log("Manager isValidForRbc - OK");
            return false;
        }
        console.log("Manager isValidForRbc - NotOK");
        return true;
    }

}