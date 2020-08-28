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
  </div>
</template>


<script>
import Tastlist from './tasklist.vue'
export default {
  data: {
    
  },
  components: { Tastlist }
}
</script>


<style scoped>

</style>