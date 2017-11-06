export class MatchSummary{
    constructor(
        public fixtureDate: Date,
        public opposition: string, 
        public comment: string,
        public id?: string
    
    ){}
}