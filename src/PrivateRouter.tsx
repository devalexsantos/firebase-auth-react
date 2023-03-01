import { useEffect, useState } from "react";
import { auth } from "./service/firebase";
import { Outlet, useNavigate } from "react-router-dom";

export function PrivateRouter() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(()=> {
        setLoading(true)
        auth.onAuthStateChanged((user) => {
            if(!user){
                navigate('/login')
            }
        })
        setLoading(false)
    }, [])

    if(loading){
        return <div>Carregando...</div>
    }

    return <Outlet />
}