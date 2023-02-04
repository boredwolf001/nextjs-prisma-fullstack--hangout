import { Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session }: { data: Session | null } = useSession()

  return (
    <header className='bg-white border-b p-4 z-50'>
      <div className='container mx-auto flex items-center justify-between'>
        <h1 className='font-black text-3xl'>Hang-Out</h1>
        <form className='w-full max-w-sm'>
          <div className='flex items-center border-b border-blue-500 py-2'>
            <input
              type='text'
              className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
              placeholder='Search'
            />
            <button
              className='flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded'
              type='button'>
              Search
            </button>
          </div>
        </form>

        {!session?.user ? (
          <div className='flex items-center gap-6'>
            <Link href='/login'>Login</Link>
          </div>
        ) : (
          <div className='flex items-center gap-6'>
            <Link href='/dashboard'>Dashboard</Link>
            <button onClick={() => signOut()}>Log Out</button>
            <h1>{session.user.name}</h1>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
