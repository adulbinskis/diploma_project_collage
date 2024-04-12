import $api from "../http";
import {AxiosResponse} from 'axios';
// import {IFile} from "../models/IFile";
// import {selectedParams} from '../models/SelectedParams'

export default class FileService {
    // static async saveFile(name: string,year: number, files: FormData): Promise<AxiosResponse<IFile[]>> {
    //     return $api.post<IFile[]>('/save-file', {name, year, files})
    // }
    static async saveFile(name: string,year: number, files: FormData): Promise<AxiosResponse> {
        return $api.post('/save-file', files,{
            headers:{
                'content-type': 'multipart/form-data'
            },
            params: {
                year
            }
        })
    }


    // static fetchPersonsSearch(search: string): Promise<AxiosResponse<PersonModel[]>> {
    //     return $api.get<PersonModel[]>('/fetch-person-search',{ params: { search: search } })
    // }

}
