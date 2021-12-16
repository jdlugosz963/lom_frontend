<template>
  <div class="w-full text-left mt-2" :class="{'text-right': is_message_mine}">
      <div class="">{{ get_message_user }}</div>
      <div class="">{{ get_message_content }}</div>
      <div class="">{{ get_message_date }}</div>
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

    is_message_mine() { return this.message.is_mine }
  },

  created() {
    this.$nextTick(function () {
    })
  }
}
</script>
