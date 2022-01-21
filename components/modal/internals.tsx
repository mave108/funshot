import { FC, Fragment, useRef } from "react";
import { ModalProps } from "./types";
import { Dialog, Transition } from '@headlessui/react'

export const Modal:FC<ModalProps> = ({title, show,children}) => {

    let completeButtonRef = useRef(null)

    return (
        <Transition
      show={show}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
    <Dialog
      initialFocus={completeButtonRef}
      onClose={()=> {}}
      className="fixed z-20 inset-0 overflow-y-auto"
    >
      {title && <Dialog.Title>{title}</Dialog.Title>}
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
      
      <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      </Transition.Child>
    </Dialog>
    </Transition>
  )
}
    