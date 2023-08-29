// generuje url pro AvaRbcDownlader
export class AvaUrlGenerator {
    constructor() {
        this.baseUrl = `http://www.avacom.cz/`;
    }
    generateUrl(rbcNumber) {
        "https://www.avacom.cz/avacom-rbc55--baterie-pro-ups";
        let url = `${this.baseUrl}avacom-rbc${rbcNumber}--baterie-pro-ups`;
        console.log("Generator generated url");
        return url;
    }
    generateUrlSet(rbcNumber) {
        return rbcNumber.toString();
    }
}
