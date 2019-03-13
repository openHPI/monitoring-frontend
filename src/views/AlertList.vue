<template>
  <div class="alerts">
    <Header :title="topic" />
    <main>
      <div class="searchbar-container">
        <input type="text" class="searchbar" placeholder="Search Alerts" @input="searchAlerts" />
      </div>
      <ul class="alert-list">
        <AlertLine 
          v-for="alert in alerts"
          v-bind:class="{ snoozed: alert.wasSnoozed }"
          :key="alert.topic"
          :alert="alert"
          :topic="topic" />
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Fuse from 'fuse.js';
import Component from 'vue-class-component';
import Header from '@/components/Header.vue';
import AlertLine from '@/components/AlertLine.vue';

import BackendApi from '@/apis/BackendApi.ts';
import DateUtil from '@/utils/DateUtil.ts';
import ColorUtil from '@/utils/ColorUtil.ts';

import Alert from '@/interfaces/Alert.ts';

@Component({
  components: {
    Header,
    AlertLine,
  },
})
export default class AlertList extends Vue {
  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  private topic: string = '';
  private allAlerts: Alert[] = [];
  private alerts: Alert[] = [];
  private fuse!: Fuse<Alert>;
  // endregion

  // region constructor
  // endregion

  // region private methods
  private async mounted() {
    this.topic = this.$route.params.topic;
    await this.fetchAlerts();
    this.initializeSearchbar();
  }

  private async fetchAlerts(): Promise<void> {
    const events = await BackendApi.events(this.topic);
    const alerts: Alert[] = events.map((event) => {
      return {
        id: event.id,
        message: event.state.message,
        title: event.state.title,
        subtitle: event.state.subtitle,
        subsubtitle: event.state.subsubtitle,
        time: DateUtil.dateToTimeAgo(new Date(event.state.time)),
        level: event.state.level,
        backgroundColor: ColorUtil.getColor(event.state.level),
        taskName: event.state.details.TaskName,
        tags: event.state.details.Tags,
        fields: event.state.details.Fields,
        wasSnoozed: event.state.wasSnoozed,
        grafanaDashboardName: event.state.details.GrafanaDashboardName,
        grafanaPanelID: event.state.details.GrafanaPanelID,
      };
    });
    this.allAlerts = alerts.sort((a: Alert, b: Alert) => Number(a.wasSnoozed) - Number(b.wasSnoozed)
     || ColorUtil.states[b.level] - ColorUtil.states[a.level]);
    this.alerts = this.allAlerts;
  }

  private initializeSearchbar() {
    const options: any = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'message',
        'title',
        'subtitle',
        'level',
        'taskName',
        'tags',
        'fields',
      ],
    };
    this.fuse = new Fuse(this.allAlerts, options);
  }

  private searchAlerts(e: any) {
    if (e.target.value === '') {
      this.alerts = this.allAlerts;
      return;
    }
    this.alerts = this.fuse.search(e.target.value);
  }
  // endregion
}
</script>

<style lang="less">

.alerts {
  height: 100%;
  display: grid;
  grid-template-rows: 120px auto;
  background-color: #363533;
}

main {
  overflow: scroll;
}

.searchbar-container {
  display: flex;
}

.searchbar {
  margin: 15px 30px;
  width: 100%;
  font-size: 23px;
  padding: 20px;
  color: #363533;
}

.alert-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.snoozed {
  opacity: 0.5;
}

</style>
