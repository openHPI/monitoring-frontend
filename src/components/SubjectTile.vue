<template>
  <div class="subject-tile" :style="{ 'background-color': backgroundColor }">
    <font-awesome-icon :icon="icon" class="tile-icon"/>
    <h2 class="tile-headline">{{title}}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

interface States {
    [prop: string]: string;
}

const states: States = {
    OK: '#58B050',
    INFO: '#000000',
    WARNING: '#B2B051',
    CRITICAL: '#B0544D',
};

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
  public backgroundColor: string = states.OK;
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
  public onStatusChanged(val: string, oldVal: string) {
    // tslint:disable-next-line:no-console
    console.log(`Status changed: ${val}`);
    this.backgroundColor = states[val];
  }
  // endregion

  // region private methods
  private mounted() {
    if (this.$props.status) {
      this.backgroundColor = states[this.$props.status];
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

  font-family: Arial;
  font-size: 40px;
  color: white;
}

.tile-icon {
  font-size: 60px;
}

.tile-headline {
  margin: 25px 0 0 0;
}
</style>
