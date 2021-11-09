import axios from "axios";

const url = 'http://localhost:8000/api/auth/'

export default {
    async login(data) {
        return await axios
        .post(url+'login/', data)
        .then(res => res.data)
    },

    async register(data) { 
        return await axios
        .post(url+'register/', data)
        .then(res => res.data)
    }
}