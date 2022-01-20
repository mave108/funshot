import {FC} from 'react';
import {BaseLayoutProps} from './types';
import {Header} from '../../header';
import {SideNav} from '../../side-nav';


export const BaseLayout: FC<BaseLayoutProps> = ({children}) => {
  
    return (
            <div className="flex flex-col bg-gray-100">
                <header>
                <div className='bg-white shadow'>
                    <div className='xl:container xl:mx-auto'>
                      <Header />  
                    </div>                  
                </div>
                </header>
                <main>
                   <div className='xl:container xl:mx-auto relative'>
                       <div className='absolute top-0 left-4'>
                          <SideNav />
                       </div>
                       <div className='flex flex-col justify-center items-center mt-4'>
                         {children}
                       </div>                     
                    </div>
                </main>
            </div> 
    )
    
}