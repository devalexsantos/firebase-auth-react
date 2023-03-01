import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"


export function Home() {
    const { user, killSessionFirebase } = useContext(AuthContext)

    if(!user){
        return <p>Carregando...</p>
    }

    return (
        <div>
            <h1>Email: {user.email}</h1>
            <p>UID: {user.uid}</p>
            <button onClick={killSessionFirebase} >Sair</button>
        </div>
    )
}