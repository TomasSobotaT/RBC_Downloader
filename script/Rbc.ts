//objekt Rbc (ten jehož hodnoty se snažíme vypreparovat z Html stringu)
export class Rbc
{
    public imageUrl:string;
    public price:string;
    public name: string;
    public isSet:boolean;
    public weight:string;
    public size:string;
    public url:string;


    constructor(name:string,price:string,imageUrl:string,isSet:boolean,weight:string,size:string,url:string)
    {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.isSet = isSet;
        this.weight = weight;
        this.size = size;
        this.url = url;
    }

}