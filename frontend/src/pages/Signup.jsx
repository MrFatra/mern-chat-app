import React from 'react'
import { style } from '../constant/styles'
import { SignUpForm } from '../components'

const Signup = () => {

    return (
        <div className='flex items-center justify-center'>
            <div style={style.card} className='card w-1/3 rounded-2xl p-5 my-20'>
                <div className="text-center">
                    <p className='text-4xl font-bold'>Sign Up</p>
                    <p className='font-semibold text-xl mt-3 mb-2'>to</p>
                    <p className='text-2xl font-semibold text-primary'>Chat App</p>
                </div>
                <SignUpForm />
                <div className="flex items-center mt-4 gap-2 text-sm">
                    <p>Already have account?</p>
                    <a href="/login" className='text-sm link'>Login</a>
                </div>
            </div>
        </div>
    )
}

export default Signup
