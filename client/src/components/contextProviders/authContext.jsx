import React, {createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


    const [auth, toggleAuth] = useState(null);


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
