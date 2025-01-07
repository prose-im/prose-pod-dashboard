<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
  .v-app-customization-workspace
    base-subsection(
      v-model="config.workspaceProfile"
      ref="profileSubsection"
      title="Workspace Profile"
      :items="profileItems"
    )

    base-subsection(
      v-model="config.appearance"
      title="Apps Appearance"
      :items="appearanceItems"
      @update="onAppearanceUpdate"
    )

  <!-- Modals -->
  edit-name(
    v-if="isEditNameVisible"
    :visibility="editNameVisibility"
    @close="toggleEditNameModalVisible"
  )

  edit-logo(
    v-if="isEditLogoVisible"
    :visibility="editLogoVisibility"
    @close="toggleEditLogoModalVisible"
    @showSuccess="onShowSuccess"
  )

  edit-detail-card(
    v-if="isEditDetailCardVisible"
    :visibility="isEditDetailCardVisible"
    @close="toggleEditDetailCardModalVisible"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import EditDetailCard from "@/assemblies/modals/customization/EditDetailCard.vue";
import EditLogo from "@/assemblies/modals/customization/EditLogo.vue";
import EditName from "@/assemblies/modals/customization/EditName.vue";
import BaseSubsection from "@/components/base/BaseSubsection.vue";

// STORE
import store from "@/store";

// ENUMERATIONS
enum AppearanceKey {
  Color = "color"
}

export default {
  name: "AppCustomizationWorkspace",

  components: {
    EditDetailCard,
    EditLogo,
    EditName
  },

  data() {
    return {
      // --> STATE <--

      isEditNameVisible: false,
      editNameVisibility: false,
      isEditLogoVisible: false,
      editLogoVisibility: false,
      isEditDetailCardVisible: false,

      profileItems: [
        {
          subtitle: "Name for workspace",
          description:
            "The name of your workspace, as seen by server users as well as other servers on the network. It is recommended to enter the name of your company or organization.",
          type: "button",
          action: this.toggleEditNameModalVisible,
          typeProps: {
            label: "Edit name...",
            size: "medium"
          },
          slot: "text"
        },
        {
          subtitle: "Icon for workspace",
          description:
            "Upload a logo for your workspace. This will be visible next to your workspace name in various spots of the Prose app. Other servers on the network will see it as well.",
          type: "button",
          action: this.toggleEditLogoModalVisible,
          typeProps: {
            label: "Edit logo...",
            size: "medium"
          },
          slot: "avatar"
        },
        {
          subtitle: "Server details card",
          description:
            "Configure extra details about your server, which is useful to other servers. This is especially useful if someone wants to obtain eg. the website of your organization and other details.",
          type: "button",
          disabled: true,
          action: this.toggleEditDetailCardModalVisible,
          typeProps: {
            label: "Edit details...",
            size: "medium"
          }
        }
      ],

      appearanceItems: [
        {
          subtitle: "Apps accent color",
          description:
            "The accent color is the dominant color that all Prose apps connected to this server will use for UI elements such as active buttons and contextual menus.",
          type: "select",
          typeProps: {
            options: [
              {
                colorPrev: "#2490F0",
                label: "Medium Blue",
                value: "#2490F0"
              },
              {
                colorPrev: "#1C293B",
                label: "Dark Blue",
                value: "#1C293B"
              }
            ],
            size: "medium"
          }
        }
      ]
    };
  },

  computed: {
    config() {
      return store.$customizationWorkspace.getConfig();
    }
  },

  watch: {
    isEditNameVisible(newVisibility) {
      setTimeout(() => (this.editNameVisibility = newVisibility), 10);
    },

    isEditLogoVisible(newVisibility) {
      setTimeout(() => (this.editLogoVisibility = newVisibility), 10);
    }
  },

  mounted() {
    store.$customizationWorkspace.loadWorkspaceConfig();
  },

  methods: {
    // --> HELPERS <--
    toggleEditNameModalVisible() {
      this.isEditNameVisible = !this.isEditNameVisible;
    },

    toggleEditLogoModalVisible() {
      this.isEditLogoVisible = !this.isEditLogoVisible;
    },

    toggleEditDetailCardModalVisible() {
      this.isEditDetailCardVisible = !this.isEditDetailCardVisible;
    },

    // --> EVENT LISTENERS <--
    onAppearanceUpdate(newValue: string, changedKey: AppearanceKey) {
      if (this.config.appearance[changedKey] !== newValue) {
        switch (changedKey) {
          case "color": {
            store.$customizationWorkspace.updateWorkspaceColor(newValue);
            break;
          }

          default: {
            break;
          }
        }
      }

      return;
    },

    onShowSuccess() {
      console.log("ho ho ho success");
      (
        this.$refs.profileSubsection as InstanceType<typeof BaseSubsection>
      ).makeNotificationVisibile();
    }
  }
};
</script>
