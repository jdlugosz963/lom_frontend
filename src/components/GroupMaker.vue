<template>
  <div class="group_maker">
      Group maker
      <form @submit="make_group">
          <input
              v-model="group_name"
              ref='input'
              type="text"
              placeholder="Type group name..."
          />

          <select multiple v-model="users_selection">

            <option
              v-for="user in users"
              :key="user.id"
              :value="user.id">
              {{user.username}}
            </option>

          </select>
      </form>
  </div>
</template>

<script>
import ChatService from "@/services/ChatService.js"
import AuthService from "@/services/AuthService.js"

export default {
  data() {
    return {
      group_name: "",
      users_selection: [],
      users: []
    }
  },

  methods: {
      close() {
        this.$emit('close')
      },

      async make_group(e) {
        e.preventDefault()
        console.log(this.users_selection)
        const {status} = await ChatService.group_create({
          "name": this.group_name,
          "users": this.users_selection
        })

        if(status === 201)
          this.$notify({
            type: "success",
            text: "Group created!"
          })
      },

    async set_users() {
      const {status, data} = await AuthService.info("all=true")

      if(status === 200)
        this.users = data.users
      else
        this.close()

      console.log(this.users)
    }
  },

  created() {
    this.$nextTick(function () {
      this.$refs.input.focus()

      this.set_users()
    })
  }
}
</script>
