import React, {createContext, useState, useContext} from 'react';

const defaultValue = {
    user: {
        name: '',
        userImage: ''
    },
    setUser: () => {},
}

const userContext = createContext(defaultValue)

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    const value = {
        user,
        setUser
    }
    return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export const useUser = () => {
    const context = useContext(userContext)
    if (!context) {
        throw new Error('useUser must be used within a user context');
    }
    return context;
};