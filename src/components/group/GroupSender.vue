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
      messages: []
    }
  },

  props: {
    group: Object
  },

  methods: {
      close() {
        this.$emit('close')
      },

    send_message(e) {
      e.preventDefault()
      console.log(this.message)
      this.message = ""
    },

    async get_messages() {
      let {status, data} = await ChatService.get_group_messages(this.group.id)

      console.log(data)

      if(status===200)
        this.messages = data.messages
    }
  },

  components: {
    Message
  },

  created() {
    this.$nextTick(function () {
      this.$refs.input.focus()

      this.get_messages()
    })
  }
}
</script>

<style scoped>

</style>
