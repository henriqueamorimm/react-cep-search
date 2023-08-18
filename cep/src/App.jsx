import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from '../api/cep';
import axios from 'axios'; 


const App = () => {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Preencha com seu CEP!');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      console.log(response.data);

      const webhookUrl = 'SEU_WEBHOOK';
      const message = {
        content: `Informações do CEP:\nCEP: ${cep.cep}\nLogradouro: ${cep.logradouro}\nComplemento: ${cep.complemento}\nBairro: ${cep.bairro}\nLocalidade: ${cep.localidade}\nUF: ${cep.uf}\nDDD: ${cep.ddd}`,
      };

  
      await axios.post(webhookUrl, message);

    } catch {
      alert('Erro ao fazer requisição.');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Search CEP</h1>

      <div className="containerInput">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Your CEP Here"
        />

        <button onClick={handleSearch} className="bSearch">
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>Logradouro: {cep.logradouro}</span>
        <span>Complementos: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>
          {cep.localidade} - {cep.uf}
        </span>
        <span>DDD: {cep.ddd}</span>
      </main>
    </div>
  );
};

export default App;
