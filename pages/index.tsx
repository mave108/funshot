import type { NextPage } from 'next'
import Head from 'next/head'
import { BaseLayout } from '../components/layouts/base/internals'
import {VideoCard} from '../components/video-card';


const Home: NextPage = () => {
  return (
    <BaseLayout>
      <Head>
        <title>funShot</title>
        <meta name="description" content="short fun videos" />
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
