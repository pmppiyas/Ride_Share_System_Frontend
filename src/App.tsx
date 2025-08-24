import MainLayout from '@/layouts/MainLayout'
import { Footer } from '@/pages/shared/Footer'
import { Navbar } from '@/pages/shared/Navbar'
import { Outlet } from "react-router"

function App() {

  return (
    <div className=''>
      <Navbar />
      <MainLayout  >
        <Outlet />
      </MainLayout>
      <Footer />
    </div>
  )
}

export default App
