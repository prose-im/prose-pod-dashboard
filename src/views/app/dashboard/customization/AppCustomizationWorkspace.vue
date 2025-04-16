<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
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
    @close="toggleEditNameModalVisible"
    @showSuccess="onShowSuccess"
    :visibility="editNameVisibility"
  )

  edit-logo(
    v-if="isEditLogoVisible"
    @close="toggleEditLogoModalVisible"
    @showSuccess="onShowSuccess"
    :visibility="editLogoVisibility"
  )

  edit-detail-card(
    v-if="isEditDetailCardVisible"
    @close="toggleEditDetailCardModalVisible"
    :visibility="isEditDetailCardVisible"
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

// CONSTANTS
const ACCENT_COLORS = [
  {
    name: "Medium Blue",
    hex: "#2490F0"
  },

  {
    name: "Dark Blue",
    hex: "#1C293B"
  },

  {
    name: "Red",
    hex: "#E51E0F"
  },

  {
    name: "Pink",
    hex: "#F11D64"
  },

  {
    name: "Purple",
    hex: "#B520CF"
  },

  {
    name: "Dark Purple",
    hex: "#682AD5"
  },

  {
    name: "Indigo",
    hex: "#2943D1"
  },

  {
    name: "Cyan",
    hex: "#01A2B4"
  },

  {
    name: "Teal",
    hex: "#00947C"
  },

  {
    name: "Green",
    hex: "#28A52D"
  },

  {
    name: "Amber",
    hex: "#E1AE01"
  },

  {
    name: "Orange",
    hex: "#EC6800"
  },

  {
    name: "Dark Orange",
    hex: "#E45300"
  },

  {
    name: "Brown",
    hex: "#924B32"
  },

  {
    name: "Grey",
    hex: "#7A7A7A"
  },

  {
    name: "Black",
    hex: "#2A2A2A"
  }
];

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
          slot: "avatar",
          slotName: store.$globalConfig.getDomain
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
            options: ACCENT_COLORS.map(color => {
              return {
                colorPreview: color.hex,
                label: color.name,
                value: color.hex
              };
            }),
            align: "left",
            position: "top"
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

  async mounted() {
    await store.$customizationWorkspace.loadWorkspaceConfig();
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
            store.$customizationWorkspace.setWorkspaceAccentColor(newValue);
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
      ).makeNotificationVisible();
    }
  }
};
</script>
