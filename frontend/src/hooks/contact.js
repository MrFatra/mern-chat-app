import { useEffect, useState } from "react"
import useContacts from "../store/useContacts"

const useGetContacts = () => {
    const [loading, setLoading] = useState(false)
    const { contacts, setContacts } = useContacts()

    const getContacts = async (contactName) => {
        setLoading(true)
        try {
            const request = await fetch(`/api/user/conversation${contactName !== undefined ? '/' + contactName : ''}`)
            const result = await request.json()

            if (!request.ok) throw new Error(result.message)

            setContacts(result.data)
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getContacts()
    }, [])

    return { contacts, loading, getContacts }
}

export default useGetContacts