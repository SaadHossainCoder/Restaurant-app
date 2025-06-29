
import { useEffect, useState } from "react"
import { getUserData } from "../../api"
import { useDispatch } from "react-redux"
import { removeUser, setUser } from "../../redux/slices/userSlice"
import { useNavigate } from "react-router-dom"


const useLoadData = (redirectOnFail = false) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const fetchUser = async () => {
            try {
                const response = await getUserData()
                const { _id, username, email, phone, role } = response?.data?.data || {}

                if (isMounted && _id) {
                    dispatch(setUser({ _id, username, email, phone, role }))
                } else {
                    throw new Error("User data is incomplete")
                }
            } catch (error) {
                if (isMounted) {
                    dispatch(removeUser())
                    console.error("User data fetch failed:", error)

                    if (redirectOnFail) {
                        navigate("/login", { replace: true })
                    }
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchUser()

        return () => {
            isMounted = false
        }
    }, [dispatch, navigate, redirectOnFail])

    return isLoading
}

export default useLoadData

