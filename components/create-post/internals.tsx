import { FC, useEffect } from "react";
import { CreatePostProps } from "./types";
import { VideoCard } from "../video-card";
import axios from '../../utils/axios';

export const CreatePost: FC<CreatePostProps> = ({}) => {
    useEffect (()=> {       
        document.addEventListener('submitFunShot', function (e) { 
            axios.post('/upload')
        }, false);
      });
    return (
        <VideoCard shimmer img="" tags={[{id: '123', 'name': 'twitter'}, {id: '123', 'name': 'twitter'}]} />
    )
}