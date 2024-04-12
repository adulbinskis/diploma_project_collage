import React, {FC, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
// import {Context} from "../index";
import './News.css'
import ArchiveService from "../services/ArchiveService";
import ProjectService from "../services/ProjectService";
import {IArchive} from "../models/IArchive";
import { IProject } from "../models/IProject";
import InspectImage from "./InspectImage";
import Modal from "../modal/Modal";

const NewsThisYear: FC = () => {
    const[archive , setArchive] = useState<IArchive[]>([])
    const [projects , setProject] = useState<IProject[]>([])
    const [showImgModal, setShowImgModal] = React.useState(false);
    const [inspectImageUrl, setInspactImageUrl] = React.useState('');
   
    useEffect(() => {
        getArchive()
        getProjects()
    }, [])

    async function getArchive(){
        const response = await ArchiveService.getArchive()
        setArchive(response.data)
    }
    async function  getProjects(): Promise<void> {
        const respone = await ProjectService.getProject()
        console.log(respone)
        setProject(respone.data)
    }

    function openImg(url: string){
        setShowImgModal(true)
        setInspactImageUrl(url)
    }

    const filteredByIsActualArchive = archive.filter(archive => {
        return archive.isActual
    });

    const filteredByIsActualProject = projects.filter(projects => {
        return projects.isActual
    });

    return(
        <div className='news-main-container'>
            {filteredByIsActualProject.length!==0?
                <div className="news-archive-wrapper">
                <h1 className="news-archive-title">Projekti</h1>
                    { 
                        filteredByIsActualProject.map(project =>
                        <div key={project._id} className='news-container'>
                            <h2 className='news-title'> {project.title} </h2>
                            <big className='archive-text'>{project.text}</big>
                            <br/><br/>
                            <div className='news-picture-container'>
                                {
                                    project.pictures.map(pictures =>
                                        <img
                                            className='news-image'
                                            onClick={()=> openImg(process.env.REACT_APP_HOST_URL + pictures)}
                                            key={pictures}
                                            src={process.env.REACT_APP_HOST_URL + pictures}
                                            alt={'picturez'}
                                        />
                                    )
                                }
                            </div>
                            <h4>{project.year}</h4>
                            <h4 className='news-author'>{project.author}</h4>
                        </div>)
                    }   
                </div>: null
            }
            {filteredByIsActualArchive.length!==0?
              <div className="news-project-wrapper">
                <h1 className="news-project-title">Pasākumi</h1>
                {
                 filteredByIsActualArchive.map(archive =>
                    <div key={archive._id} className='news-container'>
                        <h2 className='news-title'> {archive.title} </h2>
                        <big className='archive-text'>{archive.text}</big>
                        <br/><br/>
                        <div className='news-picture-container'>
                            {
                                archive.pictures.map(pictures =>
                                    <img
                                        className='news-image'
                                        onClick={()=> openImg(process.env.REACT_APP_HOST_URL + pictures)}
                                        key={pictures}
                                        src={process.env.REACT_APP_HOST_URL + pictures}
                                        alt={'picturez'}
                                    />
                                )
                            }
                        </div>
                        <h4>{archive.year}</h4>
                        <h4 className='news-author'>{archive.author}</h4>
                    </div>)
                }
             </div>: null
            }
            
             
            
           
            
            <Modal modalOpen={showImgModal}>
                <InspectImage inspectImageUrl={inspectImageUrl} setShowModal={setShowImgModal}/>
            </Modal>
        </div>
    )
}

export default observer(NewsThisYear);