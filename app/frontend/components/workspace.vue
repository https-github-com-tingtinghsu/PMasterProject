<template>
<!-- <div id="workspace-board" data-workspaces="<%= @workspaces.to_json(include: :boards)%>"> -->
  <div :id="workspace" class="workspace">
      <h2>123{{ workspace.name }} </h2>
  </div>
</template>


<script>

export default {
  name: 'Workspace',
  // 從外層餵workspace資料
  props: ['workspace'],
  data: function(){
  },

};

</script>

<style lang="scss" scoped>
  
</style>