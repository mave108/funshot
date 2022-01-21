import { FC } from "react";
import { ProgressbarProps } from "./types";

export const Progressbar: FC<ProgressbarProps> = ({progress}) => {

    return (
        <div className="w-full bg-gray-200 h-2 rounded-md">
            <div className="bg-blue-600 h-2 rounded-md" style={{width: progress+'%'}}></div>
        </div>

    )
}