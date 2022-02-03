import { FC } from "react";
import { VideoProps } from "./types";
import classNames from 'classnames';


export const Video: FC<VideoProps> = ({poster}) => {
  
    return (
        <div className={classNames(
            'flex',            
            'w-full',            
            'bg-no-repeat',
            'bg-contain',
            'bg-center',                        
          )}  
          style={{backgroundImage: `url(${poster})`}}></div>
    )
}