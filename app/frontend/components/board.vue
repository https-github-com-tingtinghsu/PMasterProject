<template>
    <div :id="board" class="board">
      {{ board.name }}
    </div>
</template>


<script>

export default {
  name: 'Baord',
  props: ["board"],  

  data: function(){
    return {
    }
  },

};

</script>

<style lang="scss" scoped>
  .board {
    @apply .bg-green-300 .text-sm .my-2 .mx-1 .px-3 .py-2 .rounded-md;
  }
</style>