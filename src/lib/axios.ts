import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3331', // Coloque a URL base da sua API aqui
  headers: {
    'Content-Type': 'application/json'
    // Adicione quaisquer headers adicionais necessários aqui
  },
  withCredentials: true
});

export default api