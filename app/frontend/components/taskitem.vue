<template>
  <div id="taskitem">
    <div class="taskList">
        <div class="item-title"><h2>title</h2></div>
        <Additem id="taskItem" v-for="item in todos" :item="item" :id="item.id"></Additem>
        <div class="item-checkbox">
              <div class="checkbox1"></div>
              <input class="additem" type="text"  placeholder="+ Add" v-model = "newTodo" @keyup.enter = "addTodo">
        </div>
    </div> 
    <div class="taskList taskend item-checkbox">
            <div class="item-title plusbtn"><Addcolumnbtn></Addcolumnbtn>
            </div>
            <div class="columncontroller">
                 <div class="statuscolumn">
                   <Column v-for="item in todos"></Column>
                 </div>
              <div class="funtion_btn">
                <div class="add-column" v-for="item in todos"><button @click = "removeTodo(item)"><i class="far fa-trash-alt"></i></button>
                  <div class="checkbox1"></div>
                </div>
                <div class="add-column"><button @click = "addTodo">add</button>
                  <div class="checkbox1"></div>
                </div>
              </div>
            </div>
     </div> 
     
     
     
  </div>    
</template>


<script>
// import "@fortawesome/fontawesome-free/css/all.css"
// import tasklistVue from './tasklist.vue';
import Additem from "./taskitem_components/additem.vue"
import Addcolumnbtn from "./taskitem_components/addcolumn_btn.vue"
import Column from "./taskitem_components/column.vue"
export default {
  props: ["taskitem", "push" ],
  components: { Additem,Addcolumnbtn, Column },
  name:"taskitem",
  data: function(){
    return{
         isTransform: false,
          newTodo: '',
          item:'',
          cacheTodo: {},
          todos: [
            {
              id:'123',
              title:'你好',
            }
          ],
        }
         
  },
        
        methods: {
          addTodo: function(){
            
            let value = this.newTodo;
            // console.log(this.newTodo)
            let timestamp = Math.floor(Date.now());
            // 用時間來當每筆itme的id,使用Ｍath.floor使其為整數
            // console.log(timestamp)
            if (!value){
              return;
            }
            // 使輸入框不能為空白
            this.todos.push(
              {
                id: timestamp,
                title: value,
              }
              );
              // console.log(this.todos)
            this.newTodo = ''
            // 建立完後清除輸入框
          },
          removeTodo: function(todo){
            let newIndex = '';
            let data = this;
            data.todos.forEach(function(item,key){
              if (todo.id === item.id){
                newIndex = key
              }
              // console.log(todo.id)
              console.log(item.id)
            })
            this.todos.splice(newIndex,1)
            // 使用splice方法來進行刪除，記得帶入Ｋey和要刪除的筆數
          },
          
        },
}
</script>


<style scoped>
.taskList{
  /* border: rgb(38, 0, 255) solid 1px; */
  width: 600px;
  /* height: 30%; */
  /* margin: 50px; */
  
  

}

#taskitem{
  display: flex;
  margin: 50px;
}

.taskList .item-checkbox{
  display: flex;
  width: 100%;
  height: 50px;
  border: solid rgb(206, 195, 195) 1px;
  align-items: center;
  
}
.checkbox{
  width: 10px;
  height: 50px;
  background-color: rgb(90, 245, 211);
  position: relative;
  overflow: hidden;
}
.item-checkbox .checkbox1{
  width: 10px;
  height: 50px;
  background-color: rgb(90, 245, 211);
  margin-left: auto;
  
}
.add-column button{
  flex-grow: 1;
  font-size: 20px;
  background-color: rgb(255, 255, 255); 
  color: black; 
  border: 1px solid #fbfdfb;
  transition-duration: 0.4s;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
}
.add-column button:hover {
  background-color: #4CAF50;
  color: white;
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
.fal{
  
  font-size: 30px;
}
.item-checkbox .additem{
  width: 100%;
  height: 99%;
}
#projects_info_content .content{
  margin: 10px;
}
.add-column{
  width: 50px;
  height: 50px;
  border: solid rgb(206, 195, 195) 1px;
  display: flex;

}
.item-title{
  height: 50px;
  display: flex;
  align-items: center;
  /* font-size: 30px; */
}
.fa-plus-circle{
  font-size: 30px;
  transition: transform .5s;
}
.plusbtn .rotate{
  transform: rotate(45deg);
}
.columncontroller{
  display: flex;
}
.column{
  flex-grow: 0;
}

</style>