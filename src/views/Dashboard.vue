<template>
  <div class="dashboard-grid">
    <div class="subject-tile">
      Frontend
    </div>
    <div class="subject-tile">
      Backend
    </div>
    <div class="subject-tile">
      Network
    </div>
    <div class="subject-tile">
      Hardware
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Dashboard extends Vue {
  // region public members
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

@spacing: 60px;

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

.subject-tile {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #58B050;
  border-radius: 20px;

  font-family: Arial;
  font-size: 40px;
  color: white;
}


</style>
