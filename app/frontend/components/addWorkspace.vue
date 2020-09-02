<template>
  <button><i class="fas fa-plus-circle"></i></button>
</template>


<script>
  export default {              
    name: '',
    data: function () {
      return {
        message: "Hello Vue!"   
      }
    }
  }
</script>

<style scoped>
  .fa-plus-circle {
    @apply .m-2;
  }
</style>