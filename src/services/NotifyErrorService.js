import Vue from 'vue'
import router from '@/router/index.js'
import store from "@/store/index.js"


const error_notify = (error) => {
    if(error.response.status === 401) {
        Vue.notify({
            type: 'error',
            title: 'Please login again!',
            text: 'Token expire'
        })

        store.dispatch('logout')
        router.push('/login')
    }
    else
        for (const [key, values] of Object.entries(error.response.data)) {
            console.log(values)
            values.forEach(value => {
                Vue.notify({
                    type: 'error',
                    title: value,
                    text: (key !== 'non_field_errors') ? key : ''
                })
            })
        }

    return {
        data: error.response.data,
        status: error.response.status
    }
}

export default error_notify
