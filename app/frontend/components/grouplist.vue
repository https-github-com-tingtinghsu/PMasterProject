<template>
  <div :id="grouplist">
    <div class="group-item-title">
      <div class="task-name">group name</div>
      <div class="task-person">person</div>
      <div class="task-status">status</div>
      <div class="task-timeline">time line</div>
      <div class="task-text">text</div>
    </div>
    <Tasklist></Tasklist>
    <Tasklist></Tasklist>
    <Tasklist></Tasklist>
    <Taskitem></Taskitem>
  </div>
</template>


<script>
import Tastlist from './tasklist.vue'
import Taskitem from './taskitem.vue'
export default {
  props: ["grouplist"],  
  data: {
    
  },
  components: { Tastlist,Taskitem  }
}
</script>


<style scoped>

</style>