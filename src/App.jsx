import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Painel from "./Pages/Painel";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuarioLogado(!!user);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={usuarioLogado ? <Navigate to="/painel" /> : <Login />}
        />
        <Route
          path="/cadastro"
          element={usuarioLogado ? <Navigate to="/painel" /> : <Cadastro />}
        />
        <Route
          path="/painel"
          element={usuarioLogado ? <Painel /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
