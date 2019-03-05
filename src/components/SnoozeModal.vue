<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{ 'background-color': backgroundColor }">

          <div class="modal-header">
              <h1 class="header-title">Snooze ...</h1>
          </div>

          <div class="modal-body">
            <slot name="body">
              <button class="modal-default-button" @click="snoozeAlert(1)">
                Snooze alert for 1 day
              </button>
              <button class="modal-default-button" @click="snoozeAlert(7)">
                Snooze alert for 1 week
              </button>
              <button class="modal-default-button" @click="snoozeAlert(365)">
                Snooze alert for 1 year
              </button>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Cancel
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
import BackendApi from '@/apis/BackendApi.ts';

@Component
export default class SnoozeModal extends Vue {
  // region properties
  @Prop(String) public eventId!: string;
  @Prop(String) public backgroundColor!: string;
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
  private async snoozeAlert(days: number): Promise<void> {
    this.$emit('snooze');
    this.$emit('close');

    await BackendApi.snoozeEvent(this.eventId, days);
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
  }

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  display: inline-block;
  width: 100%;
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

h2 {
  display: table-caption;
}

</style>
