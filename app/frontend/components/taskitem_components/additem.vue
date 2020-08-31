<template>
    <div class="taskList">
        <div class="item" >
          <div class="checkbox">
                <input type="checkbox">
          </div>
          <div class="textcontent" v-if="item.id !== cacheTodo.id">
              <!-- 假設item.id 不等於 cacheTodo.id(預設是空的)就讓顯示出來 -->
            <span @dblclick = "editTodo(item)">{{item.title}}</span>
          </div>
          <div class="textcontent">
            <input class="editinput" type="text" v-model="cacheTitle"
            v-if="item.id === cacheTodo.id"
            @keyup.enter = "doneEdit(item)"
            @keyup.esc="cancelEdit()">
             <!-- 假設item.id 等於 cacheTodo.id(找到相對應的id)就讓顯示出來  -->
             <!-- doneEdit需要將改好的item傳回去 -->

          </div>
          <div class="comment-icon">
            <button @click = "editTodo(item)" ><i class="far fa-edit"></i></button>
            <i class="far fa-comment"></i>
          </div>
        </div> 
   </div>
</template>


<script>
export default {
  name:"Additem",
  props: ["item"],
  data: function(){
    return {
    cacheTodo: {},
    // 暫時存放todo的地方
    cacheTitle:'',
    // 編輯預存的地方
    }
  },
  methods:{
      editTodo: function(item){
      console.log(item)
      this.cacheTodo = item
      // 將item指定給編輯的todo
      this.cacheTitle =item.title;
      // 將item.title指定給編輯的Title
      },
      cancelEdit:function(){
      this.cacheTodo = {}
      },
      doneEdit: function(item){
        item.title = this.cacheTitle;
        this.cacheTitle = "";
        // 清出acheTitle輸入框
        this.cacheTodo = {};
        // 將原本的acheTodo 替換回來
      }
  }
  
}
</script>


<style scoped>

.taskList{
  display: flex;
  /* border: hotpink solid 1px; */
  /* width: 100%; */
  /* margin: 50px; */
  /* width: 100%; */
}

.taskList .item{
  display: flex;
  width: 100%;
  height: 50px;
  border: solid rgb(206, 195, 195) 1px;
  align-items: center;
  /* box-sizing: border-box; */
  
}
.textcontent{
  /* border: red solid 1px; */
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

.textcontent span{
  display : inline-block;
  overflow: hidden;
  text-overflow : ellipsis;
  white-space : nowrap;
}
.editinput{
  width: 100%;
  height: 100%;
}
.comment-icon button{
  background-color: rgb(245, 246, 250); 
  color: black; 
  border: 1px solid #fbfdfb;
  margin: 10px;
  transition-duration: 0.4s;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
}
.comment-icon button:hover {
  background-color: #4CAF50;
  color: white;
}

.checkbox{
  width: 10px;
  height: 50px;
  background-color: rgb(90, 245, 211);
  position: relative;
  overflow: hidden;
}

.checkbox:hover{
 width: 50px;
 transition: .3s;
}
.checkbox input{
  width: 20px;
  height: 20px;
  position: absolute;
  left: 15px;
  bottom: 15px;
}

.comment-icon{
  margin-left: auto;
  padding: 10px;
}
.fa-comment{
  font-size: 30px;
}
.fa-edit{
  font-size: 25px;
}


</style>