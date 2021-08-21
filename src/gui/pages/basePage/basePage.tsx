import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../context/UserContext";
import { LoginContext } from "../../../context/LoginContext";
import { getUser } from "../../../services/api/userService";
import { cookieService } from "../../../services/cookies/cookieService";

const AUTHORIZED_ROUTES = ['/dashboard']

export default function BasePage() {

    const { loggedIn, ready, setLoggedIn } = useContext(LoginContext)
    const { setUserInfo } = useContext(UserContext)
    const history = useHistory();

    useEffect(() => {
        const token = cookieService.get('accessToken')
        if (token) {
            setLoggedIn(true, true)
        }
        else {
            setLoggedIn(false, true)
        }
    }, [setLoggedIn])

    useEffect(() => {
        if (ready) {
            if (loggedIn) {
                loadUser()
                if (!AUTHORIZED_ROUTES.includes(history.location.pathname))
                    history.push(`/dashboard`)
            } else {
                if (AUTHORIZED_ROUTES.includes(history.location.pathname)
                    || history.location.pathname === "/")
                    history.push("/login")
            }
        }
        // eslint-disable-next-line
    }, [history, loggedIn, ready, setUserInfo])


    const loadUser = async () => {
        try {
            const { firstName, lastName } = await getUser()
            setUserInfo(firstName, lastName)
        } catch (error) {
            console.log(error)
        }
    }


    return <></>
}