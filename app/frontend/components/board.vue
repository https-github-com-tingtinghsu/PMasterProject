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
  
</style>