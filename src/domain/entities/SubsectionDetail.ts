export interface SubsectionDetail {
    id?:number;
    name:string;
    code : number;
    customerAccountId : number;
    prepaidAccountReceivedId : number;
    aahAccountId : number;
    customerAccount? : any;
    prepaidAccountReceived ? : any;
    aahAccount? : any;
    typesOfAction?:any;
}