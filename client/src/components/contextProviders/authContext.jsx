import React, {useContext, createContext, useState } from "react";

const AuthContext = createContext();
const AuthUpdateContext = createContext();

const AuthProvider = ({ children }) => {


    const [authenticated, setAuthenticated] = useState(false);

    const toggleAuth = () => {
        setAuthenticated(prev => !prev);
    };

    return (
        <AuthContext.Provider value={authenticated}>
            <AuthUpdateContext.Provider value={toggleAuth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )

}

const useAuth = () => useContext(AuthContext);

const useAuthUpdate = () => useContext(AuthUpdateContext);


export default AuthProvider;

export {useAuth, useAuthUpdate};
