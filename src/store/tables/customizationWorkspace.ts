/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";

// PROJECT: API
import APIWorkspace, {
  WorkspaceIcon,
  WorkspaceName
} from "@/api/providers/workspace";
import { CssColor } from "@/api/providers/global";

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

type AppearanceConfig = {
  color: CssColor;
};

type WorkspaceProfileConfig = {
  name: WorkspaceName | null;
  logo: WorkspaceIcon | null;
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
        name: null,
        logo: null
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
        return this.workspaceProfile.logo;
      };
    }
  },

  actions: {
    async loadWorkspaceConfig(reload = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.configLoaded === false || reload === true) {
        // Load global configuration
        try {
          const workspace = await APIWorkspace.getWorkspace();

          this.$patch(() => {
            this.appearance.color =
              workspace.accent_color ?? DEFAULT_ACCENT_COLOR;

            this.workspaceProfile = {
              name: workspace.name,
              logo: workspace.icon
            };
          });
        } catch (error) {
          console.error(
            "Error when loading the Workspace:",
            JSON.stringify(error, null, 2)
          );
        }
      }
    },

    async updateWorkspaceName(newName: string): Promise<void> {
      const workspaceName = await APIWorkspace.setWorkspaceName(newName);

      this.$patch(() => {
        this.workspaceProfile.name = workspaceName;
      });
    },

    async updateWorkspaceIcon(newIcon: WorkspaceIcon | null): Promise<void> {
      const workspaceIcon = await APIWorkspace.setWorkspaceIcon(newIcon);

      this.$patch(() => {
        this.workspaceProfile.logo = workspaceIcon;
      });
    },

    async setWorkspaceAccentColor(newColor: CssColor | null): Promise<void> {
      const workspaceAccentColor = await APIWorkspace.setWorkspaceAccentColor(
        newColor
      );

      this.$patch(() => {
        this.appearance.color = workspaceAccentColor ?? DEFAULT_ACCENT_COLOR;
      });
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $customizationWorkspace;
