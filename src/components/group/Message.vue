<template>
  <div class="message">
      <div class="sender">{{ get_message_user }}</div>
      <div class="content">{{ get_message_content }}</div>
      <div class="date">{{ get_message_date }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object
  },

  computed: {
    get_message_user() { return this.message.sender.username },
    get_message_content() { return this.message.message },
    get_message_date() {
      let date = new Date(this.message.create_date)
      return `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
    },
  },

  created() {
    this.$nextTick(function () {
    })
  }
}
</script>

<style scoped>
.message {
  width: 100%;
}
</style>
