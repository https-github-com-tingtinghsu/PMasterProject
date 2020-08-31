<template>
  <div id="app">
    <div id="wrap">
      <div id="menu">
        <Menubar></Menubar>
      </div>
      <div id="workspacelist">
        <Workspacelist></Workspacelist>
      </div>
      <div id="workspacecontent">
        <Workspacecontent></Workspacecontent>
      </div>
    </div>
  </div>
</template>




<script>
import Menubar from "./menubar.vue";
import Workspacelist from "./workspacelist.vue";
import Workspacecontent from "./workspacecontent.vue";
export default {
  name: 'app',
  data: function() {
    return {
    };
  },
  components: { Menubar, Workspacelist, Workspacecontent}
};
</script>

<style scoped>
#wrap {
  display: flex;
}
</style>
