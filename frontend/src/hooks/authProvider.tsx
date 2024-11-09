import React, {useState, createContext, useContext} from "react";
import {parseJwt} from '../utils/common';
import http from "../services/http";

// https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5

interface LoginHandlerData {
    email: string;
    password: string;
    is_company_login: boolean;
}

const AuthContext = createContext({
    access_token: "",
    user: {},
    loginHandler: (_: LoginHandlerData): Promise<boolean> => Promise.resolve(false),
    logoutHandler: () => {},
});

interface authProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<authProviderProps> = props => {
    const [access_token, setAccessToken] = useState( localStorage.getItem("access_token") || "");
    const [user, setUser] = useState( parseJwt( localStorage.getItem("access_token") || "" ) );

    const loginHandler = async(data: LoginHandlerData) => {
        try {
            const res = await http.post('/auth/signin', data);
            if(res.data) {
                setAccessToken(res.data.access_token);
                localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
                http.setAuthToken(res.data.access_token);
                // get user data from payload of token
                setUser( parseJwt(res.data.access_token) );
                return true;
            }
            return false;
        } catch(err) {
            console.log("Login error: ", err);
            return false;
        }
    }

    const logoutHandler = () => {
        setUser({});
        setAccessToken("");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        // navigate('/login');
        // window.location.href = '/signin';
    }

    return <AuthContext.Provider value={{access_token, user, logoutHandler, loginHandler: (d: LoginHandlerData) => loginHandler(d)}}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);