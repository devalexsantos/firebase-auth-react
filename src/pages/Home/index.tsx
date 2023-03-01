import { useContext, useEffect, useState } from "react"
import { auth } from "../../service/firebase"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext"


export function Home() {
    const [loading, setLoading] = useState(true)
    const { user, killSessionFirebase } = useContext(AuthContext)

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


    return (
        <div>
            <h1>Email: {user?.email}</h1>
            <p>UID: {user?.uid}</p>
            <button onClick={killSessionFirebase} >Sair</button>
        </div>
    )
}