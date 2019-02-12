<template>
  <router-link :to="'/'+ icon + '/events'" class="subject-tile" :style="{ 'background-color': backgroundColor }" >
    <img class="tile-icon" :src="'img/' + icon + '.svg'" />
    <h2 class="tile-headline">{{title}}</h2>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import ColorUtil from '@/util/ColorUtil.ts';

@Component({
  props: {
    icon: String,
    title: String,
    // status is the current alert level according to kapacitor:
    // https://docs.influxdata.com/kapacitor/v1.5/working/alerts/#alert-event-data
    status: {
        type: String,
        validator: (status: string) =>  ['OK', 'INFO', 'WARNING', 'CRITICAL'].includes(status),
    },
  },
})
export default class SubjectTile extends Vue {
  // region public members
  public backgroundColor: string = ColorUtil.colors.OK;
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
  }
  // endregion

  // region public methods
  @Watch('status')
  public onStatusChanged(val: string) {
    this.backgroundColor = ColorUtil.getColor(val);
  }
  // endregion

  // region private methods
  private mounted() {
    if (this.$props.status) {
      this.backgroundColor = ColorUtil.getColor(this.$props.status);
    }
    // use this like componentDidMount() in react
  }
  // endregion
}
</script>

<style lang="less">
.subject-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  //background-color: #58B050;
  border-radius: 20px;

  font-size: 40px;
  font-weight: 600;
  color: white;
}

.tile-icon {
  height: 200px;
}

.tile-headline {
  margin: 20px 0 0 0;
}
</style>
