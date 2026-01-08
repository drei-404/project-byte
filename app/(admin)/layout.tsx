import AdminSidebar from '@/components/admin-sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminSidebar />
    </>
  )
}

export default Layout