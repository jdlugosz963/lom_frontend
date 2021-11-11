import axios from "axios";
import Vue from 'vue'

const url = 'http://localhost:8000/api/auth/'

const error_notify = (error) => {
    for (const [key, values] of Object.entries(error.response.data)) {
        values.forEach(value => {
            Vue.notify({
                type: 'error',
                title: value,
                text: key
            })
        })
    }
    return {
        data: error.response.data,
        status: error.response.status
    }
}

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

    }
}