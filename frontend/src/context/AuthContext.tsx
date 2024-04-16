import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { checkAuthStatus, logginUser } from '../helpers/api-communicator';

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch if the user's cookies are valid then skip login
        async function CheckStatus(){
            const data=await checkAuthStatus();
            if(data){
                setUser({email:data.email,name:data.name})
                setIsLoggedIn(true);
            }}
            CheckStatus()
    }, []);

    const login = async (email: string, password: string) => {

        const data=await logginUser(email,password);
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true);
        }
        // Implement login functionality here
    };

    const signup = async (name: string, email: string, password: string) => {
        // Implement signup functionality here
    };

    const logout = async () => {
        // Implement logout functionality here
    };

    const value: UserAuth = {
        user,
        isLoggedIn,
        login,
        logout,
        signup
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
