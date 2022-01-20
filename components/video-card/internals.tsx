import { FC } from "react";
import { VideoCardProps } from './types';
import Image from "next/image";
import {UserIcon} from '@heroicons/react/outline';

export const VideoCard: FC<VideoCardProps> = () => {

    return (
        <div className="max-w-xl rounded overflow-hidden shadow-lg w-full bg-white mb-3">
            <div className='w-full flex justify-between p-3'>
            <div className="flex">
                <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                   <UserIcon className="inline-block h-6 w-6 rounded-full ring-1  text-white" /> 
                </div>
                <span className="pt-1 ml-2 font-bold text-sm">braydoncoyer</span>
            </div>
            </div>
  <div className="flex overflow-hidden w-full h-[20rem] bg-no-repeat bg-cover bg-center" style={{backgroundImage: 'url(/scene.jpeg)'}}></div>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>
    )
}