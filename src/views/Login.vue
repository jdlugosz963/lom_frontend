<template>
  <div id="login">
      <form @submit="log_in">
        <input type="text" placeholder="Login" v-model="login">
        <input type="password" placeholder="Password" v-model="password">

        <input type="submit" value="Login!">
      </form>
      <p v-for="(mess, key) in messages" :key="key">{{mess}}</p>

      <router-link to="/register"> Still don't have account? </router-link>
      
    </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
    data: () => {
        return {
            login: "",
            password: "",
            messages: []
        }
    },
    methods: {
        async log_in(e) {
            e.preventDefault()

            const data = {
                "username": this.login,
                "password": this.password
            }
            try{
                const res = await AuthService.login(data)
                this.$store.dispatch('login', {token: res.token, user: res.user})
                this.$router.push('/') 
            } catch (error) {
                console.log(error.response.data)
                this.messages.push('Wrong username or password!')
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