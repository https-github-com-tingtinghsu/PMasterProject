<template>
    <div :id="workspacelist" class="project">
      <div id="projects_list">
        <div id="workspaces_create">
          <p>Workspaces</p>
        </div>
        <div id="workspaces_search">
          <div class="search_icon">
            <i class="fas fa-search"></i>
          </div>
          <div class="search_text">
            <input type="text" placeholder="Filter">
          </div>
        </div>
        <div id="workspaces_list">
          <ul class="workspaces_item">
            <li>Main Workspace</li>
              <ul class="board_item">
                <a href="#" v-text="title"></a>
                <li>Board 2</li>
                <li>Board 3</li>
              </ul>
            <li>2nd Workspace</li>
              <ul class="board_item">
                <li>Board 1</li>
                <li>Board 2</li>
              </ul>
            <li>3th Workspace</li>
              <ul class="board_item">
                <li>Board 1</li>
                <li>Board 2</li>
              </ul>
            <li>4th Workspace</li>
              <ul class="board_item">
                <li>Board 1</li>
                <li>Board 2</li>
                <li>Board 3</li>
              </ul>
          </ul>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  props:["workspacelist"],
  data: function(){
    return{
      title:"aaa"
    }
  }
}
</script>

<style scoped>
.project {
  /* border: 1px solid gray; */
  display: flex;
  /* width: calc(100vw - 70px); */
  font-size: 10px;

}

/* projects_list */
#projects_list {
  border-right: 1px solid gray;
  height: 100vh;
  width: 220px;
  padding: 10px;
}
#workspaces_create{
  height: 40px;
  /* border: 1px solid tomato; */

}
#workspaces_search{
  height: 30px;
  /* text-align: center; */
  /* border: 1px solid tomato; */
  display: flex;
}

/* #workspaces_list{

} */

#workspaces_list .workspaces_item > li{
  font-weight: bold;
}

#workspaces_list .board_item{
  margin-bottom: 15px;
  font-size:20px;
}


#workspaces_search .search_icon{
  flex-grow: 2;
}
#workspaces_search .search_text{
  flex-grow: 8;
}
</style>