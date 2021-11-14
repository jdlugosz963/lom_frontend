export default {
    logout() { 
        console.log("logout :)")
    },
    last_message() {
        console.log("last massege")
    },
    chat() {
        return {
            search() {console.log("search")},
            add() {console.log("add friend")},
            next_tab() {
                return {
                    hi_in_next_tab() {
                        console.log('Hello there! :)')
                    }
                }
            }
        } 
    },
    notifications() {},
    users() {},
    groups() {}
}
