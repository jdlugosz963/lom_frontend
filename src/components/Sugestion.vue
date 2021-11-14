<template>
  <div class="sugestion">
      <span>{{command.name}}</span>
  </div>
</template>

<script>
export default {
    props: {
        command: Function
    }

}
</script>

<style scoped>
    .sugestion {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        background-color: #303030;

        margin-top: 10px;
        padding: 5px;
        padding-right: 0px;
    }
</style>