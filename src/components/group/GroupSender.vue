<template>
  <div
      class="bg-gray-900 w-full m-2 mb-0 border-4"
      :class="{
        'border-red-900': isFocus,
        'border-blue-900': !isFocus
      }"
  >

      <h1 class="text-2xl p-2 bg-blue-900"> {{group.name}} </h1>
      <div class="overflow-auto h-64 p-2" ref="messages">
        <Message v-for="message in messages" :key="message.id" :message="message" />
      </div>

      <form @submit="send_message">
          <input
              v-model="message"
              class="w-full bg-blue-900 p-2" placeholder="Napisz cos..." type="text" ref="input"
              @focus="isFocus=true"
              @blur="isFocus=false"
              @keydown="hotkeys"
          />
      </form>
  </div>
</template>

<script>
import Message from '@/components/group/Message.vue'
import ChatService from '@/services/ChatService.js'

export default {
  data() {
    return {
      message: "",
      messages: [],
      isFocus: false
    }
  },

  props: {
    group: Object,
    socket: Object
  },

  methods: {
      close() {
        this.$emit('close')
      },

    send_message(e) {
      e.preventDefault()
      console.log(this.message)
      this.socket.emit("send_group_message", {message: this.message, group: this.group})
      this.message = ""
    },

    async get_messages() {
      let {status, data} = await ChatService.get_group_messages(this.group.id)

      console.log(data)

      if(status===200){
        this.messages = data.messages
        this.scroll_down()
      }
    },

    push_message(message) {
      if(message.receiver == this.group.id){
        this.messages.push(message)
        this.scroll_down()
      }
    },

    scroll_down() {
      this.$nextTick(function () {
        const messages = this.$refs.messages
        console.log(messages)
        messages.scrollTop = messages.scrollHeight
      })
    },

    hotkeys(e) {
        switch(e.code) {
            case 'Delete':
                e.preventDefault()
                this.$emit('close', this.group.id)
                break
            case 'Escape':
                e.preventDefault()
                this.$refs.input.blur()
                break
        }
    }
  },

  components: {
    Message
  },

  created() {
    this.$nextTick(function () {
      this.$refs.input.focus()

      this.socket.emit("join_group", {group_id: this.group.id})
      this.socket.on("receive_group_message", ({message}) => {
        this.push_message(message)
      })
      this.get_messages()
    })
  }
}
</script>
