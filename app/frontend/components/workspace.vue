<template>
  <div :id="workspace" class="workspace">
      <h2>123{{ workspace.name }} </h2>
  </div>
</template>


<script>

export default {
  name: 'Workspace',
  props: ["workspace"],  
  // 從外層餵workspace資料
  data: function(){
    return {
    }
  },

};

</script>

<style lang="scss" scoped>
  
</style>