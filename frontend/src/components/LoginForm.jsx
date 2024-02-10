import React, { useRef } from 'react'
import Input from './Input'
import { useLogin } from '../hooks/login'
import Loading from './Loading'

const LoginForm = () => {
  const { login, loading } = useLogin()

  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const onSubmit = async (event) => {
    event.preventDefault()
    const username = usernameRef.current.value
    const password = passwordRef.current.value

    await login({ username, password })
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        refy={usernameRef}
        label={'Username'}
      />
      <Input
        refy={passwordRef}
        label={'Password'}
        inputType='password'
      />
      <div className='flex text-slate-500 text-sm mb-4 '><p className='text-red-500 mr-1 text-sm'>*</p>Required labels</div>
      <button className='btn btn-active btn-primary text-white w-full'>{loading ? <Loading /> : 'Login'}</button>
    </form>
  )
}

export default LoginForm