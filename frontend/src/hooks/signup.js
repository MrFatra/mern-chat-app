import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const signup = async (formData) => {
        setLoading(true)
        try {
            validateFormData(formData)

            const params = new URLSearchParams()
            for (const key in formData) {
                if (Object.hasOwnProperty.call(formData, key)) {
                    params.append(key, formData[key])
                }
            }

            const request = await fetch('/api/auth/signup', {
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params,
            })
            const result = await request.json()

            if (!request.ok) throw new Error(result.message)

            // TODO Put this into useLogin
            // localStorage.setItem(USER_AUTH_KEY, JSON.stringify(result))
            // setAuthUser(result)
            toast.success(result.message)
            navigate('/login')
        } catch (err) {
            console.error(err.message)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const validateFormData = (formData) => {
        const { fullName, username, password, confirmPassword, gender } = formData
        if (!fullName || !username || !password || !confirmPassword || !gender) throw new Error('All fields are required')
        if (password !== confirmPassword) throw new Error('Passwords doesn\'t match')
        else if (username.length < 6 || !/^[a-zA-Z0-9_]+$/.test(username)) throw new Error('Username must be at least 6 characters long and can only contain letters, numbers, and underscores.')
    }

    return { loading, signup }

}