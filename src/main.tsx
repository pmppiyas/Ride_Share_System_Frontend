import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from "react-redux"
import { RouterProvider } from "react-router"
import { router } from '@/routes/index.ts'
import './index.css'
import 'leaflet/dist/leaflet.css';
import { store } from '@/redux/store'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/provider/auth.provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ReduxProvider store={store}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </ReduxProvider>

  </StrictMode >,
)
