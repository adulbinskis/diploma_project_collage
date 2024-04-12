import { StringDecoder } from "string_decoder";

export interface PersonModel {
    _id: string;
    name: string;
    surname: string;
    pCode: string;
    phone: string;
    group: number;
    date: string;
    month: number;
    parish: string;
    address: string;
    birthDay: string;
    birthDayMonth: number;
    inventory: [];
}