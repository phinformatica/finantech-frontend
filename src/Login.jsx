import { useState } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        alert("Login realizado com sucesso!");
        navigate("/painel");
      })
      .catch(() => {
        alert("Erro ao fazer login.");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={() => navigate("/cadastro")}>Cadastrar</button>
    </div>
  );
}

export default Login;
