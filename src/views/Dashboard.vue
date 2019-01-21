<template>
  <div class="dashboard-grid">
    <SubjectTile
      title="Frontend"
      icon="window-maximize" />

    <SubjectTile
      title="Backend"
      icon="code" />

    <SubjectTile
      title="Network"
      icon="server" />

    <SubjectTile
      title="Hardware"
      icon="network-wired" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SubjectTile from '@/components/SubjectTile.vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowMaximize, faCode, faServer, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

library.add(faWindowMaximize, faCode, faServer, faNetworkWired);

@Component({
  components: {
    SubjectTile,
  },
})
export default class Dashboard extends Vue {
  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region private methods
  private mounted() {
    // use this like componentDidMount() in react
  }
  // endregion
}
</script>

<style lang="less">

@spacing: 60px;

.dashboard-grid {
  height: 100%;

  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: @spacing;
  padding: @spacing;
  box-sizing: border-box;

  background-color: #363533;
}

</style>
