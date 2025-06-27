import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Painel() {
  const [dados, setDados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    buscarDados();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <div>
      <h1>Painel - Finantech</h1>
      <button onClick={handleLogout}>Sair</button>
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
