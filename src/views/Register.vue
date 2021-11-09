<template>
  <div id="register">
      <form @submit="register">
        <input type="text" placeholder="Login" v-model="login">
        <input type="password" placeholder="Password" v-model="password">
        <input type="password" placeholder="Repeat password" v-model="repeat_password">     

        <input type="submit" value="Register!">
      </form>
      <p v-for="(mess, key) in messages" :key="key">{{mess}}</p>

      <router-link to="/login">Already have account?</router-link>
      
    </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
    data: () => {
        return {
            login: "",
            password: "",
            repeat_password: "",
            messages: []
        }
    },
    methods: {
        async register(e) {
            this.messages = []

            e.preventDefault()
            if(this.password !== this.repeat_password){
                this.messages.push("Passwords not equals")
                this.password = ""
                this.repeat_password = ""

                return null
            }

            const data = {
                "username": this.login,
                "password": this.password
            }

            try {
                await AuthService.register(data)
                this.messages.push("Success!")
            }catch (error) {
                if(error.response.data.username)
                    this.messages.push(error.response.data.username[0])
                if (error.response.data.password)
                    this.messages.push(error.response.data.password[0])

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