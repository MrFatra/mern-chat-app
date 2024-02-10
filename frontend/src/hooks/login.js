import { useState } from "react"
import toast from "react-hot-toast"
import { USER_AUTH_KEY } from "../config"
import { useAuthContext } from "../context/Auth"

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async (formData) => {
        try {
            const params = new URLSearchParams()
            for (let key in formData) {
                if (Object.hasOwnProperty.call(formData, key)) {
                    params.append(key, formData[key])
                }
            }

            const request = await fetch('/api/auth/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params,
            })
            const result = await request.json()

            if (!request.ok) throw new Error(result.message)

            localStorage.setItem(USER_AUTH_KEY, JSON.stringify(result))
            setAuthUser(result)
            toast.success(result.message)
        } catch (err) {
            console.error(err.message)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { login, loading }

}