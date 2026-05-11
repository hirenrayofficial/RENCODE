import React from 'react'
import { Outlet } from 'react-router-dom'
import Eheader from '../../../editor/component/Eheader'
import Efooter from '../../../editor/component/Efooter'
import { AuthProvider } from '../../../context/AuthContext'
import { Toaster } from 'sonner'

export default function EditorLayout() {
  return (
    <div>
      <Toaster position='top-center' richColors/>
      <AuthProvider>
      <header>
        <Eheader/>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <Efooter/>
      </footer>
      </AuthProvider>
    </div>
  )
}
