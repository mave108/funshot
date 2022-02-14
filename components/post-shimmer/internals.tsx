import { FC, useEffect, useState, useMemo } from "react";
import { CreatePostProps } from "./types";
import { VideoCard } from "../video-card";
import { Progressbar, ProgressbarType } from '../progress-bar';

export const PostShimmer: FC<CreatePostProps> = ({}) => {
   
    let [isShimmer, updateShimmerStatus] = useState<boolean>(false);
    let [uploadPercentage, setUploadPercentage] = useState<number>(0);

    useEffect (()=> {       
        document.addEventListener('submitFunShot', async (e: any) => { 
            //display shimmer
            updateShimmerStatus(true);         
        }, false);
        document.addEventListener('newPostAdded', async (e: any) => { 
            //hide shimmer
            updateShimmerStatus(false);         
        }, false);
      }, [isShimmer]);
    
    const VideoProgress = () => {
        const progressType = useMemo((): ProgressbarType => {
           if (uploadPercentage < 20) {
               return ProgressbarType.WARNING;
           } else if (uploadPercentage > 20 && uploadPercentage < 70) {
               return ProgressbarType.PRIMARY;
           } else {
               return ProgressbarType.SUCCESS;
           }           
        }, [uploadPercentage]);
        return (
            <div className="absolute flex justify-center items-center h-full w-full p-4">
                <Progressbar                 
                progress={uploadPercentage} 
                type={progressType} />
            </div>
        )
    }
    
    return (
        <>
        {isShimmer && <VideoCard 
            id="123"
            shimmer 
            img="" 
            tags={[{id: '123', 'name': 'twitter'}, {id: '456', 'name': 'twitter'}]}
            >
                <VideoProgress />
            </VideoCard>
        }
        </>
        
    )
}