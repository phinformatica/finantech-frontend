import { useState } from 'react';
import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        setDoc(doc(db, "usuarios", userCredential.user.uid), { email });
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      })
      .catch(() => {
        alert("Erro ao cadastrar.");
      });
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={handleCadastro}>Cadastrar</button>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default Cadastro;
