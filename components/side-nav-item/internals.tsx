import { FC } from "react";
import { SideNavItemProps } from './types';

export const SideNavtem: FC<SideNavItemProps> = ({icon, name, count}) => {

    return (
        <div className='flex w-60 group flex-row rounded-md justify-between hover:bg-white pl-4 pr-4 pb-2 pt-2 items-center cursor-pointer'>
            <div className="flex flex-row">
                <div>
                    {icon}
                </div>
                <div className="ml-4">
                    <span className="text-gray-900 text-base">{name}</span>
                </div>
          </div>
                <div className='bg-white group-hover:bg-gray-100 rounded-lg pl-2 pr-2'>
                    <span className='text-sm'>{count}</span>
                </div>
        </div>
    )
}