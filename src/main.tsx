import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './global.css'
import { CourseContextProvider } from './contexts/CoursesContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CourseContextProvider>
      <App />
    </CourseContextProvider>
  </React.StrictMode>,
)
