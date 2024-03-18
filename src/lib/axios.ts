import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: 'http://localhost:3331', // Coloque a URL base da sua API aqui
    headers: {
        'Content-Type': 'application/json',
        // Adicione quaisquer headers adicionais necessários aqui
    },
    withCredentials: true,
})

api.interceptors.request.use(async (config) => {
    // Obtenha o token do cookie
    if (typeof window !== 'undefined') {
        const authToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        )
        console.log(authToken)
        if (authToken) {
            // Define o token como cabeçalho de autorização
            config.headers.authorization = `Bearer ${authToken}`
        }
    }

    return config
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // Se ocorrer um erro na resposta, redirecione para a página de login
        if (typeof window !== 'undefined') {
            return Promise.reject(error)
        }
    }
)
export default api
