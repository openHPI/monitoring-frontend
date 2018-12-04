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
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header,
  },
})

export default class App extends Vue {
  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region private methods
  // endregion
}
</script>
