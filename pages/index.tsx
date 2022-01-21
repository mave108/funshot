import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { BaseLayout } from '../components/layouts/base/internals'
import {VideoCard} from '../components/video-card';
import { Spinner } from '../components/spinner';
const Modal =  dynamic(() => import('../components/modal').then((mod) => mod.Modal),
{ loading: () => <Spinner text='Loading...' /> , ssr: false }
);
const PostVideo =  dynamic(() => import('../components/post').then((mod) => mod.Post),
{ loading: () => <Spinner text='Loading...' /> , ssr: false }
);



const Home: NextPage = () => {
  let [isModalOpen, toggleModal] = useState<boolean>(false);
  
  useEffect (()=> {       
    document.addEventListener('addFunShot', function (e) { 
      // console.log("funshot clicked")
      toggleModal(true);
    }, false);
  });
  return (
    <BaseLayout>
      <Head>        
        <title>funShot</title>             
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>        
        <meta name="description" content="short fun videos" />
        <meta name="keywords" content="fun,videos " />
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Rakesh"></meta>
      </Head>      
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />        
            <Modal show={isModalOpen} title='Upload Video' overlay={true} close={()=> toggleModal(false)}>
              <PostVideo />
            </Modal>        
      </BaseLayout>
  )
}

export default Home
