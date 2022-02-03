import { FC, useEffect, useState, useMemo } from "react";
import { CreatePostProps } from "./types";
import { VideoCard } from "../video-card";
import { PostData } from '../post';
import axios from '../../utils/axios';
import { Progressbar, ProgressbarType } from '../progress-bar';

export const CreatePost: FC<CreatePostProps> = ({}) => {
   
    let [isShimmer, updateShimmerStatus] = useState<boolean>(false);
    let [uploadPercentage, setUploadPercentage] = useState<number>(0);

    useEffect (()=> {       
        document.addEventListener('submitFunShot', async (e: any) => { 
            //display shimmer
            updateShimmerStatus(true);
            try {
            const {  tags = [], video, title, description} = e.detail as PostData;            
            let tagsToSave: string[] = [];
            const newTags: PostData['tags'] = [];            
            //filter new tags            
            tags.forEach((tag) => {
                if (tag.isNew) {
                    newTags.push(tag);
                } else {
                    tagsToSave.push(tag.id);
                }

            });                                
            if (newTags.length > 0) {
                //create new tags 
                const tagPayload = newTags.map((tag) => tag.name);
                const tagResp = await (await axios.post('/tags',tagPayload)).data;
                tagsToSave = [...tagsToSave, ...tagResp.data.tags]
                
            }
            //upload video file
            console.log("onSubmit tags", tags, newTags,tagsToSave);
            const fileData = new FormData();
            fileData.append('video', video);
            const uploadedStatue = await (await axios.post('/upload', fileData, {
                timeout: 60000,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: any) => {
                    console.log("upload progress", progressEvent);
                  setUploadPercentage(
                    Math.round(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                  );
                }
            })).data;
        //save post
        console.log("upload resp", uploadedStatue);
        if (uploadedStatue.statusCode = '200'){
            axios.post('/post', {
                title,
                description,
                tags: tagsToSave,
                media_id: uploadedStatue.data.media.media_id,
                s3_url: uploadedStatue.data.media.s3_url,
                uid: 119
             }).then((data) => {
                console.log("post resp", data.data.data.post)
                 //emit event of new post
                 const evt =  new CustomEvent("newPostAdded", {
                    "bubbles":true, 
                    "cancelable":false,
                    detail: data.data.data.post
                });
                document.dispatchEvent(evt);   
                updateShimmerStatus(false);
             })
        }         
        } catch (e) {
            updateShimmerStatus(false);
            console.log("error", e);
        }
        }, false);
      }, []);
    
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