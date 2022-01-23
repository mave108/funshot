import React, { FC, useState, useEffect } from "react";
import { PostProps, Tag } from "./types";
import { Chip, ChipType } from "../chips";
import {PaperClipIcon, CloudUploadIcon} from '@heroicons/react/outline';
import { Button, ButtonTypes } from "../button";
import { Progressbar } from "../progress-bar";
import { TextField } from "../text-field";
import Fuse from 'fuse.js';
import axios from '../../utils/axios';
import {v4 as uuid4} from 'uuid';
import { ExecuteOne } from "../../utils/genral";

export const Post:FC<PostProps> = ({}) => {
    let [typedTag, updateTypedTag] = useState<string>();
    let [isFileUploading, setFileUploadingState] = useState<boolean>(false);
    let [tags, updateTags] = useState<Tag[]>([]);
    let [selectedTags, updateSelectedTags] = useState<Tag[]>([]);
    let [suggestedTags, updateSuggestedTags] = useState<Tag[]>([]);
    let [bounceOnce, setBounceState] = useState<boolean>(true);
    let [tagError, updateTagError] = useState<boolean>(false);


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
        ExecuteOne()(() => setTimeout(() => {setBounceState(false); console.log("executeOnce")}, 400));

    }

    const addNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {        
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
        }
    }

    const removeSelected = (tag: Tag) => {
        updateSelectedTags([...selectedTags].filter((stag) => stag.id != tag.id));
        if (!tag.isNew){
            updateTags([...tags,tag]);
        } 
        
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
                {tagError && <Chip 
                chipType={ChipType.WARNING}
                autoHide={true}
                timeout={5000}
                text="Only 3 new tags can be added, you can still choose from existing(the orange one)" />}
                <div className='pb-4 flex flex-wrap justify-between px-2'>    
                  <div className='w-1/4 mb-2'>
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