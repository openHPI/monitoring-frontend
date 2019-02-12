<template>
  <div class="dashboard">
    <Header title="OpenHPI Dashboard" />
    <main class="dashboard-grid">
      <SubjectTile
        v-for="tile in tiles"
        :key="tile.title"
        :title="tile.title"
        :icon="tile.tag"
        :status="tile.alertLevel" />
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
    Header,
  },
})
export default class Dashboard extends Vue {
  // region public members
  public alertLevel: string = 'OK';
  public tiles = [
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

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  private mounted() {
    this.updateAlertLevels();
  }

  private async updateAlertLevels(): Promise<void> {
    const response = await fetch('http://82.140.0.78:9092/kapacitor/v1/alerts/topics');
    const topics = await response.json();
    const topicTags = this.tiles.map((tile) => tile.tag);
    const tileTopics = topics.topics.filter((topic: any) => topicTags.includes(topic.id));
    tileTopics.forEach((tileTopic: any) => {
      const tileId = this.tiles.findIndex((tile) => tile.tag === tileTopic.id);
      this.tiles[tileId].alertLevel = tileTopic.level;
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
