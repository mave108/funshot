import {FC} from 'react';
import {BaseLayoutProps} from './types';
import {Header} from '../../header';


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
                   <div className='xl:container xl:mx-auto'>
                       <div className='flex flex-col justify-center items-center mt-4'>
                         {children}
                       </div>                     
                    </div>
                </main>
            </div> 
    )
    
}