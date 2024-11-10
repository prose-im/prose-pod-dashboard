/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";
import mitt from "mitt";

// PROJECT: STORES
import { STORE_PERSIST_PREFIX, STORE_PERSIST_BOOT } from "@/store";

// PROJECT: BROKER
// import Broker from "@/broker";

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsSecurity = defineStore("settingsSecurity", {
  persist: true,

  state: () => {
    return {
      security: {
        twoFactor: true
      },

      encryption: {
        version: 'TLS 1.0+',
        strength: 'High strength'
      },
    };
  },

  getters: {
    getSettings: function () {
      return () => {
        return {
          security: this.security,
          encryption: this.encryption
        }
      }
    }
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    
    setNotificationsConfigurationWhenDays(value: string): void {
      this.setGeneric(this.notifications.configuration.when, "days", value);
    },

    setNotificationsConfigurationWhenTimeFrom(value: string): void {
      this.setGeneric(
        this.notifications.configuration.when.time,
        "from",
        value
      );
    },

    setNotificationsConfigurationWhenTimeTo(value: string): void {
      this.setGeneric(this.notifications.configuration.when.time, "to", value);
    },

    setNotificationsActionNotifyBadge(value: boolean): void {
      this.setGeneric(this.notifications.action.notify, "badge", value);
    },

 

    setNotificationsDevicesMobileAlertsAfter(value: string): void {
      this.setGeneric(this.notifications.devices.mobile.alerts, "after", value);
    },

    setMessagesChatsChatstates(value: boolean): void {
      this.setGeneric(this.messages.chats, "chatstates", value);
    },

    setMessagesChatsSpellcheck(value: boolean): void {
      this.setGeneric(this.messages.chats, "spellcheck", value);
    },

    setMessagesChatsClock24h(value: boolean): void {
      this.setGeneric(this.messages.chats, "clock24h", value);
    },

    setMessagesFilesUploadsOptimize(value: boolean): void {
      this.setGeneric(this.messages.files.uploads, "optimize", value);
    },

    setMessagesFilesImagePreviewsEnabled(value: boolean): void {
      this.setGeneric(this.messages.files.imagePreviews, "enabled", value);
    },

    setMessagesFilesImagePreviewsSize(value: string): void {
      this.setGeneric(this.messages.files.imagePreviews, "size", value);
    },

    setCallsCameraInputSource(value: string): void {
      this.setGeneric(this.calls.camera, "inputSource", value);
    },

    setCallsMicrophoneInputSource(value: string): void {
      this.setGeneric(this.calls.microphone, "inputSource", value);
    },

    setCallSoundOutputSource(value: string): void {
      this.setGeneric(this.calls.sound, "outputSource", value);
    },
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $settingsSecurity;
