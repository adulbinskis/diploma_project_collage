import $api from "../http";
import {AxiosResponse} from 'axios';
import {IArchive} from "../models/IArchive";

export default class ArchiveService {
    static async createArchive(year: number, title: string, author: string, text: string, isActual: boolean): Promise<AxiosResponse<IArchive[]>> {
        return $api.post<IArchive[]>('/create-archive', {year, title, author, text, isActual})
    }
    static async saveImage(data: FormData, year: number, title: string): Promise<AxiosResponse> {
        return $api.post('/create-archive-image', data,{
            headers:{
                'content-type': 'multipart/form-data'
            },
            params: {
                year,
                title
            }
        })
    }
    static async deleteArchive(id: string, year: number, title: string): Promise<AxiosResponse<IArchive[]>> {
        return $api.post<IArchive[]>('/delete-archive', {id, year, title})
    }

    static async editArchiveText(text: string, id: string): Promise<AxiosResponse<IArchive[]>> {
        return $api.post<IArchive[]>('/edit-archive-text', {text, id})
    }

    static async deleteArchivePicture( picture: string, archiveId: string): Promise<AxiosResponse<IArchive[]>> {
        return $api.post<IArchive[]>('/delete-archive-picture', {picture, archiveId})
    }

    static async changeActuality( id: string, isActual: boolean): Promise<AxiosResponse<IArchive[]>> {
        return $api.post<IArchive[]>('/change-archive-actuality', {id, isActual})
    }
    static getArchive(): Promise<AxiosResponse<IArchive[]>> {
        return $api.get<IArchive[]>('/get-archive-text')
    }
}