import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../service/firebase";
import { FormContainer, SignUpContainer } from "./styles";
import { useNavigate } from 'react-router-dom'

export function SignUp(){
    const [userInputed, setUserInputed] = useState('')
    const [passwordInputed, setPasswordInputed] = useState('')
    const [loading, setLoading] = useState(false)
    const { signUp, error } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(()=> {
        auth.onAuthStateChanged((user) => {
            if(user){
                navigate('/')
            }
        })
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        await signUp({email: userInputed, password: passwordInputed})
        setLoading(false)
    }


    return (
        <SignUpContainer>
            <FormContainer>
                <h1>Cadastre-se</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>E-mail:</span>
                        <input 
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            value={userInputed}
                            onChange={(e)=> setUserInputed(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <span>Senha:</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="*******"
                            value={passwordInputed}
                            onChange={(e)=> setPasswordInputed(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit">Cadastrar-se</button>
                </form>
                {loading && <p>Carregando...</p>}
                {error === 'auth/email-already-in-use' && <p>E-mail já em uso.</p>}
                {error === 'auth/weak-password' && <p>Senha fraca, digite uma senha com mais de 06 dígitos.</p>}
            </FormContainer>
        </SignUpContainer>
    )
}