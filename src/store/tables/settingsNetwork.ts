/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import mitt from "mitt";
import { defineStore } from "pinia";

/**************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

enum SessionAppearance {
  // Light appearance.
  Light = "light",
  // Dark appearance.
  Dark = "dark"
}

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsNetwork = defineStore("settingsNetwork", {
  // Important: DO NOT persist this store, as it contains session-related data.
  // persist: false,

  state: () => {
    return {
      externalServerPermission: true,
      whitelist: []
    };
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    setConnected(connected: boolean): void {
      // Update last connected date marker?
      if (connected !== this.connected) {
        // Update value
        this.$patch({
          lastConnectedAt: Date.now()
        });
      }

      this.setGeneric("connected", this.connected, connected);
    },

    setConnecting(connecting: boolean): void {
      this.setGeneric("connecting", this.connecting, connecting);
    },

    setVisible(visible: boolean): void {
      this.setGeneric("visible", this.visible, visible);
    },

    setProtocol(protocol = ""): void {
      this.setGeneric("protocol", this.protocol, protocol);
    },

    setAppearance(appearance: SessionAppearance): void {
      this.setGeneric("appearance", this.appearance, appearance);
    },

    setInterfaceToolbarMounted(mounted: boolean) {
      this.$patch(state => {
        state.interface.toolbar.mounted = mounted;
      });
    },

    setInterfaceSidebarMounted(mounted: boolean) {
      this.$patch(state => {
        state.interface.sidebar.mounted = mounted;
      });
    },

    setInterfaceInboxDetailsMounted(mounted: boolean) {
      this.$patch(state => {
        state.interface.inboxDetails.mounted = mounted;
      });
    },

    setInterfaceForegroundMounted(mounted: boolean) {
      this.$patch(state => {
        state.interface.foreground.mounted = mounted;
      });
    },

    setOnboardingWelcome(welcome: boolean) {
      this.$patch(state => {
        state.onboarding.welcome = welcome;
      });
    },

    setGeneric<ValueType>(
      key: string,
      previousValue: ValueType,
      nextValue: ValueType
    ): void {
      // Check if will change
      const willChange = previousValue !== nextValue ? true : false;

      if (willChange === true) {
        // Update value
        this.$patch({
          [key]: nextValue
        });

        // Broadcast state change
        EventBus.emit(key, nextValue);
      }
    },

    dispatchRequest(key: string, payload?: object): void {
      // Broadcast request event
      EventBus.emit(`request:${key}`, payload);
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export { SessionAppearance };
export default $settingsNetwork;
