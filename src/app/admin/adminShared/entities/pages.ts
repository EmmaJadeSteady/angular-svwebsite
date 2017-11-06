export class Pages{
    constructor(
        public pageNumber: number,
        public pageName: string, 
        public extra: boolean = false,
        public img?: any,
        public id? : string
    ){}
}