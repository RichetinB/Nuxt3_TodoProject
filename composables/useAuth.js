import { jwtDecode } from "jwt-decode";

import Cookies from 'js-cookie';


export default () => {

    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')
    const useAuthLoading = () => useState('auth_loading', () => true)
    const useAuthRoom = () => useState('auth_room');
    console.log("data auth_room", useState('auth_room'))

    


    const setToken = (newToken) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    }

    const setAuthLoading = (value) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }

    const setRoom = (newRoom) => {
        const authRoom = useAuthRoom()
        authRoom.value = newRoom
    }
    

    const login = async (username, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: {
                        username,
                        password
                    }
                })

                setToken(data.access_token)
                setUser(data.user)
                setRoom(data.roomsForUser)
    
                resolve(true)
            } catch (error) {
                reject(error); 
            }
        });
    }


    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/refresh')
                setToken(data.access_token)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getUser = () => { 
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchApi('/api/auth/user')
                setUser(data.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getRoom = () => { 
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchApi('/api/rooms/users_room')

                setRoom(data.roomsForUser)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    
    

    const reRefreshAccessToken = () => {
        const authToken = useAuthToken()

        if(!authToken.value){
            return
        }

        const jwt = jwtDecode(authToken.value)

        const newRefreshTime = jwt.exp - 60000

        setTimeout( async () => {
            await refreshToken()
            reRefreshAccessToken()
        }, newRefreshTime);
    }


    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            setAuthLoading(true)
            try {
                await refreshToken()
                await getUser()
                await getRoom()
                


                reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                reject(error)
            } finally {
                setAuthLoading(false)
            }
        })
    }

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await useFetchApi('/api/auth/logout', {
                    method: 'POST'
                })

                setToken(null)
                setUser(null)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    
    

    
    
    return {
        login,
        useAuthUser,
        useAuthRoom,
        useAuthToken,
        initAuth,
        useAuthLoading,
        logout
    }

    
}
