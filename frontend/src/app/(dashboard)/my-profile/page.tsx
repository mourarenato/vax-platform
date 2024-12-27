// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

const AccountTab = dynamic(() => import('@/views/my-profile/account'))

const MyProfilePage = () => {
  return <AccountTab />
}

export default MyProfilePage
