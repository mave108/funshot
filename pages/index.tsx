import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { BaseLayout } from '../components/layouts/base/internals'
import {VideoCard} from '../components/video-card';
import { Spinner } from '../components/spinner';
import { PostData } from '../components/post';
import axios from '../utils/axios';
import { Video } from '../components/video';

const Modal =  dynamic(() => import('../components/modal').then((mod) => mod.Modal),
{ loading: () => <Spinner text='Loading...' /> , ssr: false }
);
const PostVideo =  dynamic(() => import('../components/post').then((mod) => mod.Post),
{ loading: () => <Spinner text='Loading...' /> , ssr: false }
);
const CreatePost =  dynamic(() => import('../components/create-post').then((mod) => mod.CreatePost),
{ loading: () => <Spinner text='Loading...' /> , ssr: false }
);



const Home: NextPage = () => {
  let [isModalOpen, toggleModal] = useState<boolean>(false);
  const [posts, updatePost] = useState<PostData[]>([]);

  useEffect(() => {
    //get latest posts
    axios.get('/post').then((data) => {
      console.log("get posts", data.data.data.posts)
      updatePost(data.data.data.posts);
    });
  }, []);
  
  useEffect (()=> {       
    document.addEventListener('addFunShot', function (e) {  
      //show modal     
      toggleModal(true);
    }, false);

    document.addEventListener('submitFunShot', function (e) { 
      //hide modal
      toggleModal(false);

  }, false);
  document.addEventListener('newPostAdded', function (e: any) { 
    //prepend new post to exsisting list
    console.log("new post added",e.detail);
    updatePost([{...e.detail},...posts]);    
          
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
      {console.log("posts", posts)}
        <CreatePost />  
        {          
          posts.length > 0 &&
          posts.map((post) => <VideoCard 
          id={post.id}
          key={post.id}        
          img={post.s3_url} 
          user='braydoncoyer' 
          title={post.title} 
          tags={post.tags}
          description={post.description} 
        >
          <Video poster={`${process.env.NEXT_PUBLIC_API_END_POINT}stream/image/${post.id}`} />
        </VideoCard>
        )       
        }  
        
            {isModalOpen && 
            <Modal show={isModalOpen} title='Upload Video' overlay={true} close={()=> toggleModal(false)}>
              <PostVideo />
            </Modal>}     
      </BaseLayout>
  )
}

export default Home
