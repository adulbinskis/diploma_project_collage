import $api from "../http";
import {AxiosResponse} from 'axios';
import {IProject} from "../models/IProject";

export default class ProjectService {
    static async createProject(year: number, title: string, author: string, text: string, isActual: boolean): Promise<AxiosResponse<IProject[]>> {
        return $api.post<IProject[]>('/create-project', {year, title, author, text, isActual})
    }
    static async saveImage(data: FormData, year: number, title: string): Promise<AxiosResponse> {
        return $api.post('/create-project-image', data,{
            headers:{
                'content-type': 'multipart/form-data'
            },
            params: {
                year,
                title
            }
        })
    }
    static async deleteProject(id: string, year: number, title: string): Promise<AxiosResponse<IProject[]>> {
        return $api.post<IProject[]>('/delete-project', {id, year, title})
    }

    static async editProjectText(text: string, id: string): Promise<AxiosResponse<IProject[]>> {
        return $api.post<IProject[]>('/edit-project-text', {text, id})
    }

    static async deleteProjectPicture( picture: string, archiveId: string): Promise<AxiosResponse<IProject[]>> {
        return $api.post<IProject[]>('/delete-project-picture', {picture, archiveId})
    }

    static async changeActuality( id: string, isActual: boolean): Promise<AxiosResponse<IProject[]>> {
        return $api.post<IProject[]>('/change-project-actuality', {id, isActual})
    }
    static getProject(): Promise<AxiosResponse<IProject[]>> {
        return $api.get<IProject[]>('/get-project-text')
    }
}