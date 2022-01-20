import { FC } from "react";
import {SideNavProps} from './types';
import {SideNavtem} from '../side-nav-item';
import { HomeIcon, UsersIcon, ChartBarIcon, CameraIcon, CogIcon} from '@heroicons/react/outline';

export const SideNav:FC<SideNavProps> = ({}) => {

    return (
        <div className='flex flex-col'>
           <SideNavtem name="Dashboard" count={5} icon={<HomeIcon className="h-6 w-6 text-primary" />} />
           <SideNavtem name="Teams" count={5} icon={<UsersIcon className="h-6 w-6 text-primary"/>} />
           <SideNavtem name="Projects" count={5} icon={<ChartBarIcon className="h-6 w-6 text-primary"/>} />
           <SideNavtem name="videos" count={5} icon={<CameraIcon className="h-6 w-6 text-primary"/>} />
           <SideNavtem name="Settings" count={5} icon={<CogIcon className="h-6 w-6 text-primary"/>} />
        </div>
    )
}