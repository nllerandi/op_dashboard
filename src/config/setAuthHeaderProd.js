import axios from 'axios'

export const setAuthHeaderProd = () => {
    axios.defaults.headers.common['authorization'] = process.env.AUTH_HEADER
}