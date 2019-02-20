<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
              <h1 class="header-title">Settings</h1>
          </div>

          <div class="modal-body">
            <slot v-for="taskVariableKey in Object.keys(taskVariables)" name="body">
              <label :key="taskVariableKey + 'label'" :for="taskVariableKey + 'input'">{{ toFreeText(taskVariableKey) }}:</label>
              <input v-if="taskVariables[taskVariableKey].type === 'string' || taskVariables[taskVariableKey].type === 'lambda'" :key="taskVariableKey + 'input'" v-model="taskVariables[taskVariableKey].value" type="text">
              <input v-if="taskVariables[taskVariableKey].type === 'float' || taskVariables[taskVariableKey].type === 'duration'" :key="taskVariableKey + 'input'" v-model.number="taskVariables[taskVariableKey].value" type="number">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="saveTaskVariables">
                Save
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import Alert from '@/interfaces/Alert';
import KapacitorApi from '@/apis/KapacitorApi.ts';

@Component
export default class TaskVariablesModal extends Vue {
  // region properties
  @Prop(String) public taskName!: string;
  // endregion

  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  private taskVariables: any = {};
  // endregion

  // region constructor
  // endregion

  // region private methods
  private mounted() {
    this.fetchTaskVariables();
  }

  private toFreeText(text: string): string {
    const result = text.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return finalResult;
  }

  private async fetchTaskVariables(): Promise<void> {
    this.taskVariables = await KapacitorApi.taskVariables(this.taskName);
  }

  private async saveTaskVariables(): Promise<void> {
    this.$emit('close');

    await KapacitorApi.updateTaskVariables(this.taskName, this.taskVariables);
  }
  // endregion
}
</script>

<style lang="less">

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
      background-color: rgb(176, 84, 77);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  }

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: grid;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

label {
    display: block;
    margin-top: 20px;
    margin-bottom: 5px;
}

input {
    padding: 10px;
    outline: none;
    border-radius: 5px;
    border: none;
    height: 20px;
    width: calc(100% - 20px);
}

.modal-default-button {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 20px;
    color: white;
    font-size: 24px;
    padding: 20px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top: 10px;
    outline: none;
}

</style>
