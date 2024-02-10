import { useState } from "react"
import { USER_AUTH_KEY } from "../config"
import { useAuthContext } from "../context/Auth"
import toast from "react-hot-toast"

export const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const request = await fetch("/api/auth/logout", { method: 'post' })
            const result = await request.json()
            if (!request.ok) throw new Error(result.message)
            localStorage.removeItem(USER_AUTH_KEY)
            setAuthUser(null)
            toast.success(result.message)
        } catch (err) {
            console.log("Error Logout: ", err.message)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { logout, loading }
}