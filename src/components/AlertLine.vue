<template>
  <li 
    class="alert" 
    :style="{ 'background-color': alert.backgroundColor }">
    <div class="icon-container">
      <img class="icon" :src="`img/${topic}.svg`" />
    </div>
    <div class="alert-message">{{ alert.message }}</div>
    <div class="alert-date">{{ alert.time }}</div>
    <a @click="toggleCollapse" href="#" class="icon-container">
      <img class="icon" src="img/down-arrow.svg" />
    </a>
    <ul v-if="!collapsed" class="alert-details">
      <li>Server Information</li>
      <li>FQDN: {{alert.fqdn}}</li>
      <li>Hostname: {{alert.serverInfo.Hostname}}</li>
      <li>ClusterID: {{alert.serverInfo.ClusterID}}</li>
      <li>ServerID: {{alert.serverInfo.ClusterID}}</li>
    </ul>
    <div v-if="!collapsed" class="alert-buttons">
      <button @click="snoozeAlert">Snooze Alert</button>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import Alert from '@/interfaces/Alert';

@Component
export default class AlertLine extends Vue {
  // region properties
  @Prop(Object) public alert!: Alert;
  @Prop(String) public topic!: string;
  // endregion

  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  private collapsed: boolean = true;
  // endregion

  // region constructor
  // endregion

  // region private methods
  private toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  private snoozeAlert(): void {
    // Snooze alert using backend
  }
  // endregion
}
</script>

<style lang="less">

.alert {
  background-color: grey;
  margin: 15px 30px;
  padding: 10px 35px 10px 10px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 130px auto 200px 100px;
  color: white;
}

.icon-container, .alert-message, .alert-date {
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

.alert-details {
  grid-column-start: 1;
  grid-column-end: 3;
}

.alert-buttons {
  grid-column-start: 3;
  grid-column-end: 5;
}

</style>
