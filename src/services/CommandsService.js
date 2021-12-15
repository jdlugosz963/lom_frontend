import AuthService from "./AuthService"
import ChatService from "./ChatService"
import store from "@/store/index.js"
import router from '@/router/index.js'

function set_groups(searcher, data) {
    function group_command(group) {
        searcher.$emit("group_set", group)
    }

    let groups = {}

    data.forEach((group) => {
        groups[group.name] = () => group_command(group)
    })

    return groups
}


export default {
    groups() {
        return {
            async send(searcher) {
                const {data, status} = await ChatService.get_all_user_groups()
                if (status!==200)
                    return {}
                const groups = set_groups(searcher, data)
                return groups
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
