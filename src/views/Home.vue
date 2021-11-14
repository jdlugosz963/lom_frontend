<template>
  <div class="home" v-hotkey="keymap">
    Hi {{get_username}}!
    <input type="button" value="Logout!" @click="logout">
    <Searcher v-if="show" @close="hide" />
  </div>
</template>

<script>
import Searcher from '@/components/Searcher.vue'

export default {
  data() {
    return {
      show: false,
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    
    toogleShow() { this.show = !this.show },
    hide() { this.show = false }
  },

  computed: {
    get_username() {
      return this.$store.getters['get_user'].username
    },

    keymap() {
      return { 
        'ctrl+esc': this.toogleShow,
        'ctrl+shift+p': this.toogleShow,
        'esc': this.hide
      }
    }
  },

  components: {
    Searcher
  },

  created() {
    if(!this.$store.getters['is_logged_in']) {
      this.$router.push('/login')
    }
  }
  
}
</script>
