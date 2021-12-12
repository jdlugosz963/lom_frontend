import AuthService from "./AuthService"
import store from "@/store/index.js"
import router from '@/router/index.js'

export default {
    groups() {
        return {
            send(searcher) {console.log(searcher)},

            make(searcher) {
                searcher.$emit('toogle_group_maker')
            },
        }
    },

    logout() {
        AuthService.logout()
        store.dispatch('logout')
        router.push('/login')
    },
}
