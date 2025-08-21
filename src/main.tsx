import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from "react-redux"
import { RouterProvider } from "react-router"
import { router } from '@/routes/index.ts'
import './index.css'
import { store } from '@/redux/store'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </ReduxProvider>

  </StrictMode>,
)
