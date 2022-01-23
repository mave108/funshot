import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { ChipProps, ChipType } from "./types";
import { time } from "console";

export const Chip: FC<ChipProps> = ({
    text, 
    pulse = false, 
    hoverText, 
    onClick = () => {}, 
    bounce = false, 
    chipType = ChipType.DEFAULT,
    timeout = 4000,
    autoHide = false,
    children,
    ...props
 }) => {
   let [remove, setRemoved] = useState<boolean>(false);
    useEffect(()=> {
        if (autoHide) {
            setTimeout (() => {setRemoved(true)}, timeout);
        }
    })
    
    return (
        <>
        {! remove && (
            <span className={classNames(
                'px-2 py-[0.5rem]',
                'rounded-full',                        
                'font-semibold',
                'text-sm',
                'flex',
                'align-center',
                'w-max',
                'cursor-pointer',
                'active:bg-gray-300',
                'transition',
                'duration-300',
                'relative',
                {'text-white' : chipType == ChipType.PRIMARY},
                {'bg-primary': chipType == ChipType.PRIMARY},
                {'hover:bg-blue-700': chipType == ChipType.PRIMARY},
                {'text-gray-400' : chipType == ChipType.DEFAULT},
                {'text-white' : chipType == ChipType.WARNING},
                {'bg-orange-600': chipType == ChipType.WARNING},
                {'hover:bg-orange-500': chipType == ChipType.WARNING},
                {'text-gray-400' : chipType == ChipType.DEFAULT},
                {'bg-gray-100': chipType == ChipType.DEFAULT},
                {'hover:bg-gray-200': chipType == ChipType.DEFAULT},              
                'ease',
                {'animate-bounce': bounce}            
    
            )}                                                                   
                onClick={onClick}
                title={hoverText}
                {...props}
                >
                {children} {text}
                {pulse && <Pulse />}
            </span>
        )}
        </>
        
    )
}

export const Pulse = () => {
  
    return (
        <span className="flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary "></span>
        </span>
    )
}