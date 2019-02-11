<template>
  <div class="dashboard">
    <Header title="OpenHPI Dashboard" />
    <main class="dashboard-grid">
      <SubjectTile
        title="Frontend"
        icon="frontend" />

      <SubjectTile
        title="Backend"
        icon="backend" />

      <SubjectTile
        title="Network"
        icon="network" />

      <SubjectTile
        title="Hardware"
        icon="hardware"
        :status="alertLevel" />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SubjectTile from '@/components/SubjectTile.vue';
import Header from '@/components/Header.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faWindowMaximize, faCode, faServer, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import Alert from '@/interfaces/Alert';

library.add(faWindowMaximize, faCode, faServer, faNetworkWired);

@Component({
  components: {
    SubjectTile,
    Header
  },
})
export default class Dashboard extends Vue {
  // region public members
  public alertLevel: string = 'OK';
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
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
      // tslint:disable-next-line:no-console
      console.log(alert.level);
    }
  }
  // endregion
}
</script>

<style lang="less">

@spacing: 60px;

.dashboard {
  height: 100%;
  display: grid;
  grid-template-rows: 120px auto;
  background-color: #363533;
}

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
