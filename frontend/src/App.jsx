import { Routes, Route, Navigate } from 'react-router-dom'
import { Chatting, Home, Login, Signup } from './pages'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/Auth'

function App() {
  const { authUser } = useAuthContext()

  return (
    <div className='font-Jost'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={authUser ? <Chatting /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={authUser ? <Navigate to={'/chat'} /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to={'/login'} /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
