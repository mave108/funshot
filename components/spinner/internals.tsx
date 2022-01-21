import { FC } from "react";
import { SpinnerProps } from "./types";

export const Spinner: FC<SpinnerProps> = ({text}) => { 

    return (
        <div className="rounded-md text-gray-900">
           <svg className='animate-spin h-5 w-5 mr-3 spinner-border border-2 inline rounded-full' viewBox="0 0 24 24"></svg>
            {text}
        </div>
    )
}
