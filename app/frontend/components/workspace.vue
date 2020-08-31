<template>
<!-- <div id="workspace-board" data-workspaces="<%= @workspaces.to_json(include: :boards)%>"> -->
  <div>
      <h2>123{{ workspace.name }} </h2>
  </div>
</template>


<script>


export default {
  name: 'Workspace',
  // 從外層餵workspace資料
  props: ["workspace"],

  //每個元件都有自己的狀態和資料，這個function回傳workspace元件專屬的東西
  data: function(){

  }
};
</script>

<style lang="scss" scoped>
  
</style>