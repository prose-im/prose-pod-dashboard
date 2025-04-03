/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";

// PROJECT: UTILITIES
import APIWorkspace from "@/api/providers/workspace";

/* *************************************************************************
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

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface CustomizationWorkspaceConfig {
  workspaceProfile: WorkspaceProfileConfig;
  appearance: AppearanceConfig;
}

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  configLoaded: false
};
const DEFAULT_ACCENT_COLOR = "";

/* *************************************************************************
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
        color: DEFAULT_ACCENT_COLOR
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
    },

    getWorkspaceName: function () {
      return () => {
        return this.workspaceProfile.name;
      };
    },

    getWorkspaceLogo: function () {
      return () => {
        return this.workspaceProfile.iconUrl;
      };
    }
  },

  actions: {
    async loadWorkspaceConfig(reload = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.configLoaded === false || reload === true) {
        // Load globalConfig configuration

        try {
          const workspace = await APIWorkspace.getWorkspace();

          this.$patch(() => {
            this.workspaceProfile.name = workspace.name;
            this.appearance.color =
              workspace.accent_color ?? DEFAULT_ACCENT_COLOR;
            this.workspaceProfile.iconUrl =
              "data:image/png;base64," + workspace.icon;
          });
        } catch (error: any) {
          console.error(
            "message:",
            error.message,
            "- code:",
            error.code,
            "- status:",
            error.status
          );
        }
      }
    },

    async updateWorkspaceName(newName: string): Promise<void> {
      await APIWorkspace.setWorkspaceName(newName);

      this.$patch(() => {
        this.workspaceProfile.name = newName;
      });
    },

    async updateWorkspaceIcon(newIcon: string): Promise<void> {
      await APIWorkspace.setWorkspaceIcon(newIcon);

      this.$patch(() => {
        this.workspaceProfile.iconUrl = "data:image/png;base64," + newIcon;
      });
    },

    async setWorkspaceAccentColor(newColor: string): Promise<void> {
      await APIWorkspace.setWorkspaceAccentColor(newColor);

      this.$patch(() => {
        this.appearance.color = newColor;
      });
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $customizationWorkspace;
