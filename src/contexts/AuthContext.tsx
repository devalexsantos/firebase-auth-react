import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../service/firebase";
import { useNavigate } from 'react-router-dom'

interface SignInCredential {
    email: string
    password: string
}

interface User {
    email: string | null
    uid: string | null
}

interface AuthContextProps {
    user: User | null
    loading: boolean
    error: string | null
    signIn: (credentials: SignInCredential)=> Promise<void>
    setLoading: (state: boolean) => void
    killSessionFirebase: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthContextProviderProps {
    children: React.ReactNode
}

export function AuthContextProvider({children}: AuthContextProviderProps){
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()


    const signIn = async (credentials: SignInCredential) => {
        setLoading(true)
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((response) => {
            setUser({email: response.user.email, uid: response.user.uid})
            setError(null)
        })
        .catch(error => setError(error.code))
        setLoading(false)
    }

    const killSessionFirebase = () => {
        signOut(auth).then(()=> {
            navigate('/login')
        }).catch(error => console.log(error.message))
    }

    useEffect(()=> {
        setLoading(true)
        auth.onAuthStateChanged((user) => {
            if(user){
                setUser({email: user.email, uid: user.uid})
            } else {
                setUser(null)
            }
        })
        setLoading(false)
    }, [])


    return(
        <AuthContext.Provider value={{loading, user, error, signIn, setLoading, killSessionFirebase}}>
            {children}
        </AuthContext.Provider>
    )
}