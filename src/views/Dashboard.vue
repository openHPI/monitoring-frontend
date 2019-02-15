<template>
  <div class="dashboard">
    <Header title="OpenHPI Dashboard" />
    <main class="dashboard-grid">
      <TopicTile
        v-for="topic in topics"
        :key="topic.title"
        :title="topic.title"
        :icon="topic.tag"
        :alertLevel="topic.alertLevel" />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Header from '@/components/Header.vue';
import TopicTile from '@/components/TopicTile.vue';

import KapacitorApi from '@/apis/KapacitorApi';

@Component({
  components: {
    TopicTile,
    Header,
  },
})
export default class Dashboard extends Vue {
  // region public members
  // endregion

  // region private members
  private topics = [
    {
      title: 'Frontend',
      tag: 'frontend',
      alertLevel: 'OK',
    },
    {
      title: 'Backend',
      tag: 'backend',
      alertLevel: 'OK',
    },
    {
      title: 'Network',
      tag: 'network',
      alertLevel: 'OK',
    },
    {
      title: 'Hardware',
      tag: 'hardware',
      alertLevel: 'OK',
    },
  ];
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  private mounted() {
    this.updateAlertLevels();
  }

  private updateAlertLevels(): void {
    this.topics.forEach((topic) => {
      KapacitorApi.alertLevel(topic.tag).then((alertLevel) => topic.alertLevel = alertLevel);
    });
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
