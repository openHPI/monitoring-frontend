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
      icon="network-wired"
      :status="alertLevel" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SubjectTile from '@/components/SubjectTile.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faWindowMaximize, faCode, faServer, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import Alert from '@/interfaces/Alert';

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
  public alertLevel: string = 'OK';
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region private methods
  private mounted() {
    this.fetchAlerts();
  }

  private async fetchAlerts(): Promise<void> {
    const response = await fetch('http://82.140.0.78:8082/alerts/');
    const alerts: Alert[] = await response.json();
    const alert = alerts.pop();
    if (alert) {
      this.alertLevel = alert.level;
      console.log(alert.level);
    }
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
