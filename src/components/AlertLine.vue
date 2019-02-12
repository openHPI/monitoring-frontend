<template>
  <li 
    class="alert" 
    :style="{ 'background-color': backgroundColor }">
    <div class="icon-container">
      <img class="icon" :src="`img/${topic}.svg`" />
    </div>
    <div class="alert-message">{{ message }}</div>
    <div class="alert-date">{{ time }}</div>
    <div class="icon-container">
      <img class="icon" src="img/down-arrow.svg" />
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class AlertLine extends Vue {
  // region properties
  @Prop(String) backgroundColor!: String;
  @Prop(String) message!: String;
  @Prop(String) time!: String;
  @Prop(String) topic!: String;
  // endregion

  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">

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
