<template>
  <div :id="workspace" class="workspace">
    <h2>{{ workspace.name }} </h2>
    <Board v-for="board in boards" :board="board" :key="board.id" ></Board>
  </div>
</template>


<script>
  import Rails from '@rails/ujs';
  import Board from 'components/board';
  export default {
  name: 'Workspace',
  props: ["workspace"], 
  components: { Board },   
  // 從外層餵workspace資料
  data: function(){
    return {
        content: '',
        boards: this.workspace.boards, // `v-for`就可以改成boards
    }
  },

};

</script>

<style lang="scss" scoped>
  .workspace{
    color: #000;
    font-weight: 600;
  }
</style>