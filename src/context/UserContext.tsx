import React, { useState } from "react";

export type UserContextType = {
  firstName: string,
  lastName: string,
  setUserInfo: (firstName: string, lastName: string) => void;
}

export const UserContext = React.createContext({
  firstName: '',
  lastName: '',
  setUserInfo: (firstName: string, lastName: string) => { },
});


interface ChildrenProps {
  children?: React.ReactNode
}

export default function UserContextTypeProvider({ children }: ChildrenProps) {

  const [userState, setUserState] = useState<UserContextType>({
    firstName: '',
    lastName: '',
    setUserInfo,
  })

  function setUserInfo(firstName: string, lastName: string) {
    setUserState({
      ...userState,
      firstName,
      lastName
    })
  }

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>
}