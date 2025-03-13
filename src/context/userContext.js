import { useState, useContext, createContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") ?? null);



    const userValue = {
        token
    };

    return (
        <UserContext.Provider value={userValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
