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
.toasted.toasted-primary {
  font-family: 'Ubuntu', sans-serif;
  background-color: #F01E1E;
  color: #FFFFFF;
  & .action.ripple {
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    font-weight: 300;
    text-transform: none;
    width: 70px;
    text-align: center;
    transition: all 0.2s;
  }
  & .action.ripple:first-of-type {
    margin-right: 2px;
    margin-left: 80px;
  }
  & .action.ripple:hover {
    background-color: #FFFFFF;
    color: #F01E1E;
    text-decoration: none;
  }
}
</style>
