<template>
  <div class="home" v-hotkey="keymap">
      Hi {{get_username}}!

      <div v-for="group in groups" :key="group.name" >
          <GroupSender
              :group="group"
              :socket="socket"
          />
      </div>

      <GroupMaker
          v-if="popups.group_maker_show"
          @close="hideGroup"
      />

      <Searcher
          v-if="popups.searcher_show"
          @close="hideSearcher"
          @toogle_group_maker="toogleGroupShow"
          @group_set="openGroup"
      />
  </div>
</template>

<script>
import Searcher from '@/components/searcher/Searcher.vue'
import GroupMaker from '@/components/group/GroupMaker.vue'
import GroupSender from  '@/components/group/GroupSender.vue'
import io from 'socket.io-client'

const popups = {
    searcher_show: false,
    group_maker_show: false
 }

export default {
  data() {
    return {
        popups,
        groups: [],
        socket: Object
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
    hideGroup() { this.popups.group_maker_show = false },

    openGroup(group) {
        let groups = this.groups.slice()
        let index = groups.findIndex(o => o.name===group.name)

        if(index >= 0)
            groups.splice(index, 1)
        else
            groups.push(group)

        this.groups = groups
    }
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
      GroupMaker,
      GroupSender
  },

  created() {
    if(!this.$store.getters['is_logged_in']) {
      this.$router.push('/login')
    }

    this.socket = io()
    this.socket.auth = { token: this.$store.getters.get_token };
    this.socket.connect();

    this.socket.on("connect", () => {
        console.log("Socket connected!")
    });

    this.socket.on("disconnect", () => {
        console.log("Scoket dsiconected")
    })
  }
  
}
</script>
