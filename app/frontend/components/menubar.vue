<template>
      <nav :id="menu" class="menu">
        <!-- <Icon src="https://picsum.photos/100/100?random=10" /> -->
        <div class="menu_top">
          <Icon></Icon>
          <Icon></Icon>
          <Icon></Icon>
          <!-- <div class="icon"><img src="https://picsum.photos/100/100?random=2"></div>
          <div class="icon"><img src="https://picsum.photos/100/100?random=3"></div> -->
        </div>
        <div class="menu_bottom">
          <Icon></Icon>
          <Icon></Icon>
          <Icon></Icon>
          <Icon></Icon>
          <Icon></Icon>
          <!-- <div class="icon"><img src="https://picsum.photos/100/100?random=4"></div>
          <div class="icon"><img src="https://picsum.photos/100/100?random=5"></div>
          <div class="icon"><img src="https://picsum.photos/100/100?random=6"></div>
          <div class="icon"><img src="https://picsum.photos/100/100?random=7"></div>
          <div class="icon"><img src="https://picsum.photos/100/100?random=8"></div> -->
        </div>
      </nav>
</template>

<script>
import Icon from './icon.vue'
export default {
  // props:["menu"],
  data: function () {
    return {
      
    }
    
  },
  components: { Icon },
}
</script>

<style scoped>
#all_view {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
}

/* menu */
.menu {
  width: 70px;
  height: 100vh;
  font-size: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #48C774;
}


.icon {
  /* border: 1px solid blue; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
  padding: 0;
}

.icon img {
  width: 100%;
  border-radius: 50%;
}
</style>