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

// PROJECT: UTILITIES
import APICustomizationWorkspace from "@/api/providers/customizationWorkspace";

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
 * TABLE
 * ************************************************************************* */

const $customizationWorkspace = defineStore("customizationWorkspace", {
  state: (): CustomizationWorkspaceConfig => {
    return {
      workspaceProfile: {
        name: "",
        iconUrl: "",
        detailsCard: ""
      },

      appearance: {
        color: ""
      }
    };
  },

  getters: {
    getConfig: function () {
      return () => {
        return {
          workspaceProfile: this.workspaceProfile,
          appearance: this.appearance
        };
      };
    }
  },

  actions: {
    async loadWorkspaceConfig(reload = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.configLoaded === false || reload === true) {
        // Load globalConfig configuration

        try{
          const [name, icon, color] = await APICustomizationWorkspace.getWorkspaceConfig();

          this.$patch(() => {
            this.workspaceProfile.name = name.name;
            this.appearance.color = color.color;        
            this.workspaceProfile.iconUrl = 'data:image/png;base64,' + icon.icon;
          });
        } catch(error) {
          console.error('message:', error.message, '- code:', error.code, '- status:', error.status)
        }

      };
    },

    async updateWorkspaceName(newName: string): Promise<void> {
      await APICustomizationWorkspace.setWorkspaceName(newName);

      this.$patch(() => {
        this.workspaceProfile.name = newName;
      });
    },

    async updateWorkspaceIcon(newIcon: string): Promise<void> {
        await APICustomizationWorkspace.setWorkspaceIcon(newIcon);

        this.$patch(() => {
          this.workspaceProfile.iconUrl = 'data:image/png;base64,' + newIcon;
        })
    },

    async updateWorkspaceColor(newColor: string): Promise<void> {
      await APICustomizationWorkspace.setWorkspaceColor(newColor)

      this.$patch(() => {
        this.appearance.color = newColor
      });
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $customizationWorkspace;
