import { FC } from "react";
import { TextFieldProps } from "./types";

export const TextField: FC<TextFieldProps> = ({name, placeholder, defaultValue, disabled = false, onChange}) => {

    return (
        <input 
         name={name}
         defaultValue={defaultValue}
         disabled={disabled}
         className='text-xl text-gray-500 focus:outline-none w-full disabled:cursor-not-allowed' 
         placeholder={placeholder} 
         onChange={onChange}
        />
    )
}