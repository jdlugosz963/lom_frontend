import axios from "axios";
import error_notify from './NotifyErrorService.js'

const url = 'http://localhost:8000/api/chat/'

export default {
    async group_create(data) {
        return await axios
        .post(url+'groups/', data)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(error => error_notify(error))
    }
}
