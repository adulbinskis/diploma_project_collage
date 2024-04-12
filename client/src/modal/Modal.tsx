import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
    modalOpen: boolean;
};
const modalRoot = document.getElementById('portal')!;

const Modal: React.FC<Props> = ({ modalOpen, children }) => {
    if (!modalOpen) return null;

    return createPortal(
        <div className='modal-div'>{children}</div>,
        modalRoot
    );
};

export default Modal;
