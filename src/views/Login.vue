<template>
  <div id="login" class="inset-center bg-gray-900 p-4 rounded-lg shadow-lg">
      <form @submit="log_in">
        <input type="text" placeholder="Login" v-model="login" class="w-full bg-gray-800 p-2 mb-2">
        <input type="password" placeholder="Password" v-model="password" class="w-full bg-gray-800 p-2 mb-4">

        <input type="submit" value="Login!" class="w-full bg-gray-800 p-2 mb-2">
      </form>

      <router-link to="/register"> Nadal nie masz konta? </router-link>
      
    </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
    data: () => {
        return {
            login: "",
            password: "",
        }
    },
    methods: {
        async log_in(e) {
            e.preventDefault()

            const login_data = {
                "username": this.login,
                "password": this.password
            }

            const {data, status} = await AuthService.login(login_data)

            if (status === 200) {
                this.$store.dispatch('login', {token: data.token, user: data.user})
                this.$notify({
                    type: 'success',
                    text: 'Success!'
                })
                this.$router.push('/')
            } 
        }
    },
    created() {
        if(this.$store.getters['is_logged_in']) {
            this.$router.push('/')
        }
    }

}
</script>

<style>

</style>
