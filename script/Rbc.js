//objekt Rbc (ten jehož hodnoty se snažíme vypreparovat z Html stringu)
export class Rbc {
    constructor(name, price, imageUrl, isSet, weight, size, url) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.isSet = isSet;
        this.weight = weight;
        this.size = size;
        this.url = url;
    }
}
