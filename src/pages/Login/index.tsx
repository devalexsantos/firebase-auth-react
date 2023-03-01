import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContainer, LoginContainer } from "./styles";
import { useNavigate } from 'react-router-dom'
import { auth } from "../../service/firebase";

export function Login(){
    const [userInputed, setUserInputed] = useState<string>('')
    const [passwordInputed, setPasswordInputed] = useState<string>('')
    const [loading, setLoading] = useState(true)

    const { signIn, error } = useContext(AuthContext)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        await signIn({email: userInputed, password: passwordInputed})
        setLoading(false)
    }

    const navigate = useNavigate();

    useEffect(()=> {
        setLoading(true)
        auth.onAuthStateChanged((user) => {
            if(user){
                navigate('/')
            }
        })
        setLoading(false)
    }, [])

    return (
        <LoginContainer>
            <FormContainer>
                <h1>Login</h1>
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

                    <button type="submit">Entrar</button>
                </form>
                {loading && <p>Carregando...</p>}
                {(error === 'auth/user-not-found' || error === 'auth/wrong-password') && <p>Usuário não encontrado ou password inválido.</p>}
                {(error === 'auth/too-many-requests') && <p>Você realizou muitas tentativas. Por favor aguarde um instante.</p>}
            </FormContainer>
        </LoginContainer>
    )
}