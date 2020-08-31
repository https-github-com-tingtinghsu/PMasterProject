<template>
  <div :id="workspaceitem">
    <div class="workspace-item">
      <p class="workspace-title"><i class="fas fa-caret-down"></i>Main Workspace</p>      
      <!-- <p class="workspace-title"><i class="fas fa-caret-down"></i></p>       -->
      <ul class="board_item">
        <li>Board 1</li>
        <li>Board 2</li>
        <li>Board 3</li>
      </ul>
    </div> 
  </div>
</template>


<script>
export default {};
</script>


<style scoped>
.workspace-item{
  margin-bottom: 20px;
}
</style>