import { FC, useState, useEffect } from "react";
import { PostProps, Tag } from "./types";
import { Chip } from "../chips";
import {PaperClipIcon, CloudUploadIcon} from '@heroicons/react/outline';
import { Button, ButtonTypes } from "../button";
import { Progressbar } from "../progress-bar";
import { TextField } from "../text-field";
import Fuse from 'fuse.js';
import axios from "axios";

export const Post:FC<PostProps> = ({}) => {
    let [isFileUploading, setFileUploadingState] = useState<boolean>(false);
    let [tags, updateTags] = useState<Tag[]>([]);
    let [filtertedTags, updateFilteredTags] = useState<Fuse.FuseResult<Tag>[]>();


    useEffect(()=> {
      axios.get('http://localhost:5001/api/tags').
      then(({data}) => {
         return data.data.tags;          
      })
      .then((tags = {}) =>{
        const tagArr: Tag[]  = [];
        for(var propName in tags) {
            if(tags.hasOwnProperty(propName)) {                
                tagArr.push({name: propName,id:  tags[propName]});                
            }
        }
        updateTags(tagArr);
      })
    }, [])
  
    const autoSuggestTags = (e: React.ChangeEvent<HTMLInputElement>) => {        
        const { value } = e.target;
        console.log("typed tag", e.target.value)
        const fuse = new Fuse(tags, {keys: ['name'], includeScore: true})
        const serachResult = fuse.search(value);
        updateFilteredTags(serachResult);                
    }

    return (
        <div className='flex w-full flex-col justify-between border-[1px] shadow-sm rounded-md  mt-4'>
            <div className="py-2 px-4">
                <TextField name="title" placeholder="Title" />
            </div>
            <div className="pb-2 px-4">
                <textarea 
                    className="mt-1 text-lg text-gray-500 block w-full border-gray-300 focus:outline-none resize-none"
                    placeholder="Write Description..." 
                    rows={4}
                ></textarea>
            </div>
            <div className='pb-4 flex flex-wrap justify-between px-2'>    
              <div className='w-1/4'><TextField name="title" placeholder="Tags" onChange={autoSuggestTags} /></div>
              <div className='flex flex-row justify-end space-x-2'>
              <Chip text="#Assign" />          
                <Chip text="#Label" />          
                <Chip text="#Due Date" />    
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