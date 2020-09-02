<template>
  <div :id="workspace" class="workspace">
    <h2><i class="fas fa-caret-down"></i>{{ workspace.name }} </h2>
    <draggable ghost-class="ghost" v-model="boards" group="board" @change="boardMoved">
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

  data: function(){
    return {
        content: '',
        boards: this.workspace.boards, // `v-for`就可以改成boards
    }
  },

  methods: {
    boardMoved(event){
      // console.log(event);

    },
    createBoard(event){
      event.preventDefault();
      let evt = event.added || event.moved;
      if (evt){
      let el = evt.element; // 知道哪個board被移動
      let board_id = board.id;

      let boardData = new FormData();
      boardData.append("board[workspace_id]", this.workspace.id);
      boardData.append("board[position]", evt.newIndex + 1);

      Rails.ajax({
        })
        }
    }
  },



};

</script>

<style lang="scss" scoped>
  .ghost {
    @apply .border-2;
  }
  .workspace {
    @apply .text-xl .mx-3 .my-2 .px-3;
  }
  .fa-caret-down {
    margin-right: 5px;
  }
</style>