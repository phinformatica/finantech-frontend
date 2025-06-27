import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Painel() {
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const navigate = useNavigate();

  // Buscar dados do Firestore
  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dados"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDados(lista);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Função para cadastrar novo dado
  const cadastrarDado = async (e) => {
    e.preventDefault();

    if (nome === "" || valor === "") {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await addDoc(collection(db, "dados"), {
        nome,
        valor,
      });
      setNome("");
      setValor("");
      buscarDados(); // Atualiza a lista após cadastro
    } catch (error) {
      console.error("Erro ao cadastrar dado:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <div>
      <h1>Painel - Finantech</h1>
      <button onClick={handleLogout}>Sair</button>

      <h2>Cadastrar novo dado:</h2>
      <form onSubmit={cadastrarDado}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Dados cadastrados:</h2>
      {dados.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <ul>
          {dados.map((item) => (
            <li key={item.id}>
              <strong>Nome:</strong> {item.nome} | <strong>Valor:</strong> {item.valor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Painel;
