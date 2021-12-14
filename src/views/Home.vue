<template>
  <div class="home" v-hotkey="keymap">
    Hi {{get_username}}!
      <Searcher
          v-if="popups.searcher_show"
          @close="hideSearcher"
          @toogle_group_maker="toogleGroupShow"
      />

      <GroupMaker
          v-if="popups.group_maker_show"
          @close="hideGroup"

      />
  </div>
</template>

<script>
import Searcher from '@/components/searcher/Searcher.vue'
import GroupMaker from '@/components/group/GroupMaker.vue'

const popups = {
    searcher_show: false,
    group_maker_show: false
 }

export default {
  data() {
    return {
        popups
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    
    toogleSearcherShow() {
      this.popups.searcher_show = !this.popups.searcher_show
      this.popups.group_maker_show = false
    },
    hideSearcher() { this.popups.searcher_show = false },

    toogleGroupShow() { this.popups.group_maker_show = !this.popups.group_maker_show },
    hideGroup() { this.popups.group_maker_show = false }
  },

  computed: {
    get_username() {
      return this.$store.getters['get_user'].username
    },

    keymap() {
      return { 
        'ctrl+esc': this.toogleSearcherShow,
        'ctrl+shift+p': this.toogleSearcherShow,
        'esc': this.hideGroup
      }
    }
  },

  components: {
      Searcher,
      GroupMaker
  },

  created() {
    if(!this.$store.getters['is_logged_in']) {
      this.$router.push('/login')
    }
  }
  
}
</script>
