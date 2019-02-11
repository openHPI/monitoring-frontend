<template>
  <div class="alerts">
    <Header title="Hardware" />
    <main>
      <ul class="alert-list">
        <li class="alert" v-for="alert in alerts" :key="alert._id">
          <div class="icon-container">
            <img class="icon" :src="'img/hardware.svg'" />
          </div>
          <div class="alert-message">{{ alert.message }}</div>
          <div class="alert-date">{{ alert.time }}</div>
          <div class="icon-container">
            <img class="icon" :src="'img/down-arrow.svg'" />
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Header from '@/components/Header.vue';
import Alert from '@/interfaces/Alert.ts';
import KapacitorAlert from '@/interfaces/KapacitorAlert.ts';
import DateUtil from '@/util/DateUtil.ts';

@Component({
  components: {
    Header,
  }
})
export default class EventList extends Vue {
  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  private alerts: any[] = [];
  // endregion

  // region constructor
  // endregion

  // region private methods
  private mounted() {
    this.fetchAlerts(this.$route.params.category);
  }

  private async fetchAlerts(category?: string): Promise<void> {
    const response = await fetch(`http://82.140.0.78:9092/kapacitor/v1/alerts/topics/hardware/events?min-level=OK`);
    const categoryJson = await response.json();
    const events: KapacitorAlert[] = categoryJson.events.map((event: any) => {
      event.state.details = JSON.parse(event.state.details.replace(/&#34;/g, '"'));
      return event;
    });

    const filtered_events = events.filter((alert: KapacitorAlert) =>  alert.state.details.Level === 'CRITICAL' || alert.state.details.Level === 'WARNING');

    this.alerts = filtered_events.map((event) => {
      return {
        message: event.state.message,
        time: DateUtil.dateToTimeAgo(new Date(event.state.time)),
        level: event.state.level,
      };
    });
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

.alert {
  background-color: #B0544D;
  margin: 15px 30px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 130px auto 200px 100px;
}

.alert > * {
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
}

.alert-message {
  font-size: 30px;
}

.alert-date {
  font-size: 25px;
}

.icon {
  max-width: 100%;
}

</style>
