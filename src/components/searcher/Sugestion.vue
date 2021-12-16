<template>
  <div class="w-auto bg-gray-700 p-2 text-center mt-5">
      <span>{{sugestion[0]}}</span>
  </div>
</template>

<script>
export default {
    props: {
        sugestion: Array
    },
}
</script>
