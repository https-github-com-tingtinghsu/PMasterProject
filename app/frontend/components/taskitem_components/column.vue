<template>
   <div class="column">
       <div class="addcolumn">
              
       </div>
       
   </div>
   
</template>


<script>
import Addcolumn from "./addcolumn_btn.vue"
export default {
  name:"Column",
  props:["column"],
  data: function(){
      return{

      }
  },
  
}
</script>


<style scoped>
.column{
    padding: 0;
    margin: 0;
}
.addcolumn{
  width: 50px;
  height: 50px;
  border: solid rgb(206, 195, 195) 1px;
  margin: 0;
}


</style>