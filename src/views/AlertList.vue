<template>
  <div class="alerts">
    <Header :title="topic" />
    <main>
      <ul class="alert-list">
        <AlertLine 
          v-for="alert in alerts"
          :key="alert.topic"
          :alert="alert"
          :topic="topic" />
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
  private alerts: Alert[] = [];
  // endregion

  // region constructor
  // endregion

  // region private methods
  private mounted() {
    this.topic = this.$route.params.topic;
    this.fetchAlerts();
  }

  private async fetchAlerts(): Promise<void> {
    const events = await BackendApi.events(this.topic);
    const alerts: Alert[] = events.map((event) => {
      return {
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
      };
    });
    this.alerts = alerts.sort((a: Alert, b: Alert) => ColorUtil.states[b.level] - ColorUtil.states[a.level]);
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

.alert-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>
