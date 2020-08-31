<template>
  <div :id="workspace" class="workspace">
    <h2>{{ workspace.name }} </h2>
    <draggable>
      <Board v-for="board in boards" :board="board" :key="board.id" ></Board>
    </draggable>
  </div>
</template>


<script>
  import Rails from '@rails/ujs';
  import Board from 'components/board';
  import draggable from 'vuedraggable';

  export default {
  name: 'Workspace',
  props: ["workspace"], 
  components: { Board, draggable  },   
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
    @apply .text-xl;
  }
</style>