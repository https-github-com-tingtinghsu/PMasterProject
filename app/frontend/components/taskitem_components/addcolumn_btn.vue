<template>
   <div class="dropdown is-right is-active">
    <div class="dropdown-trigger">
      <div class="item-title plusbtn">
          <span class="fas fa-plus-circle" 
             :class="{'rotate': isTransform  }" 
             @click="isTransform = !isTransform">
          </span>
          <div class="status-menu" v-if="isTransform">
            <div class="dropdown-content">
              <div class="drop-item">
                <i class="fas fa-stream"></i>
                <a href="#" class="dropdown-item" @click.prevent="add_status">
                  Status
                </a>
              </div>
               <div class="drop-item">
                <i class="fas fa-user-friends"></i>
                <a href="#" class="dropdown-item" @click.prevent="add_people">
                  people
                </a>
              </div>
               <div class="drop-item">
                <i class="far fa-calendar-alt"></i>
                <a href="#" class="dropdown-item" @click.prevent="add_date">
                  date
                </a>
              </div>
              
            </div>
         </div>
      </div>
    </div>
    
</div>
</template>


<script>
import Column from "./column.vue"
export default {
  name:"dropdown",
  data: function(){
    return {
    isTransform: false,
    }
  },
  components: { Column },
  methods:{
    add_status: function(){
      
      console.log("123")    
  },

  }
}
</script>


<style scoped>
.fa-plus-circle{
  font-size: 30px;
  transition: transform .5s;
}
.plusbtn .rotate{
  transform: rotate(45deg);
}
.status-menu{
  position: absolute;
  right: 10px;
  height: 0;
  transition:transform .5s;
}
.status-menu-transform{
  transform:translateY(0.75em)
}
.dropdown-content{
  display: flex;
  margin: auto;
  /* border: solid red 1px; */
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 150px;
}
.drop-item{
  display: flex;
  vertical-align: middle;
  align-items: center;
  padding: 10px;
  
}
.dropdown-item{
  padding: 0;
}


</style>