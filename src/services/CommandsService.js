import AuthService from "./AuthService"
import store from "@/store/index.js"
import router from '@/router/index.js'

export default {
    logout() { 
        AuthService.logout()
        store.dispatch('logout')
        router.push('/login')
    },
    friends() {
        console.log("list")
    },
    tab() {
        return {
            on() {},
            off() {}
        }
    }
}
