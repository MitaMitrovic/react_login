import React, { useState } from "react";

export type LoginContextType = {
    loggedIn: boolean,
    ready: boolean,
    setLoggedIn: (loggedIn: boolean, ready: boolean) => void,
}

export const LoginContext = React.createContext({
    loggedIn: false,
    ready: false,
    setLoggedIn: (loggedIn: boolean, ready: boolean) => { },
});

interface ChildrenProps {
    children?: React.ReactNode
}

export default function LoginContextTypeProvider({ children }: ChildrenProps) {

    const [loginState, setLoginState] = useState<LoginContextType>({
        loggedIn: false,
        ready: false,
        setLoggedIn,
    })

    function setLoggedIn(loggedIn: boolean, ready: boolean) {
        setLoginState({
            ...loginState,
            loggedIn,
            ready
        })
    }

    return <LoginContext.Provider value={loginState}>{children}</LoginContext.Provider>
}