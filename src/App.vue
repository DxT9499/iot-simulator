<template>
  <div id="app">
    <PageHeader />
    <UiContainer />
    <TabMenu />
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import TabMenu from './components/TabMenu.vue'
import UiContainer from './components/UiContainer.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    TabMenu,
    UiContainer
  }
}
</script>

<style >
body {
  margin: 0px;
}
#app {
  font-family: 'Frutiger Next LT W1G', Calibri, Arial, Helvetica, sans-serif;
  min-height: 100%;
}
</style>
