import { Rbc } from "./Rbc.js";
//prohledá html string a vypreparuje hodnoty pro novou instanci objektu Rbc
export class AvaRbcPreparator {
    prepare(htmlString, rbcUrl) {
        console.log("Preparator starts prepare url");
        let rows = htmlString.split("\n");
        let imageUrl = "";
        let price = "";
        let name = "";
        let isSet = false;
        let weight = "";
        let size = "";
        for (let item of rows) {
            if (item.includes("<title>")) //nazev            <title>AVACOM RBC5 - baterie pro UPS - AVA-RBC5 | AVACOM - baterie &amp; akumulátory</title>            {
             {
                let str = item.replace("<title>", "").split("- baterie pro UPS -");
                name = str[0].trim();
            }
            if (item.includes("data-title")) //url obrazku      <a href="https://www.avacom.cz/images/full/ava-rbc4_a.jpg" data-lightbox="product" data-title="AVACOM RBC4 - baterie pro UPS">
             {
                let str = item.replace(`<a href="`, "").split(`" data-lightbox`);
                imageUrl = str[0].trim();
            }
            if (item.includes("DPH</span><br>")) //hledani ceny     1&nbsp;591,00 Kč<span class="vat"> s DPH</span><br>
             {
                let str = item.trim().replace("&nbsp;", "").split("Kč");
                price = str[0].trim();
            }
            if (item.includes("Rozměry:")) //rozměry           Rozměry: 151 x 98 x 93mm<br />
             {
                let str = item.trim().replace("<br />", "").replace("Rozměry:", "");
                size = str.trim();
            }
            if (item.includes("Váha:")) //váha
             {
                let str = item.trim().replace("<br />", "").replace("Váha", "");
                weight = str.trim();
            }
        }
        console.log("Preparator prepared url and return rbc");
        return new Rbc(name, price, imageUrl, isSet, weight, size, rbcUrl);
    }
}
