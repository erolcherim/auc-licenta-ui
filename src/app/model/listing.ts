import { Bid } from "./bid";

export interface Listing{
    id:string;
    userId:string;
    name:string;
    description:string;
    startingPrice:number;
    currentPrice:number;
    bids:Bid[];
    isActive:number;
    createdDate:Date;
    activatedDate:Date;
    expirationDate:Date;
  }