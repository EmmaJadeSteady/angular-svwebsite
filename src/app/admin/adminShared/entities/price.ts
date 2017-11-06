export class Price{
    constructor(
        public noOfPages: number,
        public noOfCopies: number, 
        public price: number,
        public id?: string
    ){}
}