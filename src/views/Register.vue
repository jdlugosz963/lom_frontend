<template>
  <div id="register" class="inset-center bg-gray-900 p-4 rounded-lg shadow-lg">
      <form @submit="register">
        <input type="text" placeholder="Login" v-model="login" class="w-full bg-gray-800 p-2 mb-2">
        <input type="password" placeholder="Password" v-model="password" class="w-full bg-gray-800 p-2 mb-2">
        <input type="password" placeholder="Repeat password" v-model="repeat_password" class="w-full bg-gray-800 p-2 mb-4">

        <input type="submit" value="Register!" class="w-full bg-gray-800 p-2 mb-2">
      </form>

      <router-link to="/login">Juz masz konto?</router-link>
      
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
