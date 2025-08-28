<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
  .v-app-customization-workspace
    base-subsection(
      v-model="config.workspaceProfile"
      :items="profileItems"
      ref="customizationSubsection"
      title="Workspace Profile"
    )

    base-subsection(
      v-model="config.appearance"
      @update="onAppearanceUpdate"
      :items="appearanceItems"
      title="Apps Appearance"
    )

  <!-- MODALS -->

  edit-name(
    v-if="activeModal === 'editName'"
    @close="toggleEditNameModalVisible"
    @show-success="onShowSuccess"
    :visibility="editNameVisibility"
  )

  edit-logo(
    v-if="activeModal === 'editLogo'"
    @close="toggleEditLogoModalVisible"
    @show-success="onShowSuccess"
    :visibility="editLogoVisibility"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// ENUMERATIONS
enum Modals {
  // Edit Workspace Name Modal
  EditName = "editName",
  // Company's Logo Modal
  EditLogo = "editLogo"
}

// PROJECT: COMPONENTS
import EditLogo from "@/assemblies/modals/customization/EditLogo.vue";
import EditName from "@/assemblies/modals/customization/EditName.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseSubsection from "@/components/base/BaseSubsection.vue";

// PROJECT: STORE
import store from "@/store";

// ENUMERATIONS
enum AppearanceKey {
  Color = "color"
}

// CONSTANTS
const ACCENT_COLORS = [
  {
    name: "Default color",
    value: ""
  },

  {
    name: "Red",
    value: "#E51E0F"
  },

  {
    name: "Pink",
    value: "#F11D64"
  },

  {
    name: "Purple",
    value: "#B520CF"
  },

  {
    name: "Dark Purple",
    value: "#682AD5"
  },

  {
    name: "Indigo",
    value: "#2943D1"
  },

  {
    name: "Medium Blue",
    value: "#2490F0"
  },

  {
    name: "Dark Blue",
    value: "#1C293B"
  },

  {
    name: "Cyan",
    value: "#01A2B4"
  },

  {
    name: "Teal",
    value: "#00947C"
  },

  {
    name: "Green",
    value: "#28A52D"
  },

  {
    name: "Amber",
    value: "#E1AE01"
  },

  {
    name: "Orange",
    value: "#EC6800"
  },

  {
    name: "Dark Orange",
    value: "#E45300"
  },

  {
    name: "Brown",
    value: "#924B32"
  },

  {
    name: "Grey",
    value: "#7A7A7A"
  },

  {
    name: "Black",
    value: "#2A2A2A"
  }
];

export default {
  name: "AppCustomizationWorkspace",

  components: {
    EditLogo,
    EditName
  },

  data() {
    return {
      // --> STATE <--

      activeModal: null as Modals | null,

      editNameVisibility: false,
      editLogoVisibility: false,

      // --> DATA <--

      modalList: {
        editName: "editName",
        editLogo: "editLogo"
      },

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
                colorPreview: color.value || null,
                label: color.name,
                value: color.value
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
    activeModal(newActiveModal) {
      this.editNameVisibility = false;
      this.editLogoVisibility = false;

      if (newActiveModal === "editName") {
        setTimeout(() => (this.editNameVisibility = true), 10);
      } else if (newActiveModal === "editLogo") {
        setTimeout(() => (this.editLogoVisibility = true), 10);
      }
    }
  },

  async mounted() {
    await store.$customizationWorkspace.loadWorkspaceConfig();
  },

  methods: {
    // --> HELPERS <--

    toggleEditNameModalVisible() {
      if (this.activeModal === "editName") {
        this.activeModal = null;
      } else {
        this.activeModal = Modals.EditName;
      }
    },

    toggleEditLogoModalVisible() {
      if (this.activeModal === "editLogo") {
        this.activeModal = null;
      } else {
        this.activeModal = Modals.EditLogo;
      }
    },

    // --> EVENT LISTENERS <--

    async onAppearanceUpdate(newValue: string, changedKey: AppearanceKey) {
      if (this.config.appearance[changedKey] !== newValue) {
        switch (changedKey) {
          case "color": {
            if (newValue === "Default Color") {
              try {
                await store.$customizationWorkspace.setWorkspaceAccentColor(
                  null
                );

                this.onShowSuccess();
              } catch (e) {
                BaseAlert.error(
                  "Something went wrong",
                  "Please try again later"
                );
              }
            } else {
              try {
                await store.$customizationWorkspace.setWorkspaceAccentColor(
                  newValue
                );

                this.onShowSuccess();
              } catch (e) {
                BaseAlert.error(
                  "Something went wrong",
                  "Please try again later"
                );
              }
            }

            break;
          }
        }
      }

      return;
    },

    onShowSuccess() {
      (
        this.$refs.customizationSubsection as InstanceType<
          typeof BaseSubsection
        >
      ).makeSucessBannerVisible();
    }
  }
};
</script>
