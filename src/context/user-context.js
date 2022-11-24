import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        id: null,
        firstName: '',
        lastName:'',
        gender:'',
        role:'',
        locationId:'',
        accessToken: '',
    });


    useEffect(()=> {
        const userJson = sessionStorage.getItem('user');
        if(userJson) {
            setUser(JSON.parse(userJson))
        }
    }, [])
    return (
        <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
    );
}

export function useUserContext() {
    return useContext(Context);
}