<template>
  <router-link :to="'/'+ icon + '/events'" class="subject-tile" :style="{ 'background-color': backgroundColor }" >
    <img class="tile-icon" :src="'img/' + icon + '.svg'" />
    <h2 class="tile-headline">{{title}}</h2>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import ColorUtil from '@/utils/ColorUtil.ts';

@Component({
  props: {
    title: String,
    icon: String,
    // status is the current alert level according to kapacitor:
    // https://docs.influxdata.com/kapacitor/v1.5/working/alerts/#alert-event-data
    alertLevel: {
      type: String,
      validator: (status: string) =>  ['OK', 'INFO', 'WARNING', 'CRITICAL'].includes(status),
    },
  },
})
export default class SubjectTile extends Vue {
  // region public members
  // endregion

  // region private members
  private backgroundColor: string = ColorUtil.colors.OK;
  // endregion

  // region constructor
  constructor() {
    super();
  }
  // endregion

  // region public methods
  @Watch('alertLevel')
  public onAlertLevelChanged(alertLevel: string) {
    this.backgroundColor = ColorUtil.getColor(alertLevel);
  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
.subject-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: grey;
  border-radius: 20px;

  font-size: 40px;
  font-weight: 600;
  color: white;
  text-decoration: none;
}

.tile-icon {
  height: 200px;
}

.tile-headline {
  margin: 20px 0 0 0;
}
</style>
