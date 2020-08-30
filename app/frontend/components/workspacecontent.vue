<template>
    <div :id="workspacecontent" class="">
        <Functionbar></Functionbar>
        <Grouplist></Grouplist>
    </div>
</template>


<script>
import Functionbar from './functionbar.vue'
import Grouplist from './grouplist.vue'
export default {
  components: { Functionbar, Grouplist}
}
</script>

<style scoped>
  #workspacecontent{
    /* width: 1200px; */
    outline: 50px solid pink;
  }
</style>