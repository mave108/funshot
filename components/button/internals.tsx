import { FC } from "react";
import { ButtonProps, ButtonTypes } from "./types";
import classNames from "classnames";

export const Button: FC<ButtonProps> = ({children, type, disabled = false, ...props}) => {

    return (
        <button
            type="submit"
            disabled={disabled}
            className={classNames(
                'inline-flex', 
                'justify-center', 
                'py-2', 'px-4', 
                'border', 
                'border-transparent', 
                'shadow-sm', 
                'text-sm', 
                'font-medium', 
                'rounded-md', 
                'text-white', 
                'focus:outline-none',                 
                'disabled:opacity-75',
                'disabled:bg-gray-200',  
                'disabled:cursor-not-allowed',
                {'text-white' : type == ButtonTypes.PRIMARY},
                {'bg-primary': type == ButtonTypes.PRIMARY},
                {'hover:bg-blue-700': type == ButtonTypes.PRIMARY},
                {'text-gray-400' : type == ButtonTypes.DEFAULT},
                {'text-white' : type == ButtonTypes.WARNING},
                {'bg-orange-600': type == ButtonTypes.WARNING},
                {'hover:bg-orange-500': type == ButtonTypes.WARNING},
                {'text-gray-400' : type == ButtonTypes.DEFAULT},
                {'bg-gray-100': type == ButtonTypes.DEFAULT},
                {'hover:bg-gray-200': type == ButtonTypes.DEFAULT},                                            
            )}
            {...props}
        >
            {children}
        </button>
    )
}