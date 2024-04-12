import $api from "../http";
import {AxiosResponse} from 'axios';
import {PersonModel} from "../models/PersonModel";
import {selectedParams} from '../models/SelectedParams'

export default class PersonService {
    static async create(name: string, surname: string, pCode: string, phone: string, group: string, parish:string, address: string, date: string, month: number, birthDay:string, birthDayMonth:number): Promise<AxiosResponse<PersonModel[]>> {
        // console.log(birthDayMonth)
        return $api.post<PersonModel[]>('/create-person', {name, surname, pCode, phone, group, parish, address, date, month, birthDay, birthDayMonth})
    }

    static async deletePerson(pCode :string): Promise<AxiosResponse<PersonModel[]>> {
        return $api.post<PersonModel[]>('/delete-person', {pCode})
    }

    static async editPerson(name: string, surname: string, newPersCode: string, persCode: string, phone: string, group: number, parish: string, address: string, date: string, birthDay:string): Promise<AxiosResponse<PersonModel[]>> {
        return $api.post<PersonModel[]>('/edit-person', {name, surname, newPersCode, persCode, phone, group, parish, address, date, birthDay})
    }

    static async createInventory(pCode: string, inventory: string[]): Promise<AxiosResponse<PersonModel[]>> {
        return $api.post<PersonModel[]>('/add-iem-to-person', {pCode, inventory})
    }

    static async deleteInventory(pCode: string, inventory: string): Promise<AxiosResponse<PersonModel[]>> {
        return $api.post<PersonModel[]>('/delete-iem-from-person', {pCode, inventory})
    }


    static fetchPersonsWithParams(selectedParams: selectedParams[]): Promise<AxiosResponse<PersonModel[]>> {
        return $api.get<PersonModel[]>('/fetch-person-by-select',{ params: { selectedParams: selectedParams } })
    }

    static fetchPersonsSearch(search: string): Promise<AxiosResponse<PersonModel[]>> {
        return $api.get<PersonModel[]>('/fetch-person-search',{ params: { search: search } })
    }

}
