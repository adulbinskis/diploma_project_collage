import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import './InspectImage.css'

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    inspectImageUrl: string;

}

const InspectImage: FC<Props> = ({ setShowModal, inspectImageUrl}) => {


    function onCloseAnimation(){
        let ini = document.querySelector('#edit-window');
        if(ini){
            ini.classList.add("hideImageModal");
        }
        setTimeout(() => {
            setShowModal(false)
        }, 500)

    }




    return(
        <div id='edit-window' className='inspect-image-overlay'>
            <img className='inspect-image' src={inspectImageUrl} alt={'inspImg'}/>
            <button className='inspect-close-button' onClick={()=>onCloseAnimation()}> X </button>
        </div>
    );
};

export default observer(InspectImage);