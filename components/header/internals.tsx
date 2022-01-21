import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, PlusCircleIcon } from "@heroicons/react/outline";
import Eev from 'eev';
import Link from 'next/link';
import { HeaderProps } from "./types";
import { Logo } from '../logo';
import {Search} from '../search';



export const Header: FC<HeaderProps> = () => {
  // var eev = new Eev();
  

  return (
    <Disclosure as='nav'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>

                <div className="flex-shrink-0 flex items-center"><Logo /></div>
                <div className='hidden sm:block sm:ml-16'>                
                  <div className='flex space-x-1' >
                    <Link href='/' >
                    
                    <a 
                       className='bg-gray-100 text-gray-700 menu-item group' 
                       aria-current="page" 
                       
                    >
                      <button onClick={()=> {                                  
                                  const evt =  new Event("addFunShot", {"bubbles":true, "cancelable":false});
                                  document.dispatchEvent(evt);  
                                                              
                                }}>
                    <PlusCircleIcon className="h6 w-6 inline text-primary group-hover:text-white" />
                       <span> shot</span>
                       </button>
                    </a>
                    </Link>                   
                  </div>
                </div>
                <div className='flex-shrink-0 flex items-center ml-[4.8rem]'>
                    <Search />
              </div>
              </div>              
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <Link href='/' >
                <a className='menu-item' aria-current="page">
                  Sign In
                </a>
              </Link>  
              </div>
            </div>
          </div>          
        </>
      )}
    </Disclosure>
  );
};
