<template>
  <div id="wrap">
  <div id="menu">
    <Menubar></Menubar>
  </div>
  <div id="workspace">
    <Workspaces></Workspaces>
  </div>
  
  </div>
  
</template>




<script>
import Menubar from './menubar.vue'
import Workspaces from './workspaces.vue'
export default {
  data: function () {
    return {
      
    }
    
  },
  components: { Menubar,Workspaces }, 
}
</script>

<style scoped>
#wrap{
  display: flex;
}
</style>
