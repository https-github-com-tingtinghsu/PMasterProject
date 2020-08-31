<template>
    <div :id="workspacelist">
      <div id="workspace-list" class="">
        <a id="workspace-btn-collapse" @click="collapse"></a>
        <div id="workspace-create">
          <p>工作看板</p>
        </div>
        <div id="workspace-search">
          <div class="search-icon">
            <i class="fas fa-search"></i>
          </div>
          <div class="search-text">
            <input type="text" placeholder="Filter">
          </div>
        </div>
        <div class="workspaceitem" v-show="showSidebar">

        </div>
        <div>

        </div>
          <Workspace v-for="workspace in workspacelist" :workspace="workspace" :key="workspace.id"></Workspace>
          <Workspaceitem></Workspaceitem>
          <!-- <Workspaceitem></Workspaceitem>
          <Workspaceitem ></Workspaceitem> -->
      </div>
    </div>
</template>


<script>
  import Rails from '@rails/ujs';
  import Workspaceitem from './workspaceitem'
  import Workspace from 'components/workspace'
  document.addEventListener("turbolinks:load", function(event){
    let el = document.querySelector("#workspace-board");
    if (el){
      console.log("I've got workspace")
    }
  })

  export default {
    name: 'Workspacelist',
    props: ["workspacelist"],

    data: function() {
      return {
        showSidebar: true,
        workspace: this.workspace,
      }
    },
    methods: {
      collapse(){
        this.showSidebar = !this.showSidebar
        console.log("ok")
      }
    },

    components: { Workspaceitem, Workspace  }
  }

</script>

<style scoped>
/* #workspacelist {
  display: flex;
} */
#workspace-list {
  border-right: 1px solid gray;
  height: 100vh;
  width: 220px;
  padding: 10px;
}
#workspace-btn-collapse{
  display: block;
  background-color: #48C774;
  position: relative;
  right: -195px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
}

#workspace-create{
  height: 40px;
  font-size: 25px;
}
#workspace-search{
  height: 50px;
  line-height: 50px;
  display: flex;
}

#workspace-list .workspace-item > li{
  font-weight: bold;
}

#workspace-list .board-item{
  margin-bottom: 15px;
  font-size:20px;
}


#workspace-search .search-icon{
  flex-grow: 2;
}
#workspace-search .search-text{
  flex-grow: 8;
}
#workspace-btn-collapse{
  
}
</style>