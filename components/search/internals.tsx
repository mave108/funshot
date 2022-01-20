import { FC, useState } from "react";
import { Searchprops } from './types';
import { SearchIcon } from '@heroicons/react/outline'
import {classNames} from '../../utils/genral';

export const Search:FC<Searchprops> = ({}) => {
    const [focus, setFocus] = useState<boolean>(false);
    return (
      <>
        <div className={classNames('relative', 'mx-auto', 'text-gray-600', focus?'z-20': '') }>
        <input className="border-2 border-gray-300 bg-white h-10 px-5 pl-12 rounded-lg text-sm w-[36.1rem] focus:outline-none"
          type="search" name="search" placeholder="Search" 
          onFocus={()=>setFocus(true)}
          onBlur={()=> setFocus(false)}
          />
        <button type="submit" className="absolute left-0 top-0 mt-2 ml-4">
          <SearchIcon className="w-6 h-6 text-gray-400" />
        </button>        
      </div>
      {focus && <div className="backdrop-blur-sm bg-white/30 w-full h-full fixed top-0 left-0 z-10"></div>}
      </>
    )
}