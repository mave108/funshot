import { Children, FC } from "react";
import { VideoCardProps } from './types';
import {UserIcon} from '@heroicons/react/outline';
import { Chip } from "../chips";
import classNames from "classnames";

export const VideoCard: FC<VideoCardProps> = ({
  id: post_id,
  title = '', 
  description = '', 
  tags = [], 
  user='Anonymous',
  shimmer = false,
  children
}) => {

    return (
        <div className="max-w-xl rounded overflow-hidden shadow-lg w-full bg-white mb-3">
            <div className='w-full flex justify-between p-3'>
              <div className="flex space-x-2 items-center">
                  <div className= {classNames(
                    'rounded-full',
                    'h-8',
                    'w-8',
                    'bg-slate-200',
                    'flex',
                    'items-center',
                    'justify-center',
                    'overflow-hidden',   
                    {'animate-pulse': shimmer}                 
                  )}
                >
                    {!shimmer && <UserIcon className="inline-block h-6 w-6 rounded-full ring-1  text-white" /> }
                  </div>
                    <span className={classNames(
                      'pt-1',
                      'ml-2 ',
                      'font-bold',
                      'text-sm',    
                      {'rounded': shimmer},
                      {'bg-slate-200': shimmer},  
                      {'h-2': shimmer},   
                      {'w-[10rem]': shimmer},           
                    )}
                    >{!shimmer && user}</span>
              </div>
            </div>
            <div className={classNames(
                'flex',
                'relative',
                'overflow-hidden',
                'w-full',
                'h-[20rem]',                
                {'animate-pulse': shimmer},
                {'bg-slate-200': shimmer}
              )}  
              >
                {children}
            </div>
            <div className="px-6 py-4">
                <div className={classNames(
                  'font-bold',
                  'text-xl',
                  'mb-2',
                  {'rounded': shimmer},
                  {'w-1/2': shimmer},
                  {'h-3': shimmer},
                  {'bg-slate-200': shimmer}
                )}
                >{!shimmer && title}</div>
              {!shimmer && <p className="text-gray-700 text-base">
                    {description}                  
                  </p>
              }
              {
                shimmer && (
                  <div className="mt-6">
                    <p className="bg-slate-200 h-2 w-full rounded animate-pulse mb-2" />
                    <p className="bg-slate-200 h-2 w-1/2 rounded animate-pulse mb-2" />
                    <p className="bg-slate-200 h-2 w-1/3 rounded animate-pulse mb-2" />                     
                    <p className="bg-slate-200 h-2 w-10/12 rounded animate-pulse" />                                    
                  </div>
                )
              }
            </div>
        <div className="px-6 pt-4 pb-2 flex flex-row space-x-2 justify-end">
          {tags.length > 0 && tags.map(({id, name}) => <Chip text={name} key={`${post_id}-${id}`} shimmer = {shimmer}  />)}    
        </div>
      </div>
    )
}