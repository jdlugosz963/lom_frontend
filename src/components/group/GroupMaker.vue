<template>
  <div class="searcher">
      <div class="text-2xl p-2"> Group maker </div>
      <form @submit="make_group">
          <input
              v-model="group_name"
              ref='input'
              type="text"
              placeholder="Nazwa grupy..."
              class="w-full bg-gray-800 mb-2 mt-10 p-2"
              @keydown="hotkeys"
          />

          <select multiple class="w-full bg-gray-800 p-4 mb-10" v-model="users_selection">

            <option
              v-for="user in users"
              :key="user.id"
              :value="user.id">
              {{user.username}}
            </option>

          </select>

          <input type="submit" class="w-full p-2 bg-gray-800">
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

        if(status === 201) {
          this.$notify({
            type: "success",
            text: "Group created!"
          })

          this.close()
        }

      },

    async set_users() {
      const {status, data} = await AuthService.info("all=true")

      if(status === 200)
        this.users = data.users
      else
        this.close()

      console.log(this.users)
    },

    hotkeys(e) {
        switch(e.code) {
            case 'Delete':
                e.preventDefault()
                this.$emit('close')
                break
        }
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

<style scoped>

.group_maker {
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
