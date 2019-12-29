<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';

export default {
  name: 'app',
  components: {
    Dashboard,
  },
};
</script>

<style lang="scss">
$full-height: 100%;

html {
  height: $full-height;

  body {
    height: calc(100% - 16px);
    background: #f7f7f7;

    #app {
      font-family: 'Ubuntu', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height: $full-height;
    }
  }
}
</style>
