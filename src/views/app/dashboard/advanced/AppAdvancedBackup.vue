<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-advanced-backup
  base-subsection(
    v-model="backupFrequencyForm"
    title="Backup Settings"
    :items="backupItems"
  )

  base-subsection(
    title="Export Data"
    :items="exportItems"
  )

  base-subsection(
    title="Danger Zone"
    sup="tm"
    :items="dangerItems"
    titleColor="red"
  )

restore-backup(
  :visible="isRestoreModalVisible"
  @close="toggleRestoreModalVisible"
  @proceed=""
)

factory-reset(
  :visible="isResetModalVisible"
  @close="toggleResetModalVisible"
  @proceed=""
)
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSubsection from '@/components/base/BaseSubsection.vue';  
import FactoryReset from '@/assemblies/modals/advanced/FactoryReset.vue';
import RestoreBackup from '@/assemblies/modals/advanced/RestoreBackup.vue';

export default {
  name: "AppAdvancedSecurity",

  components: {
    BaseSubsection,
    FactoryReset,
    RestoreBackup
  },

  props: {

  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      isRestoreModalVisible: false,

      isResetModalVisible: false,

      backupFrequencyForm: {
        settingsBackup:{
          Frequency: "Daily",
          Time: "at 1am",
        }, 
        userDataBackup:{
          Frequency: "Weekly",
          Time: "at 2pm"
        }
      },

      backupItems:[
        {
          subtitle: "Automatic backup of Pod settings",
          description: "The settings of your Prose Pod are backed up periodically and can be restored if you make a mistake, or if you want to transfer your Pod settings to a new server.",
          type: "doubleSelect",
          typeProps:{
            options:[
              {
                icon:"",
                value:"Daily"
              }, 
              {
                icon:"",
                value:"Weekly"
              }
            ],
            secondOptions:[
              {
                icon:"",
                value:"at 1am"
              }, 
              {
                icon:"",
                value:"at 2am"
              }
            ],
            size:"medium"
          }
        },

        {
          subtitle: "Automatic backup of Pod user data",
          description: "All your Prose Pod user data gets backed up periodically and can be restored to a new server anytime. Note that user data backups can be quite heavy depending on your workspace size.",
          type: "doubleSelect",
          typeProps:{
            options:[
              {
                icon:"",
                value:"Daily"
              }, 
              {
                icon:"",
                value:"Weekly"
              }
            ],
            secondOptions:[
              {
                icon:"",
                value:"at 1am"
              }, 
              {
                icon:"",
                value:"at 2am"
              }
            ],
            size:"medium"
          }
        },
      ],

      exportItems:[
        {
          subtitle: "Export full backup",
          description: "A full backup, containing your Prose Pod settings and all user data, can be downloaded from there. This is a manual backup which contains everything. It can be quite heavy.",
          type: "button",
          color: "bwPurple",
          typeProps: {
            label: "Download backup",
            size: "medium"
          }
        },
      ],

      dangerItems:[
        {
          subtitle: "Restore from backup",
          description: "This will erase all data on your Pod (all settings and all user data), essentially performing a factory reset. It then imports everything back again from an automated or manual backup.",
          type: "button",
          action: this.toggleRestoreModalVisible,
          typeProps: {
            label: "Restore from backup…",
            size: "medium"
          }
        },

        {
          subtitle: "Erase everything",
          description: "This will erase all data on your Pod (all settings and all user data). Your Pod will then restart and show the initial setup process, as if it was never used before.",
          type: "button",
          action: this.toggleResetModalVisible,
          color: "redShell",
          typeProps: {
            label: "Start factory reset…",
            size: "medium"
          }
        },
      ],

    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
    toggleRestoreModalVisible() {
      this.isRestoreModalVisible = !this.isRestoreModalVisible
    },

    toggleResetModalVisible() {
      console.log( Object.keys(api["paths"]) )
    }
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-app-advanced-backup";
</style>
