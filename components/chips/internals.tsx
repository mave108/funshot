import { FC } from "react";
import { ChipProps } from "./types";

export const Chip: FC<ChipProps> = ({text}) => {

    return (
        <span className="px-4 py-2 rounded-full text-gray-400 bg-gray-100 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
            {text}
        </span>
    )
}