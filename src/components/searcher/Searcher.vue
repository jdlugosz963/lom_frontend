<template>
  <div class="searcher">
    <input 
      type="text"
      class="w-full bg-gray-800 p-2 mb-4"
      v-model='search' 
      ref='input' 
      @keydown="hotkeys" 
      @blur="close()"
      placeholder="Search!"
    />

    <Sugestion 
      v-for="sugestion in sugestions" 
      :key="sugestion[0]"
      :sugestion="sugestion"
      :class="{'bg-gray-800': sugestion[0] === current[0]}"
    />
  </div>
</template>

<script>
import CommandsService from '@/services/CommandsService'
import Sugestion from '@/components/searcher/Sugestion.vue'

export default {
  data() {
    return {
      commands: CommandsService,
      search: '',
      sugestions: [],
      current: []
    }
  },

  methods: {
    set_sugestions() {
      const sugestions = []
      let is_current_set = false

      Object.entries(this.commands).forEach((element) => {
        if(element[0].startsWith(this.search) && element[1] instanceof Function) {
          sugestions.push(element)
          if(!is_current_set){ 
            this.current = element
            is_current_set = true;
          }
        }
      });
      this.sugestions = sugestions
    },

    close() {
      this.$emit('close')
    },

    change_current(a=1) {
      let index = this.sugestions.findIndex(element => element===this.current)
      let new_current = this.sugestions[index+a]

      if (new_current) this.current = new_current 
      else this.current = this.sugestions[0]
    },

    async execute_current() {
      let out = await this.current[1](this)

      if(out instanceof Object) {
        this.search = ''
        this.commands = out
      }
    },

    hotkeys(e) {
      switch(e.code) {
         case 'Escape':
          e.preventDefault()
          this.close()
          break
        case 'Delete':
          e.preventDefault()
          this.close()
          break
        case 'ArrowDown':
          e.preventDefault()
          this.change_current(1)
          break
        case 'ArrowUp':
          e.preventDefault()
          this.change_current(-1)
          break
        case 'Tab':
          e.preventDefault()
          this.change_current(1)
          break
        case 'Enter':
          e.preventDefault()
          this.execute_current()
          break
        case 'ShiftLeft':
          e.preventDefault()
          this.commands = CommandsService
          break
      }
    },
  },

  watch: {
    search() {
      this.set_sugestions()
    },

    commands() {
      this.set_sugestions()
    }
  },

  components: {
    Sugestion
  },

  created() {
    this.set_sugestions()

    this.$nextTick(function () {
      this.$refs.input.focus()
    })
  }
}
</script>
