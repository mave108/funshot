import { FC, Fragment, useRef, useState } from "react";
import { ModalProps } from "./types";
import { Dialog, Transition } from '@headlessui/react';
import { Backdrop } from "../backdrop";

export const Modal:FC<ModalProps> = ({title, show,children, backdrop, overlay, close}) => {

    let completeButtonRef = useRef(null)
    let [showCloseIcon, toggleCloseIcon] = useState<boolean>(false);

    return (
        <Transition
      show={show}
      appear 
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
    <Dialog
      as='div'
      initialFocus={completeButtonRef}
      onClose={close}
      className="fixed z-20 inset-0 overflow-y-auto"      
    >
         {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" /> */}
         {overlay && <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child> } 
        {backdrop && <Backdrop show />}
        <div className="min-h-screen px-4 text-center">                               
        <div className="inline-block relative w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
            {title && <Dialog.Title className='text-lg leading-6 font-medium text-gray-500'>{title}</Dialog.Title>}            
            <button onClick={close} className="absolute py-1 right-6 top-6 bg-white text-xs font-light text-gray-900 px-2 rounded-md shadow-sm border">ESC</button>
            <div className="flex w-full">
                {children}
            </div>          
      </div>
      </div>    
    </Dialog>    
    </Transition>
  )
}
    