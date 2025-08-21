import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from "react-redux"
import { RouterProvider } from "react-router"
import { router } from '@/routes/index.ts'
import './index.css'
import { store } from '@/redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>

  </StrictMode>,
)
