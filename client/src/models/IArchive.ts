export interface IArchive {
    _id: string;
    year: number;
    title: string;
    author: string;
    text: string;
    pictures:string[];
    data: FormData;
    isActual: boolean;
}