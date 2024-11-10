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

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $navigation = defineStore("navigation", {
  state: () => {
    return {
      inbox: {
        lastRoomId: null as string | null
      }
    };
  },

  actions: {
    setInboxLastRoomId(roomId: string | null) {
      // Update value? (if changed)
      if (roomId !== this.inbox.lastRoomId) {
        this.$patch(state => {
          state.inbox.lastRoomId = roomId;
        });
      }
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $navigation;
