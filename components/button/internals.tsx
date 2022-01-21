import { FC } from "react";
import { ButtonProps, ButtonTypes } from "./types";
import classNames from "classnames";

export const Button: FC<ButtonProps> = ({children, type, disabled = false}) => {

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
                'focus:ring-2', 
                'focus:ring-offset-2',
                'disabled:opacity-75',
                'disabled:bg-gray-200',  
                'disabled:cursor-not-allowed',
                {'bg-primary': type == ButtonTypes.PRIMARY},                              
            )}
        >
            {children}
        </button>
    )
}