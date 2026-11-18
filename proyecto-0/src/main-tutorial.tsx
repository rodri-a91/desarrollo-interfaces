import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tutorial from './components/tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tutorial />
  </StrictMode>,
)
