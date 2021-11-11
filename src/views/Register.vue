<template>
  <div id="register">
      <form @submit="register">
        <input type="text" placeholder="Login" v-model="login">
        <input type="password" placeholder="Password" v-model="password">
        <input type="password" placeholder="Repeat password" v-model="repeat_password">     

        <input type="submit" value="Register!">
      </form>

      <router-link to="/login">Already have an account?</router-link>
      
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
        }
    },
    methods: {
        async register(e) {
            this.messages = []

            e.preventDefault()
            if(this.password !== this.repeat_password){
                this.$notify({
                    type: 'warn',
                    text: 'Passwords not equals',
                })
                this.password = ""
                this.repeat_password = ""

                return null
            }

            const register_data = {
                "username": this.login,
                "password": this.password
            }

            const { status } = await AuthService.register(register_data)
            if (status === 200) {
                this.$notify({
                    type: 'success',
                    text:'Register success, you can now login.!'
                })
                this.$router.push('/login')
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