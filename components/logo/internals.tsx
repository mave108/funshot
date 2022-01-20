import {PlayIcon} from '@heroicons/react/outline';
import Link from 'next/link';

export const Logo = () => {

    return (
      <Link href='/' passHref>
        <div className='group flex flex-row flex-wrap cursor-pointer'>
           <div>
           <span className='text-grey-900 text-xl font-semibold font-mono'>funSh</span>
           </div>
           <div className='w-6 text-primary group-hover:text-gray-900 mt-0.5'>
             <PlayIcon />
           </div>
           <div>
           <span className='text-gray-900 text-xl font-semibold font-mono'>t</span>
           </div>
        </div>
        
      </Link>
    )
}