<template>
  <div class="alerts">
    <Header :title="category" />
    <main>
      <ul class="alert-list">
        <li 
          v-for="alert in alerts"
          :key="alert._id"
          class="alert" 
          :style="{ 'background-color': alert.backgroundColor }">
          <div class="icon-container">
            <img class="icon" :src="`img/${category}.svg`" />
          </div>
          <div class="alert-message">{{ alert.message }}</div>
          <div class="alert-date">{{ alert.time }}</div>
          <div class="icon-container">
            <img class="icon" src="img/down-arrow.svg" />
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
import KapacitorAlert from '@/interfaces/Alert.ts';
import DateUtil from '@/utils/DateUtil.ts';
import ColorUtil from '@/utils/ColorUtil.ts';


interface Alert {
  message: string;
  time: string;
  level: string;
  backgroundColor: string;
}

@Component({
  components: {
    Header,
  },
})
export default class EventList extends Vue {
  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  private category: string = '';
  private alerts: Alert[] = [];
  // endregion

  // region constructor
  // endregion

  // region private methods
  private mounted() {
    this.category = this.$route.params.category;
    this.fetchAlerts();
  }

  private async fetchAlerts(): Promise<void> {
    const response = await fetch(`http://82.140.0.78:8082/events/${this.category}?min-level=OK`);
    const categoryJson = await response.json();
    const events: Alert[] = categoryJson.events.map((event: KapacitorAlert) => {
      return {
        message: event.state.message,
        time: DateUtil.dateToTimeAgo(new Date(event.state.time)),
        level: event.state.level,
        backgroundColor: ColorUtil.getColor(event.state.level),
      };
    });
    this.alerts = events.sort((a: Alert, b: Alert) => ColorUtil.states[b.level] - ColorUtil.states[a.level]);
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
  background-color: grey;
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
  word-break: break-all;
}

.alert-date {
  font-size: 25px;
}

.icon {
  max-width: 100%;
}

</style>
