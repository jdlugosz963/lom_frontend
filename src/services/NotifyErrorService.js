import Vue from 'vue'

const error_notify = (error) => {
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
