import { useState } from 'react';
import axios from 'axios';

export interface IUseAuthProvider {
    login: (username: string, password: string) => void;
    logout: () => void;
    user: null | IUser;
}

export interface IUser {
    jwt: string
    id: number
    username: string
    email: string
}

const useAuthProvider = (): IUseAuthProvider => {
    const [user, setUser] = useState<null | IUser>(null)

    const login = async (username: string | null, password: string | null) => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/auth/local',
                headers: {
                    "ContentType": 'application/json'
                },
                data: {
                    identifier: username,
                    password: password
                }
            })

            setUser({
                jwt: res.data.jwt,
                id: res.data.user.id,
                username: res.data.user.username,
                email: res.data.user.email
            })
        } catch (e) {
            throw e
        }
    }

    const logout = () => {
        setUser(null)
    }

    return {
        user,
        login,
        logout
    }

}

export default useAuthProvider;
