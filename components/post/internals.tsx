import React, { FC, useState, useEffect } from "react";
import { PostProps, Tag } from "./types";
import { Chip, ChipType } from "../chips";
import {PaperClipIcon, CloudUploadIcon} from '@heroicons/react/outline';
import { Button, ButtonTypes } from "../button";
import { Progressbar } from "../progress-bar";
import { TextField } from "../text-field";
import Fuse from 'fuse.js';
import axios from '../../utils/axios';

export const Post:FC<PostProps> = ({}) => {
    let [typedTag, updateTypedTag] = useState<string>();
    let [isFileUploading, setFileUploadingState] = useState<boolean>(false);
    let [tags, updateTags] = useState<Tag[]>([]);
    let [selectedTags, updateSelectedTags] = useState<Tag[]>([]);
    let [suggestedTags, updateSuggestedTags] = useState<Fuse.FuseResult<Tag>[]>([]);


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
        const serachResult = fuse.search(value);
        const revertSearchResult = [...serachResult].map(({item, ...rest}) => ({...rest,item: {...item,alert: false}}));
        updateSuggestedTags(serachResult);
        updateTypedTag(value);
        setTimeout(() => updateSuggestedTags(revertSearchResult), 4000);

    }

    const addNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {        
        //on enter add new tag to the selected
        if (e.key === 'Enter' && typedTag && typedTag?.length > 3) {
            const isExist = selectedTags.find((tag) => tag.name == typedTag);            
            if (isExist) {
                const revertState = [...selectedTags];
                const alertTags = [...selectedTags].map((tag) => ({...tag, ...(tag.id == isExist.id && {alert: true})}));                                
                updateSelectedTags(alertTags);
                //revert the state to stop alert
                setTimeout(() => updateSelectedTags([...revertState]), 4000);
            } else {
                updateSelectedTags([...selectedTags, {id: '', name: typedTag, isNew: true, alert: false}]);
                //empty the typed tag
                updateTypedTag('');
            }
            
        } 
    }
    const addOldTag = (tag: Fuse.FuseResult<Tag>) => {        
        //remove from suggested
        updateSuggestedTags([...suggestedTags.filter((suggestedTag) => suggestedTag.item.id != tag.item.id)])
        //add to selected
        updateSelectedTags([...selectedTags,{id: tag.item.id, name: tag.item.name, isNew: false, alert: false}])
        //remove from search source 
        updateTags([...tags.filter((sourceTag) => sourceTag.id != tag.item.id)])
    }

    return (
        <div className='flex w-full flex-col justify-between border-[1px] shadow-sm rounded-md  mt-4'>
            <div className="py-2 px-4">
                <TextField name="title" placeholder="Title" />
                {console.log("rendered")}
            </div>
            <div className="pb-2 px-4">
                <textarea 
                    className="mt-1 text-lg text-gray-500 block w-full border-gray-300 focus:outline-none resize-none"
                    placeholder="Write Description..." 
                    rows={4}
                ></textarea>
            </div>
            <div className='flex flex-col'>
                <div className='pb-4 flex flex-wrap justify-between px-2'>    
                  <div className='w-1/4'>
                      <TextField 
                        name="title" 
                        placeholder="Tags" 
                        onChange={autoSuggestTags}
                        onKeyUp={addNewTag} 
                        value={typedTag}                       
                    />
                    </div>
                <div className='flex flex-row justify-end space-x-2 space-y-2 flex-wrap'>
                    {
                        selectedTags.map(({name,id, alert = false}) => <Chip 
                        text={'#'+name} 
                        chipType={alert? ChipType.WARNING :ChipType.DEFAULT}
                        key={id} 
                        hoverText="click to remove" 
                        bounce={alert}                        
                      ></Chip>
                    )}                                          
                </div>                      
                </div> 
                <div className='flex flex-row flex-wrap justify-start space-x-2 px-2 py-2 '>
                   {
                       suggestedTags.map((tags) => <Chip 
                            text={'#'+ tags.item.name} 
                            key={tags.item.id}   
                            chipType={tags.item.alert? ChipType.WARNING :ChipType.DEFAULT}                          
                            bounce= {tags.item.alert}
                            onClick={() => addOldTag(tags)}
                            hoverText="click to select"                                                        
                        />
                      )
                   }
                </div>
            </div>
                       
            <div className='pl-4 pr-2 flex flex-wrap justify-between border-t-[1px] py-2 items-center'>
                {!isFileUploading && <label htmlFor="file-upload" className="cursor-pointer">
                    <span className='text-gray-500 font-medium'>
                        <PaperClipIcon className='h-6 w-6 inline mr-2' /> 
                        Attach a file
                        </span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={()=>{
                            setFileUploadingState(true);
                        }}/>
                </label>}
                {isFileUploading && 
                    <div className="w-1/2">
                         <Progressbar progress={30} /> 
                    </div>
                }
               <Button type={ButtonTypes.PRIMARY}>
                  <CloudUploadIcon className='h-6 w-6 text-white mr-2'/> 
                  <span className='text-base'>Save</span>
                </Button>
            </div>
        </div>
    );
}