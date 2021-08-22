import { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { login } from '../services/api/loginService';
import { cookieService } from '../services/cookies/cookieService'

type useLoginState = {
    loginSuccess: boolean,
    loginError: string
}

export default function useLogin(username: string, password: string) {
    const [loginState, setLoginState] = useState<useLoginState>({ loginSuccess: false, loginError: '' });
    const { setLoggedIn } = useContext(LoginContext)

    useEffect(() => {
        if (username && password) {
            logUser()
        }
        // eslint-disable-next-line
    }, [username, password]);

    const logUser = async () => {
        try {
            const token = await login({ username, password })
            cookieService.set('accessToken', token)
            setLoggedIn(true, true)
            setLoginState({ loginSuccess: true, loginError: '' })
        } catch (error) {
            setLoginState({ loginSuccess: false, loginError: error?.data ? error.data : 'Error while contacting backend.' })
        }
    }

    return loginState
}