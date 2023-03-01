import styled from "styled-components";

export const SignUpContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ececec;
`

export const FormContainer = styled.div`
    margin-top: 10vh;
    min-width: 300px;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        
        label {
        display: flex;
        flex-direction: column;
        gap: 5px;

        input {
            padding: 0.5rem;
            border: #ececec 1px solid;
            border-radius: 6px;
        }
    }

    button {
        width: 100%;
        background-color: #29a8db;
        border: none;
        color: white;
        padding: 5px 8px;
        border-radius: 6px;
        cursor: pointer;
    }
}

    
`