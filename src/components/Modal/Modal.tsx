import { CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
    open: boolean,
    title?: ReactNode,
    children?: ReactNode,
    header?: boolean,
    footer?: ReactNode | false,
    closable?: boolean,
    width?: number,
    onClose?: ()=>void,
    onOk?: ()=>void,
    maskClosable?: boolean,
    modalHeaderStyles?: CSSProperties,
    modalHeaderClassName?: string,
    modalBodyStyles?: CSSProperties,
    modalBodyClassName?: string,
    modalFooterStyles?: CSSProperties,
    modalFooterClassName?: string,
}

export function Modal(props: ModalProps) {
    const { 
        open, 
        children=<></>, 
        title=<></>, 
        header=true,
        footer, 
        closable=true, 
        width=416, 
        onClose=()=>{}, 
        onOk=()=>{}, 
        maskClosable=true, 
        modalHeaderStyles={},
        modalHeaderClassName='',
        modalBodyStyles={},
        modalBodyClassName='',
        modalFooterStyles={},
        modalFooterClassName='',
    } = props;

    return (
        <>
            {open && createPortal(
                <>
                    <span className={classes.mask} onClick={maskClosable ? onClose : ()=>{}}/>
                    <dialog className={classes.modal} style={{ width }}>

                        {header &&
                            <header className={`${classes.modalHeader} ${modalHeaderClassName}`} style={modalHeaderStyles}>
                                <h2>{title}</h2>
                                {closable ? <button className={classes.closeBtn} onClick={onClose}>X</button> : <></>}
                            </header>
                        }

                        <div className={`${classes.modalBody} ${modalBodyClassName}`} style={modalBodyStyles}>
                            {children}
                        </div>

                        {footer !== false &&
                            <footer className={`${classes.modalFooter} ${modalFooterClassName}`} style={modalFooterStyles}>
                                {footer ? footer : 
                                    <>
                                        <button className={classes.cancelBtn} onClick={onClose}>Cancel</button>
                                        <button className={classes.okBtn} onClick={onOk}>OK</button>
                                    </>
                                }
                            </footer>
                        }
                    </dialog>
                </>
            , document.body)}
        </>
    );
}
