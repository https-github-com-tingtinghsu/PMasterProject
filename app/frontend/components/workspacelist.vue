<template>
  <div :id="workspacelist" id="workspace-list">
    <div class="menuBarCollapse" :class="{'showSidebar': showSidebar }">
      <div id="workspace-create">
        <p>Workspaces</p>
      </div>
      <div id="workspace-search">
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
        <div class="search-text">
          <input type="text" placeholder="Filter" />
        </div>
      </div>
      <div class="workspaceitem">
        <Workspaceitem></Workspaceitem>
        <Workspaceitem></Workspaceitem>
        <Workspaceitem></Workspaceitem>
      </div>
    </div>
    <div id="menuBarSide">
      <a id="workspace-btn-collapse" @click="showSidebar = !showSidebar"><i class="fas fa-angle-right" :class="{'rotate': showSidebar }"></i></a>
    </div>
  </div>
</template>


<script>
// document.querySelector('#workspace-btn-collapse').addEventListener('click', function(){
//   document.querySelector('.fas').classList.toggle('rotate')
// })
import Workspaceitem from "./workspaceitem";
export default {
  props: ["workspacelist"],
  data() {
    return {
      showSidebar: true
    };
  },
  methods: {},

  components: { Workspaceitem }
};
</script>

<style scoped>
#workspace-list {
  display: flex;
  flex-direction: row;
  border-right: 1px solid gray;
  height: 100vh;
}
.menuBarCollapse{
  padding: 10px 0;
  white-space:nowrap;
  width: 0px;
  overflow: hidden;
  transition: .2s;
}
#workspace-btn-collapse {
  display: block;
  background-color: #48c774;
  position: relative;
  top: 20px;
  right: -12px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  text-align: center;
  line-height: 25px;
}

#workspace-create {
  height: 40px;
  font-size: 25px;
}
#workspace-search {
  height: 50px;
  line-height: 50px;
  display: flex;
}

#workspace-list .workspace-item > li {
  font-weight: bold;
}

#workspace-list .board-item {
  margin-bottom: 15px;
  font-size: 20px;
}

#workspace-search .search-icon {
  flex-grow: 2;
}
#workspace-search .search-text {
  flex-grow: 8;
}
.showSidebar{
  padding: 10px 10px 10px;
  width: 220px;
}
.rotate{
  transform: rotate(180deg);
}
</style>