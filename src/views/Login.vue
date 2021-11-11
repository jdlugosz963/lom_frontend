<template>
  <div id="login">
      <form @submit="log_in">
        <input type="text" placeholder="Login" v-model="login">
        <input type="password" placeholder="Password" v-model="password">

        <input type="submit" value="Login!">
      </form>

      <router-link to="/register"> Still don't have an account? </router-link>
      
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