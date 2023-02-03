import { Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const logout = () => {
  const { data: session }: { data: Session | null } = useSession()
  if (!session?.user) return
  useEffect(() => {
    signOut()
  }, [])
  return <></>
}

export default logout
