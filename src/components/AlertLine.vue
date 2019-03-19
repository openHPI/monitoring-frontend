<template>
  <li 
    class="alert" 
    :style="{ 'background-color': alert.backgroundColor }"
    @keyup.esc="showTaskVariablesModal = false; showSnoozeModal = false; showCreateTaskModal = false" tabindex="0">
    <div class="icon-container">
      <img class="icon" :src="`img/${topic}.svg`" />
    </div>
    <div class="alert-message">
      <p class="title">{{ alert.title }}</p>
      <p class="subtitle">{{ alert.subtitle }}</p>
      <p class="subsubtitle">{{ alert.subsubtitle }}</p>
    </div>
    <div class="alert-date">{{ alert.time }}</div>
    <a @click="toggleCollapse" href="#" class="icon-container">
      <img v-if="collapsed" class="icon" src="img/down-arrow.svg" />
      <img v-else class="icon" src="img/up-arrow.svg" />
    </a>
    <div v-if="!collapsed" class="alert-details">
      <div class="alert-info">
        <h3>Tags</h3>
        <ul class="server-info">
          <li v-for="tag in Object.keys(alert.tags)" :key="tag">
            <strong>{{tag}}</strong>: {{alert.tags[tag]}}
          </li>
        </ul>
        <h3>Alert Details</h3>
        <ul class="server-info">
          <li v-for="field in Object.keys(alert.fields)" :key="field">
            <strong>{{field}}</strong>: {{alert.fields[field]}}
          </li>
        </ul>
      </div>
      <iframe v-if="alert.tags['fqdn'] && alert.grafanaDashboardName && alert.grafanaPanelID" class="grafana"
       :src="`${config.baseURL}/grafana/d-solo/000000001/${alert.grafanaDashboardName}?refresh=5s&orgId=1&var-fqdn=${alert.tags['fqdn']}&panelId=${alert.grafanaPanelID}`"></iframe>
      <div v-else class="grafana">No Grafana Dashboard available</div>
    </div>
    <div v-if="!collapsed" class="alert-buttons">
      <button v-if="alert.wasSnoozed" @click="unsnoozeAlert">Unsnooze</button>
      <button v-else @click="showSnoozeModal = true">Snooze ...</button>
      <button @click="openGrafana" :disabled="!(alert.tags['fqdn'] && alert.grafanaDashboardName)">Open in Grafana</button>
      <button @click="openMnemosyne">Open in Mnemosyne</button>
      <button @click="showTaskVariablesModal = true">Settings</button>
    </div>
    <SnoozeModal v-if="showSnoozeModal" @close="showSnoozeModal = false" @snooze="alert.wasSnoozed = true"
     :eventId="alert.id" :backgroundColor="alert.backgroundColor">
    </SnoozeModal>
    <TaskVariablesModal v-if="showTaskVariablesModal" @close="showTaskVariablesModal = false" @createTask="showCreateTaskModal = true"
     :taskName="alert.taskName" :backgroundColor="alert.backgroundColor">
    </TaskVariablesModal>
    <CreateTaskModal v-if="showCreateTaskModal" @close="showCreateTaskModal = false">
    </CreateTaskModal>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import Alert from '@/interfaces/Alert';
import TaskVariablesModal from '@/components/TaskVariablesModal.vue';
import SnoozeModal from '@/components/SnoozeModal.vue';
import CreateTaskModal from '@/components/CreateTaskModal.vue';
import BackendApi from '@/apis/BackendApi.ts';
import config from '@/config';

@Component({
  components: {
    TaskVariablesModal,
    SnoozeModal,
    CreateTaskModal,
  },
  data() {
    return {
       config,
    };
  },
})
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
  private showTaskVariablesModal: boolean = false;
  private showCreateTaskModal: boolean = false;
  private showSnoozeModal: boolean = false;
  // endregion

  // region constructor
  // endregion

  // region private methods
  private toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  private async unsnoozeAlert(): Promise<void> {
    this.alert.wasSnoozed = false;
    await BackendApi.unsnoozeEvent(this.alert.id);
  }

  private openGrafana(): void {
    window.open(
      `${config.baseURL}/grafana/d/000000001/${this.alert.grafanaDashboardName}
      ?orgId=1&var-fqdn=${this.alert.tags.fqdn}`,
      '_blank',
    );
  }

  private openMnemosyne(): void {
    const platformId = config.platforms.find((platform: string) => this.alert.id.includes(platform)) || '';
    window.open(`${config.baseURL}/mnemosyne/platform/${platformId}/traces`, '_blank');
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

.alert > * {
  padding: 20px;
}

.icon-container, .alert-message, .alert-date {
  display: flex;
  align-items: center;
}

.alert-message {
  font-size: 30px;
  word-break: break-all;
  flex-direction: column;
  align-items: flex-start;
}

.alert-message .title {
  margin-top: 0px;
  margin-bottom: 10px;
}

.alert-message .subtitle,
.alert-message .subsubtitle {
  margin-top: 0px;
  margin-bottom: 3px;
  font-size: 20px;
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

h3 {
  margin: 30px 0px 10px;
  font-size: 20px;
  font-weight: 600;
}

h3:first-child {
  margin-top: 0px;
}

.server-info {
  list-style: none;
  font-size: 18px;
  line-height: 1.3em;
  padding: 0;
}

.alert-buttons {
  grid-column-start: 3;
  grid-column-end: 5;
}

.alert-buttons button {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 30px;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 20px;
}

.alert-buttons button:last-child {
  margin-bottom: 0px;
}

.alert-buttons button:focus {
  outline: none;
}

.alert-info {
  float: left;
  width: 29%;
}

.grafana {
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  height: 270px;
  width: 70%;
  border-radius: 10px;
  border: 3px solid #202123;
  background-color: #202123;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>
