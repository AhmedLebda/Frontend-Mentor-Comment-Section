import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CurrentUserProvider } from './contexts/CurrentUser.tsx'
import { CommentsProvider } from './contexts/CommentsProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentUserProvider>
      <CommentsProvider>
        <App />
      </CommentsProvider>
    </CurrentUserProvider>
  </StrictMode>,
)
