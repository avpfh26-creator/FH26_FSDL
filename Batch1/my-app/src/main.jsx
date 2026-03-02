import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Counter from './Components/Counter.jsx'
import Todo from '../../../ReactSecondApp/my-first-react-app/src/Todo.jsx'
import UserProfile from './Components/UserProfile.jsx'
import ThemeSwitcher from './Components/ThemeSwitcher.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Counter /> */}
    {/* <Todo /> */}
    {/* <UserProfile /> */}
    <ThemeContext />
  </StrictMode>,
)
