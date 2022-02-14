import { FC, useState, useRef, useEffect } from "react";
import { VideoProps } from "./types";
import classNames from 'classnames';
import {PlayIcon} from '@heroicons/react/outline';
// import Image from 'next/image';

export const Video: FC<VideoProps> = ({poster, video}) => {
    const [isVideoLoaded, setVideoLoaded] = useState<boolean>(false);
    // const [isViewPort, updateInViewPortStatus] = useState<boolean>(false);

    const videoref = useRef(null);
   
    useEffect(() => {
        let options = {                        
            threshold: 0
          }
        let observer = new IntersectionObserver((entries) => {
            const { isIntersecting } = entries[0]; 
            if(!isIntersecting ) {
                setVideoLoaded(false);
            }        
        },options);
        if (videoref && videoref.current) {            
            observer.observe(videoref.current);
        }        
    }, []);

    return (
        <div className={classNames(
            'flex',            
            'w-full',            
            'bg-no-repeat',
            'bg-contain',
            'bg-center',  
            'justify-center',
            'relative',                                  
          )}  
          ref={videoref}
          >
                {/* <Image alt="" src={poster} priority layout="intrinsic" height={320} width={400}/> */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {!isVideoLoaded && <img src={poster} alt="" height="320px"/>}
                {!isVideoLoaded && <div className='absolute rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 px-2 cursor-pointer' ><PlayIcon 
                onClick={()=> setVideoLoaded(true)} 
                className='h-20 text-primary'/></div>}
                {isVideoLoaded && <video height="320" width="570" controls autoPlay={true} >
                    <source src={video} type="video/mp4" />
                </video>}
          </div>
    )
}