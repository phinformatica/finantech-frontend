import { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const cadastrar = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Usuário cadastrado com sucesso!");
      navigate("/painel");
    } catch (error) {
      alert("Erro ao cadastrar usuário: " + error.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={cadastrar}>Cadastrar</button>
      <button onClick={() => navigate("/")}>Voltar ao login</button>
    </div>
  );
}
