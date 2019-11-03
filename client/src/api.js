import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
})

export const bbslecApi = {
    bbslec_getall: () => api.get('/bbslec')
    bbslec_post: () => api.post('/bbslec')
}

export const bbsworkApi = {
    bbswork_getall: () => api.get('/bbswork')
}

export default api;