<template>
  <div class="group_view">
      <h1> {{group.name}} </h1>
      <div class="messages">
        <Message v-for="message in messages" :key="message.id" :message="message" />
      </div>

      <form @submit="send_message">
        <input v-model="message" type="text" ref="input" />
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

      if(status===200)
        this.messages = data.messages
    },

    push_message(message) {
      if(message.receiver == this.group.id)
        this.messages.push(message)
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

<style scoped>
.group_view {
  width: 25%;
}

.messages {
  overflow:auto;
  height: 300px;
}
</style>
