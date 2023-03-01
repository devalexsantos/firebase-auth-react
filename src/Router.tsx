import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { PrivateRouter } from "./PrivateRouter";


export function Router(){
    return (
        <Routes>
            <Route element={<PrivateRouter />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<SignUp />} />
        </Routes>
    )
}