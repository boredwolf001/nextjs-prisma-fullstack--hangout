import Head from 'next/head'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Hang-Out</title>
        <link rel='preconnect' href='https://rsms.me/' />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css'></link>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
          integrity='sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=='
        />
      </Head>
      <div style={{ zIndex: 10 }}>
        <Navbar />
      </div>
      <div className='flex'>
        <div className='flex' style={{ zIndex: 0 }}>
          <SideBar />
        </div>
        <main className='flex-1'>{children}</main>
      </div>
    </>
  )
}
