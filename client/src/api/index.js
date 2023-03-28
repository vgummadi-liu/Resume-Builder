import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertUser = (payload) => api.post('/user',payload)
export const checkUser = (payload) => api.post('/login',payload)


const apis = {
    insertUser,
    checkUser
}

export default apis;