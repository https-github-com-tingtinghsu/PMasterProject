<template>
  <div :id="functionbar" class>
    <div id="projects_info_top">
      <div id="board_title">
        <p>Board title</p>
        <div>board description</div>
      </div>
      <div id="function_bar">
        <div id="selector">
          <nav>
            <ul id="selector_item">
              <li>Member</li>
              <li>Integrations</li>
              <li>Automations</li>
              <li>Star zoom call</li>
              <li>Who is on this board?</li>
              <li>Activities</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div id="board_filter">
      <div id="create_board">Main table</div>
      <div id="selector">
        <nav>
          <ul id="selector_item">
            <li>New item</li>
            <li>Search</li>
            <li>Person</li>
            <li>filter</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {}
};
</script>

<style scoped>
</style>