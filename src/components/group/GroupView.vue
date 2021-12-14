<template>
  <div class="group_view">
      Group maker
      <form @submit="send_message">
        <inout type="text" ref="input" />
      </form>
  </div>
</template>

<script>
import ChatService from "@/services/ChatService.js"

export default {
  data() {
    return {
    }
  },

  methods: {
      close() {
        this.$emit('close')
      },
  },

  created() {
    this.$nextTick(function () {
      this.$refs.input.focus()
    })
  }
}
</script>

<style scoped>

.group_view {
    position: absolute;
    width: 30%;
    height: 80%;
    top: 50%;
    left: 50%;
    background-color: #202020;
    padding: 20px;
    border-radius: 10px;
    transform: translate(-50%, -50%);
  }

</style>
