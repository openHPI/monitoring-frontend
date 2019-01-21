<template>
    <div class="subject-tile" :style="{ 'background-color': backgroundColor }">
        <font-awesome-icon :icon="icon" class="tile-icon" />
        <h2 class="tile-headline">{{title}}</h2>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

export enum STATUS {
    'OK'='#58B050',
    'INFO'='#000000', 
    'WARNING'='#B2B051', 
    'CRITICAL'='#B0544D',
}

@Component({
  props: {
    icon: String,
    title: String,
    // status is the current alert level according to kapacitor:
    // https://docs.influxdata.com/kapacitor/v1.5/working/alerts/#alert-event-data
    status: {
        type: String,
        validator: (status) =>  ['OK', 'INFO', 'WARNING', 'CRITICAL'].includes(status)
    }
  }
})
export default class SubjectTile extends Vue {
  // region public members
  public backgroundColor: string = STATUS.OK;
  // endregion

  // region public methods
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region private methods
  private mounted() {
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
