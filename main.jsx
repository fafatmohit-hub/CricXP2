import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0d1117',
            color: '#e2e8f0',
            border: '1px solid rgba(34,197,94,0.25)',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.5px',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#0d1117' } },
          error: {
            style: { borderColor: 'rgba(239,68,68,0.3)' },
            iconTheme: { primary: '#ef4444', secondary: '#0d1117' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
