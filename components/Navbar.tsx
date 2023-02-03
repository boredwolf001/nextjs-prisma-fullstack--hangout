import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session }: { data: Session | null } = useSession()

  return (
    <div className='navbar bg-base-300 px-10'>
      <div className='flex-1'>
        <Link
          className='link-neutral cursor-pointer normal-case text-3xl font-medium'
          href='/'>
          Hang-Out
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          {!session?.user ? (
            <>
              <li>
                <Link href='/login'>Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href='/dashboard'>Dashboard</Link>
              </li>
              <li>
                <Link href='/newpost'>Create Post</Link>
              </li>
              <li>
                <Link href='/logout'>Log Out</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
