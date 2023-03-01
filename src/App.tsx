import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GlobalStyle } from "./layout/default";
import { Router } from "./Router";

export function App(){
  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Router />
          <GlobalStyle />
      </AuthContextProvider>
    </BrowserRouter>
    
  )
}