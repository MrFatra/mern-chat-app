import React from 'react'
import { LoginForm } from '../components'
import { style } from '../constant/styles'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div style={style.card} className='card w-1/3 rounded-2xl p-5 my-20'>
        <div className="flex gap-5 sm:items-center lg:items-end justify-center">
          <p className='font-bold text-3xl'>Login</p>
          <p className='font-semibold text-xl'>to</p>
          <p className='font-bold text-3xl text-primary'>Chat App</p>
        </div>
        <LoginForm />
        <div className="flex items-center mt-4 gap-2 text-sm">
          <p>Don't have account?</p>
          <a href="/signup" className='text-sm link'>Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default Login