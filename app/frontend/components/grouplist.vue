<template>
  <div :id="grouplist">
    <Taskitem></Taskitem>
  </div>
</template>


<script>
import Taskitem from './taskitem.vue'
export default {
  props:["grouplist"],
  
  components: { Taskitem  }
}
</script>


<style scoped>

</style>