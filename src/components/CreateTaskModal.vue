<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
              <h1 class="header-title">Create new Task</h1>
          </div>

          <div class="modal-body">
            <label>Template:</label>
            <select v-model="selectedTemplateName" @change="fetchTemplateVariables">
              <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.id }}</option>
            </select>

            <label for="taskNameInput">Task Name:</label>
            <input name="taskNameInput" v-model="taskName" type="text">

            <slot v-for="taskVariableKey in getFilteredTaskVariableKeys()" name="body">
              <label :key="taskVariableKey + 'label'" :for="taskVariableKey + 'input'">{{ toFreeText(taskVariableKey) }}:</label>
              <input v-if="taskVariables[taskVariableKey].type === 'string' || taskVariables[taskVariableKey].type === 'lambda'"
               :key="taskVariableKey + 'input'" v-model="taskVariables[taskVariableKey].value" type="text">
              <input v-if="taskVariables[taskVariableKey].type === 'float' || taskVariables[taskVariableKey].type === 'int' || taskVariables[taskVariableKey].type === 'duration'"
               :key="taskVariableKey + 'input'" v-model.number="taskVariables[taskVariableKey].value" type="number">
              <input v-if="taskVariables[taskVariableKey].type === 'list'"
               :key="taskVariableKey + 'input'" v-model="groupByValues" type="text">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="createTask">
                Create Task
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
import KapacitorTask from '@/interfaces/KapacitorTask';
import KapacitorTaskVariables from '@/interfaces/KapacitorTaskVariables';
import KapacitorApi from '@/apis/KapacitorApi.ts';
import KapacitorTaskVariable from '@/interfaces/KapacitorTaskVariable';

@Component
export default class CreateTaskModal extends Vue {
  // region properties
  // endregion

  // region public members
  // endregion

  // region public methods
  // endregion

  // region private members
  private templates: KapacitorTask[] = [];
  private selectedTemplateName = '';
  private taskName = '';
  private taskVariables: KapacitorTaskVariables = {};
  private groupByValues = '';
  // endregion

  // region constructor
  // endregion

  // region private methods
  private mounted() {
    this.fetchTemplates();
  }

  private toFreeText(text: string): string {
    const result = text.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return finalResult;
  }

  private async fetchTemplates(): Promise<void> {
    this.templates = await KapacitorApi.templates();
    this.selectedTemplateName = this.templates[0].id;
    this.fetchTemplateVariables();
  }

  private async fetchTemplateVariables(): Promise<void> {
    this.taskVariables = await KapacitorApi.templateVariables(this.selectedTemplateName);
  }

  private getGroupByObject(): KapacitorTaskVariable {
    const groupByObject: KapacitorTaskVariable = {
      type: 'list',
      value: [],
      description: '',
    };

    this.groupByValues.split(',').forEach((groupByValue) => {
      const taskVariable: KapacitorTaskVariable = {
        type: 'string',
        value: groupByValue,
        description: '',
      };

      if (Array.isArray(groupByObject.value)) {
        groupByObject.value.push(taskVariable);
      }
    });

    return groupByObject;
  }

  private async createTask(): Promise<void> {
    this.$emit('close');

    this.taskVariables.group_by = this.getGroupByObject();

    await KapacitorApi.createTask(this.taskName, this.selectedTemplateName, this.taskVariables);
  }

  private getFilteredTaskVariableKeys(): string[] {
    return Object.keys(this.taskVariables).filter((taskVariableKey) => {
      return !['morgothField', 'morgothScoreField'].includes(taskVariableKey);
    });
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
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  background-color: #484f5d;
  }

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  height: 500px;
  overflow: scroll;
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

select {
  width: 100%;
  height: 40px;
  outline: none;
  margin-bottom: 20px;
}

</style>
