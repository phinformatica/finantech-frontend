import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Painel() {
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  const cadastrarDado = async (e) => {
    e.preventDefault();

    if (!nome || !valor) {
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
      buscarDados();
    } catch (error) {
      console.error("Erro ao cadastrar dado:", error);
      alert("Erro ao cadastrar dado. Tente novamente.");
    }
  };

  return (
    <div style={estilo.container}>
      <h1 style={estilo.titulo}>Painel - Finantech</h1>
      <button style={estilo.botaoSair} onClick={handleLogout}>Sair</button>

      <div style={estilo.card}>
        <h2 style={estilo.subtitulo}>Cadastrar novo dado:</h2>
        <form onSubmit={cadastrarDado} style={estilo.form}>
          <input
            style={estilo.input}
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            style={estilo.input}
            type="text"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <button style={estilo.botao} type="submit">Cadastrar</button>
        </form>
      </div>

      <div style={estilo.card}>
        <h2 style={estilo.subtitulo}>Dados cadastrados:</h2>
        {dados.length === 0 ? (
          <p style={estilo.aviso}>Nenhum dado encontrado.</p>
        ) : (
          <ul>
            {dados.map((item) => (
              <li key={item.id} style={estilo.listaItem}>
                <strong>Nome:</strong> {item.nome} | <strong>Valor:</strong> {item.valor}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const estilo = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    textAlign: "center",
    color: "#333",
  },
  subtitulo: {
    color: "#444",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  botao: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  botaoSair: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    float: "right",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    marginTop: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  listaItem: {
    backgroundColor: "#eee",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "4px",
  },
  aviso: {
    color: "#777",
  },
};

export default Painel;
