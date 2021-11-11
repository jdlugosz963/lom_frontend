<template>
  <div class="home">
    Hi {{get_username}}!
    <input type="button" value="Logout!" @click="logout">
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },

  computed: {
    get_username() {
      return this.$store.getters['get_user'].username
    }
  },

  created() {
    if(!this.$store.getters['is_logged_in']) {
      this.$router.push('/login')
    }
  }
  
}
</script>
