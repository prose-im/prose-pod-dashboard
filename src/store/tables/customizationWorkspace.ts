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
import { RoomID } from "@prose-im/prose-sdk-js";

// PROJECT: STORES
import Store from "@/store";

// PROJECT: UTILITIES
import { APICustomizationWorkspace } from "@/api/providers/customizationWorkspace";

/**************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

/**************************************************************************
 * TYPES
 * ************************************************************************* */

type AppearanceConfig = {
  color: string;
};

type WorkspaceProfileConfig = {
  name: string;
  iconUrl: string;
  detailsCard: string;
};

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface CustomizationWorkspaceConfig {
  workspaceProfile: WorkspaceProfileConfig;
  appearance: AppearanceConfig;
}

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  configLoaded: false
};

/**************************************************************************
 * METHODS
 * ************************************************************************* */

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $customizationWorkspace = defineStore("customizationWorkspace", {
  persist: false,

  state: (): CustomizationWorkspaceConfig => {
    return {
      workspaceProfile: {
        name: "Crisp",
        iconUrl:
          "https://cdn.cmsfly.com/635bcad9b8a74e0091632998/cerp-GR1YU2.png",
        detailsCard: ""
      },

      appearance: {
        color: "Dark Blue"
      }
    };
  },

  getters: {
    getWorkspaceProfileConfig(): Array<RoomID> {
      return Object.keys(this.workspaceProfile);
    },

    getAppearanceConfig(): string[] {
      return Object.keys(this.appearance);
    },

    getConfig: function () {
      return (): CustomizationWorkspaceConfig => {
        return {
          workspaceProfile: this.workspaceProfile,
          appearance: this.appearance
        };
      };
    }
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    async loadWorkspaceConfig(reload: boolean = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.configLoaded === false || reload === true) {
        // Load globalConfig configuration
        await APICustomizationWorkspace.getWorkspaceConfig();
      }
    },

    async getWorkspaceName(): Promise<void> {
      await APICustomizationWorkspace.getWorkspaceName();
    },

    async updateWorkspaceName(newName: string): Promise<void> {
      await APICustomizationWorkspace.updateWorkspaceName(newName);
    },

    async getWorkspaceIcon(): Promise<void> {
      await APICustomizationWorkspace.getWorkspaceIcon();
    },

    async updateWorkspaceIcon(newIcon: string): Promise<void> {
      await APICustomizationWorkspace.updateWorkspaceIcon(newIcon);
    },

    async getWorkspaceColor(reload = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.configLoaded === false || reload === true) {
        // Load globalConfig configuration
        await APICustomizationWorkspace.getWorkspaceColor();
      }
    },

    async updateWorkspaceColor(newColor: string): Promise<void> {
      this.appearance.color = newColor;
      //await APICustomizationWorkspace.updateWorkspaceColor(newColor)
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $customizationWorkspace;
