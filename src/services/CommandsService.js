import AuthService from "./AuthService"
import ChatService from "./ChatService"
import store from "@/store/index.js"
import router from '@/router/index.js'

function set_groups(data) {
    return {[data.name.replace(" ", "_")]() {console.log(data.name)}}
}

export default {
    groups() {
        return {
            async send() {
                const {data, status} = await ChatService.get_all_user_groups()
                if (status!==200)
                    return {}
                const test1 = set_groups(data[0])
                const test2 = set_groups(data[0])
                return {test1, test2}
            },

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
