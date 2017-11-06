export class Order{
    constructor(
        public username: string,
        public email: string,
        public selectedPageBundle: string,
        public selectedCopiesBundle: string, 
        public price: number,
        public clubName: string, 
        public teamName: string,
        public clubLogo: any,
        public sponsor: any,
        public statisticsSource: any,
        public resultsSource: any,
        public matchTypes: Array<string>,
        public battingAverages: Array<string>,
        public bowlingAverages: Array<string>,
        public extraPages: Array<any>,
        public id? : string
    ){}
}