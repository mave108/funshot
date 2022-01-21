import type { NextPage } from 'next'
import Head from 'next/head'
import { BaseLayout } from '../components/layouts/base/internals'
import {VideoCard} from '../components/video-card';


const Home: NextPage = () => {
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
      </BaseLayout>
  )
}

export default Home
