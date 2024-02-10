import React, { useRef } from 'react'
import Input from './Input'
import { useSignup } from '../hooks/signup'
import Loading from './Loading'

const SignUpForm = () => {

    const { loading, signup } = useSignup()

    const fullNameRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const genderMaleRef = useRef(null)
    const genderFemaleRef = useRef(null)

    const onSubmit = async (event) => {
        event.preventDefault()
        const fullName = fullNameRef.current.value
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        const gender = genderMaleRef.current.checked ? 'male' : genderFemaleRef.current.checked ? 'female' : null

        await signup({ fullName, username, password, confirmPassword, gender })
    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                refy={fullNameRef}
                label={'Full Name'}
            />
            <Input
                refy={usernameRef}
                label={'Username'}
            />
            <Input
                inputType='password'
                refy={passwordRef}
                label={'Password'}
            />
            <Input
                inputType='password'
                refy={confirmPasswordRef}
                label={'Confirm Password'}
            />
            <p className='flex'>Gender <span className='text-red-500 ml-1'>*</span> :</p>
            <div className="flex justify-evenly">
                <label className="label cursor-pointer gap-3">
                    <input
                        className='radio checked:bg-primary'
                        type='radio'
                        ref={genderMaleRef}
                        name={'gender'}
                        value={'male'}
                    />
                    <span className="label-text">Male</span>
                </label>
                <label className="label cursor-pointer gap-3">
                    <input
                        className='radio checked:bg-primary'
                        type='radio'
                        ref={genderFemaleRef}
                        name={'gender'}
                        value={'female'}
                    />
                    <span className="label-text">Female</span>
                </label>
            </div>
            <p className='flex text-slate-500 text-sm mb-4 '><span className='text-red-500 mr-1 text-sm'>*</span>Required labels</p>
            <button className="btn btn-active btn-primary text-white w-full">
                {loading ? <Loading /> : 'Sign Up'}
            </button>
        </form>
    )
}

export default SignUpForm
