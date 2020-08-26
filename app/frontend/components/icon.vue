<template>
     <div class="icon"><img :src="src"></div>
</template>


<script>
export default {
  props: ['src'],
  data: function () {
    return {
      
    }
    
  }
}
</script>

<style scoped>
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