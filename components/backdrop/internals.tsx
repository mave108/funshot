import { FC } from "react";
import {BackdropProps} from './types';
import { Portal } from 'react-portal';

export const Backdrop:FC<BackdropProps> = ({show}) => {

    return (
        <>
            {show && <Portal>
                <div className="backdrop-blur-sm bg-white/30 w-full h-full fixed top-0 left-0 z-10"></div>
                </Portal>
            }
        </>
    )

    
}