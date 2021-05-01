import React, {createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


    const [auth, setAuth] = useState(null);

    const toggleAuth = (auth) => {

        setAuth(auth);

    };

    return (
        <AuthContext.Provider value={{
            auth,
            toggleAuth
        }}>
            {children}
        </AuthContext.Provider>
    )

}





export default AuthProvider;

export { AuthContext };
