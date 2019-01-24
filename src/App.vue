<template>
    <div id="app">
        <Header />
        <main class="uk-container">
          <router-view></router-view>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Header from '@/components/Header.vue';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

@Component({
  components: {
    Header,
  },
})

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

html, body, #app {
  height: 100%;
}

body {
  margin: 0;
}

#app {
    display: grid;
    grid-template-rows: 60px auto;
}

</style>