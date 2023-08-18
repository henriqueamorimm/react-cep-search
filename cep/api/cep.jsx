import axios from "axios";

//api buscar cep
const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default api;