import React, {FC, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import './Archive.css'
import ArchiveService from "../services/ArchiveService";
import {IArchive} from "../models/IArchive";
import {Context} from "../index";
import Modal from "../modal/Modal";
import InspectImage from "./InspectImage";



const Archive: FC =()=> {
    const {store} = useContext(Context);

    const [archive, setArchive] = useState<IArchive[]>([])

    const [selectedYear , setSelectedYear] = useState<number>()
    const [selectedTitle , setSelectedTitle] = useState('')

    const [isEditText, setIsEditText] = useState(false)
    const [editedText, setEditedText] = useState('')
    const [editedID, setEditedID] = useState('')

    const [images, setImages] = useState<File[]>([]);

    const [showImgModal, setShowImgModal] = React.useState(false);
    const [inspectImageUrl, setInspactImageUrl] = React.useState('');

    // const [isActual, setIsActual] = useState<boolean>(false)


    let i = 0


    useEffect(() => {
        getArchive()
        // store.checkAuth()
    }, [])



    const seen = new Set();

    const filteredDuplicate = archive.filter(archive => {
        // check if the current brand is a duplicate
        const isDuplicate: boolean = seen.has(archive.year);
        // add the current brand to the Set
        seen.add(archive.year);
        // filter() returns the brand when isDuplicate is false
        return !isDuplicate;
    });

    const filteredYear = archive.filter(archive => {
        return archive.year === selectedYear;
    });

    const filteredYearAndTitle = filteredYear.filter(filteredYear => {
        return  filteredYear.title === selectedTitle
    })


    async function getArchive(): Promise<void> {
        const respone = await ArchiveService.getArchive()
        console.log(respone)
        setArchive(respone.data)
    }
    async function deleteArchive(id: string){
        if(selectedYear)
        await ArchiveService.deleteArchive(id, selectedYear, selectedTitle)
        await getArchive()
    }

    async function handleSave(){
       await ArchiveService.editArchiveText(editedText, editedID)
        setIsEditText(false)
        await getArchive()
    }

    function handleEdit(text: string, id: string){
        setEditedID(id)
        setEditedText(text)
        setIsEditText(true)
    }

    async function deleteImage(picture: string, archiveId: string){
        console.log(picture+'&&'+ archiveId)
        await ArchiveService.deleteArchivePicture(picture, archiveId)
        await getArchive()
    }

    function handleSaveImgLocal(e:  React.ChangeEvent<HTMLInputElement>){
        let files = (e.target as HTMLInputElement).files
        if (files && files.length > 0)
            setImages([...images, files[0]])
    }


    async function handleSaveToServer(year: number, title: string){
        const data = new FormData()
        for (let i = 0; i < images.length; i++) {
            data.append('images', images[i])

        }

        clearImageStorage()

        await ArchiveService.saveImage(data, year, title)
        await getArchive()
    }

    function clearImageStorage(){
        setImages([])
    }

    function openImg(url: string){
        setShowImgModal(true)
        setInspactImageUrl(url)
    }

    async function changeActuality(id: string, actuality: boolean){
        await ArchiveService.changeActuality(id, actuality)
        await getArchive()
    }
 

    return(
        <div className='archive-container'>
            <h1 className="archive-title">Pasākumu albums </h1>

            <div className="archive-select-year-container">
                {filteredDuplicate.map(filtered => 
                    <div 
                        className="archive-select-unit" 
                        onClick={()=>setSelectedYear(filtered.year)} 
                        key={filtered.title + Date.now()}> 
                        
                        {filtered.year} 
                    </div>)
                }

            </div>
            <div className="archive-select-title-container">
            {filteredYear.map(title => 
                    <div
                        className="archive-pre-container"
                        onClick={()=>setSelectedTitle(title.title)}  
                        key={title.title + Date.now()}>
                        <img className="archive-pre-img" src={process.env.REACT_APP_HOST_URL + title.pictures[0] }/>
                        <div className="archive-pre-title">{title.title} </div>
                    </div>)
                }
            </div>
                
            
            <br/>
            {filteredYearAndTitle.length !== 0?
                <div className={'filtred-container'}>
                    {store.isAuth?
                        <button className='archive-delete-button' onClick={()=>deleteArchive(filteredYearAndTitle[0]._id)}> Izdzēst!! </button>: null
                    }
                    {
                        filteredYearAndTitle.map(title =>
                            <h2 className="archive-second-title" key={title.title + Date.now()}>
                                {title.title}
                            </h2>
                        )
                    }
                    <br/>
                    {isEditText?
                        <div>
                            <textarea className='archive-textarea' value={editedText} onChange={(e)=>setEditedText(e.target.value)}/>
                            <br/>
                            <button className={'archive-button'} onClick={()=> handleSave()}> Saglabāt </button>
                        </div>
                        :
                        <div className='archive-text-container'>
                            {filteredYearAndTitle.map(text =>
                                <big key={text.title + Date.now()}>
                                    {text.text}
                                    <br/>
                                    {store.isAuth ?
                                        <div className='archive-edit-text'>
                                            <button className='archive-button' onClick={()=> handleEdit( text.text, text._id)}> Labot </button>
                                        </div> : null
                                    }
                                </big>)
                            }
                        </div>
                    }
                    <br/> <br/>
                    <div className='picture-container'>
                        {
                            filteredYearAndTitle[0].pictures.map(picture =>
                                <div key={filteredYearAndTitle[0].pictures[i++]}>
                                    <img
                                        className='archive-img'
                                        onClick={()=> openImg('http://localhost:5000/' + picture)}
                                        src={'http://localhost:5000/' + picture} alt={'picturez'}
                                    />
                                    {store.isAuth ?
                                        <button className='archive-delete-button' onClick={async () => {
                                            await deleteImage(picture, filteredYearAndTitle[0]._id)
                                        }}> Izdzēst </button> : null
                                    }
                                </div>
                            )
                        }
                    </div>
                    {
                        images.map(images => <div key={i++}> {images.name} </div>)
                    }
                    {store.isAuth?
                        <div className='upload-container'>
                            <input className='archive-upload-input' type='file' onChange={e =>  handleSaveImgLocal(e) }/>
                            <button className='archive-button' onClick={async ()=> await handleSaveToServer(filteredYearAndTitle[0].year, filteredYearAndTitle[0].title)}> saglabāt </button>
                        </div>: null
                    }
                    <h4 className={'archive-author'}> {filteredYearAndTitle.map(author=>
                        <div key={author.title + Date.now()}>
                            {author.author}
                        </div>)}
                    </h4>

                    {store.isAuth?
                        <div className={'isActual-archive-container'}>
                            <h3> Pievienot pie aktualitātēm</h3>
                            <input
                                type={'checkbox'}
                                checked={filteredYearAndTitle[0].isActual}
                                onChange={()=> changeActuality(filteredYearAndTitle[0]._id, !filteredYearAndTitle[0].isActual)}
                            />
                        </div> : null
                    }
                </div>: null
            }
            <Modal modalOpen={showImgModal}>
                <InspectImage inspectImageUrl={inspectImageUrl} setShowModal={setShowImgModal}/>
            </Modal>
        </div>
    )
}
export default observer(Archive)