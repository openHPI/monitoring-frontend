<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component

export default class App extends Vue {
  // region public members
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css?family=Montserrat:400,600');

html, body, #app {
  height: 100%;
  font-family: 'Montserrat', sans-serif;
}

body {
  margin: 0;
}

</style>