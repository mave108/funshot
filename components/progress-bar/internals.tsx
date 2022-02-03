import { FC } from "react";
import classNames from "classnames";
import { ProgressbarProps, ProgressbarType } from "./types";

export const Progressbar: FC<ProgressbarProps> = ({progress, type = ProgressbarType.PRIMARY}) => {

    return (
        <div className={
            classNames(
                'w-full',
                'h-2',
                'rounded-md',
                'bg-gray-300'                                
            )}
        >
            <div className={
                classNames(
                    'h-2',
                    'rounded-md',
                    {'bg-primary': type === ProgressbarType.PRIMARY},
                    {'bg-orange-500': type === ProgressbarType.WARNING},
                    {'bg-green-500': type === ProgressbarType.SUCCESS},
                    {'bg-red-500': type === ProgressbarType.ERROR}

                )}
                style={{width: progress+'%'}}></div>
        </div>

    )
}