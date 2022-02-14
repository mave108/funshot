import React, { FC, useState, useEffect, useCallback } from "react";
import { PostProps, Tag } from "./types";
import { Chip, ChipType } from "../chips";
import {PaperClipIcon, CloudUploadIcon} from '@heroicons/react/outline';
import { Button, ButtonTypes } from "../button";
// import { Progressbar } from "../progress-bar";
import { TextField } from "../text-field";
import Fuse from 'fuse.js';
import axios from '../../utils/axios';
import {v4 as uuid4} from 'uuid';
import { ExecuteOne } from "../../utils/genral";
import { PostData } from '../post-form';

export const PostForm:FC<PostProps> = ({}) => {
    let [typedTag, updateTypedTag] = useState<string>();
    let [video, setVideoFile] = useState<Blob>();
    let [fileName, setFileName] = useState<string>('');
    let [tags, updateTags] = useState<Tag[]>([]);
    let [selectedTags, updateSelectedTags] = useState<Tag[]>([]);
    let [suggestedTags, updateSuggestedTags] = useState<Tag[]>([]);
    let [bounceOnce, setBounceState] = useState<boolean>(true);
    let [tagError, updateTagError] = useState<boolean>(false);   
    let [title, updateTitle] = useState<string>(); 
    let [description, updateDescription] = useState<string>(); 


    useEffect(()=> {
      axios.get('tags').
      then(({data}) => {     
          const aditionalProps = [...data.data.tags].map((tag) => ({...tag, alert: true}))    
         updateTags(aditionalProps);       
      });      
    }, [])
  
    const autoSuggestTags = (e: React.ChangeEvent<HTMLInputElement>) => {        
        const { value } = e.target;                
        const fuse = new Fuse(tags, {keys: ['name'], includeScore: true, minMatchCharLength: 3})
        const serachResult = fuse.search(value).map(({item}) => ({...item}));        
        updateSuggestedTags(serachResult);
        updateTypedTag(value);
        //set alert false
        // console.log("source tag", fuse.search(value));
        // bounceOnce && setTimeout(() => updateSuggestedTags([...suggestedTags].map((tag) => ({...tag,alert: false}))), 4000);        
        ExecuteOne()(() => setTimeout(() => {setBounceState(false)}, 4000));
    }

    const fileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { files = []} = e.target;
        if ( files && files.length > 0) {
            setFileName(files[0].name);
            setVideoFile(files[0]);
        }                    
    },[]);

    const addNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {     
        e.stopPropagation();   
        e.preventDefault();
        //on enter add new tag to the selected
        if (e.key === 'Enter' && typedTag && typedTag?.length >= 3) {
            const existInSelected = selectedTags.find((tag) => tag.name == typedTag); 
            //check of new tag is exist in source
            const existInSuggestion = [...suggestedTags].find((tag) => tag.name == typedTag);                                    
           
            if (existInSuggestion) {
                addOldTag(existInSuggestion);
            }        
            else if (existInSelected) {                
                const alertTags = [...selectedTags].map((tag) => ({...tag, ...(tag.id == existInSelected.id && {alert: true})}));                
                updateSelectedTags(alertTags);
                //revert the state to stop alert
                setTimeout(() => updateSelectedTags([...selectedTags].map((tag) => ({...tag, ...(tag.id == existInSelected.id && {alert: false})}))), 4000);
                //empty suggested tag
                updateSuggestedTags([]);                                                
            } else {
                //restrict to add 3 new tag only
                const howManyNewTagAdded = selectedTags.reduce((accu,curr) =>  accu+= curr.isNew? 1 : 0,1); 
                if (howManyNewTagAdded > 3) {
                    //display error message
                    updateTagError(true);
                } else {
                    updateSelectedTags([...selectedTags, {id: uuid4(), name: typedTag, isNew: true, alert: false}]);
                    //empty the typed tag
                    updateTypedTag('');
                    //empty suggested tag
                    updateSuggestedTags([]);
                }
                
            }
            
        } 
    }
    const addOldTag = (tag: Tag) => {     
        //check existence in selected
        const existInSelected = selectedTags.find((stag) => stag.id == tag.id);  
        if (existInSelected)  {
            const alertTags = [...selectedTags].map((stag) => ({...stag, ...(stag.id == existInSelected.id && {alert: true})}));                
            updateSelectedTags(alertTags);
            //revert the state to stop alert
            setTimeout(() => updateSelectedTags([...selectedTags].map((stag) => ({...stag, ...(stag.id == existInSelected.id && {alert: false})}))), 4000);
        }   else {                                     
            //remove from suggested
            updateSuggestedTags([...suggestedTags.filter((suggestedTag) => suggestedTag.id != tag.id)])
            //add to selected
            updateSelectedTags([...selectedTags,{id: tag.id, name: tag.name, isNew: false, alert: false}])
            //remove from search source 
            updateTags([...tags.map(({alert,...tag}) => ({...tag, alert: false})).filter((sourceTag) => sourceTag.id != tag.id)])
            updateTypedTag('');
        }
    }

    const removeSelected = (tag: Tag) => {
        updateSelectedTags([...selectedTags].filter((stag) => stag.id != tag.id));
        if (!tag.isNew){
            updateTags([...tags,tag]);
        } 
        
    }
    const setTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {        
        updateTitle(e.target.value);
    }, []);
    const setDescription = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {        
        updateDescription(e.target.value);
    }, []);

    const onSubmit = useCallback( async (e: React.FormEvent) => {        
        e.preventDefault();                      
        const evt =  new CustomEvent("submitFunShot", {
            "bubbles":true, 
            "cancelable":false,            
        });
        document.dispatchEvent(evt);     
        
// return;
        try {
            // const {  tags = [], video, title, description} = e.detail as PostData;            
            let tagsToSave: string[] = [];
            const newTags: PostData['tags'] = [];            
            //filter new tags            
            selectedTags.forEach((tag) => {
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
            const fileData = new FormData();
            if (video) {
                fileData.append('video', video);
                const uploadedStatus = await (await axios.post('/upload', fileData, {
                    timeout: 60000,
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent: any) => {
                        console.log("upload progress", progressEvent);
                    //   setUploadPercentage(
                    //     Math.round(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                    //   );
                    }
                })).data;
                 //save post        
                if (uploadedStatus.statusCode = '200'){
                    axios.post('/post', {
                        title,
                        description,
                        tags: tagsToSave,
                        media_id: uploadedStatus.data.media.media_id,
                        s3_url: uploadedStatus.data.media.s3_url,
                        uid: 119
                    }).then((data) => {                        
                        //emit event of new post
                        const evt =  new CustomEvent("newPostAdded", {
                            "bubbles":true, 
                            "cancelable":false,
                            detail: data.data.data.post
                        });
                        document.dispatchEvent(evt);   
                        // updateShimmerStatus(false);
                    })
                }    
            }                        
        } catch (e) {
            // updateShimmerStatus(false);
            console.log("error", e);
        }
        





    },[selectedTags, title, description, video]);

    return (
        <div className='flex w-full flex-col justify-between border-[1px] shadow-sm rounded-md  mt-4'>            
            <form onSubmit={onSubmit}>
            <div className="py-2 px-4">
                <TextField name="title" placeholder="Title" value={title} onChange={setTitle} />                
            </div>
            <div className="pb-2 px-4">
                <textarea 
                    name="description"
                    className="mt-1 text-lg text-gray-500 block w-full border-gray-300 focus:outline-none resize-none"
                    placeholder="Write Description..." 
                    rows={4}
                    value={description}
                    onChange={setDescription}
                >                    
                </textarea>
            </div>
            <div className='flex flex-col'>
                {tagError && <Chip 
                chipType={ChipType.WARNING}
                autoHide={true}
                timeout={5000}
                text="Only 3 new tags can be added, you can still choose from existing(the orange one)" />}
                <div className='pb-4 flex flex-wrap justify-between px-2'>    
                  <div className='w-1/4 mb-2'>
                      <TextField 
                        name="description" 
                        placeholder="Tags" 
                        onChange={autoSuggestTags}
                        onKeyUp={addNewTag} 
                        value={typedTag}    
                        onKeyPress={(e) => e.key === 'Enter' && typedTag && e.preventDefault()}                   
                    />
                    </div>
                <div className='flex flex-row justify-end space-x-2 space-y-2 flex-wrap'>
                    {
                        selectedTags.map((tag) => <Chip 
                        text={'#'+tag.name} 
                        chipType={tag.alert? ChipType.WARNING :ChipType.DEFAULT}
                        key={tag.id} 
                        hoverText="click to remove" 
                        bounce={tag.alert}   
                        onClick={() => removeSelected(tag)}                     
                      ></Chip>
                    )}                                          
                </div>                      
                </div> 
                {/* <span className='text-sm text-gray-300'>Click to add</span> */}
                <div className='flex flex-row flex-wrap justify-start space-x-2 px-2 py-2 '>                    
                   {
                       suggestedTags.map((tag) => <Chip 
                            text={'#'+ tag.name} 
                            key={tag.id}   
                            chipType={ChipType.WARNING}
                            bounce= { bounceOnce}
                            onClick={() => addOldTag(tag)}
                            hoverText="click to select"                                                        
                        />
                      )
                   }
                </div>
            </div>
                       
            <div className='pl-4 pr-2 flex flex-wrap justify-between border-t-[1px] py-2 items-center'>
                <label htmlFor="file-upload" className="cursor-pointer flex flex-row space-x-4 items-center">
                    <span className='text-gray-500 font-medium'>
                        <Chip text="Choose File" chipType={ChipType.PRIMARY}>
                            <PaperClipIcon className='h-6 w-6 inline mr-2' /> 
                        </Chip>                       
                        </span>
                        {fileName && <span className='text-gray-500 text-sm'>{fileName}</span>}
                        <input 
                        id="file-upload" 
                        name="video" 
                        type="file" 
                        className="sr-only"                         
                        accept="video/*"
                        onChange={fileSelect}/>
                </label>                
               <Button type={ButtonTypes.PRIMARY}>
                  <CloudUploadIcon className='h-6 w-6 text-white mr-2'/> 
                  <span className='text-base'>Save</span>
                </Button>
            </div>
            </form>
        </div>
    );
}