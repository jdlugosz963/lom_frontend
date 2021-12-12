import axios from "axios";
import error_notify from './NotifyErrorService.js'

const url = 'http://localhost:8000/api/auth/'

export default {
    async login(data) {
        return await axios
        .post(url+'login/', data)
        .then(res => {
            return {
                data: res.data,
                status: res.status
            }
        })
        .catch(error => error_notify(error))
    },

    async register(data) { 
        return await axios
        .post(url+'register/', data)
        .then(res => {
            return {
                data: res.data,
                status: res.status
            }
        })
        .catch(error => error_notify(error))

    },

    async info(data) {
        return await axios
        .get(url+'info/?'+data)
        .then(res => {
            return {
                data: res.data,
                status: res.status
            }
        })
        .catch(error => error_notify(error))

    },

    async logout() {
        return await axios
        .post(url+'logout/')
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(error => error_notify(error))
    }
}
