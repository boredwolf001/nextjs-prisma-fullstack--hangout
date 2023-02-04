import React from 'react'

const SideBar = () => {
  return (
    <nav className='bg-gray-900 h-screen w-64 sticky top-0 left-0'>
      <div className='px-4 py-10 text-white'>
        <h1 className='text-white text-xl font-medium'>
          The place everyone loves to be
        </h1>
        <br />
        <ul className='list-none'>
          <li className='mb-4'>
            <a href='#' className='text-gray-400 hover:text-white'>
              Home
            </a>
          </li>
          <li className='mb-4'>
            <a href='#' className='text-gray-400 hover:text-white'>
              Profile
            </a>
          </li>
          <li className='mb-4'>
            <a href='#' className='text-gray-400 hover:text-white'>
              Friends
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default SideBar
