<template>
  <div class="home" v-hotkey="keymap">
      <div class="inset-center">
        <div class="text-center bg-gray-900 p-5 rounded-lg">
          <p class="text-3xl capitalize">Witaj, {{get_username}}!</p>
          <p class="mt-5"><kbd>Ctl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> </p>
        </div>
      </div>

     <div class="flex flex-row justify-around">
          <GroupSender
              v-for="group in groups"
              :group="group"
              :socket="socket"
              :key="group.name"
              @close="closeGroupSender"
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
import ChatService from '@/services/ChatService.js'
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

        if(groups.length >=3)
          groups.shift()

        if(index >= 0)
            groups.splice(index, 1)
        else
            groups.push(group)

        this.groups = groups
    },

    async joinAllGroupsSocket() {
        const {data, status} = await ChatService.get_all_user_groups()

        if(status === 200)
            data.forEach(group => {
                this.socket.emit("join_group", {group_id: group.id})
            })
    },

    closeGroupSender(group_id) {
      const index = this.groups.findIndex(group => group.id === group_id)
      this.groups.splice(index, 1)
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
    },
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
    this.joinAllGroupsSocket()

    this.socket.on("connect", () => {
        console.log("Socket connected!")
    });

    this.socket.on("disconnect", () => {
        console.log("Scoket dsiconected")
    })

    this.socket.on("receive_group_message", async ({message}) => {
      const index = this.groups.findIndex(group => {return group.id === message.receiver})

      if(index<0) {
          const {status, data} = await ChatService.get_group_detail(message.receiver)
          if(status!==200)
              return

          this.$notify({
              type: 'success',
              title: `Groupa: ${data.name}`,
              text: `${message.sender.username}, napisal "${message.message}"`,
              duration: -1
          })
      }
    })
  }

}
</script>
