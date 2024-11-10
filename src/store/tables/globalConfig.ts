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
// import { Availability, JID } from "@prose-im/prose-sdk-js";

// PROJECT: STORES
import Store from "@/store";
// import { InboxNameOrigin } from "@/store/tables/customizationWorkspace";

// PROJECT: UTILITIES
// import { PodApi } from "@/api/global";

//TYPES
import { ServerConfig } from "./serverConfiguration";

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface GlobalConfig {
  properties: ConfigProperties;
}

interface ConfigProperties {
  domain: {
    default: string;
  };
  message_archive_enabled: {
    default: boolean;
  };
  message_archive_retention: {
    default: string;
  };
  file_upload_allowed: {
    default: boolean;
  };
  file_storage_encryption_scheme: {
    default: string;
  };
  file_storage_retention: {
    default: string;
  };
  mfa_required: {
    default: boolean;
  };
  minimum_tls_version: {
    default: string;
  };
  minimum_cipher_suite: {
    default: string;
  };
  federation_enabled: {
    default: boolean;
  };
  settings_backup_interval: {
    default: string;
  };
  user_data_backup_interval: {
    default: string;
  };
}

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  informationLoaded: false
};

// const INFORMATION_AVAILABILITY_DEFAULT = Availability.Available;

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $globalConfig = defineStore("globalConfig", {
  state: (): GlobalConfig => {
    return {
      properties: {
        domain: {
          default: "crisp.chat"
        },

        // Server Config
        message_archive_enabled: {
          default: true
        },
        message_archive_retention: {
          default: "infinite"
        },
        file_upload_allowed: {
          default: true
        },
        file_storage_encryption_scheme: {
          default: "AES-256"
        },
        file_storage_retention: {
          default: "infinite"
        },

        // advanced Config
        mfa_required: {
          default: true
        },
        minimum_tls_version: {
          default: "1.2"
        },
        minimum_cipher_suite: {
          default: "HIGH_STRENGTH"
        },
        federation_enabled: {
          default: true
        },
        settings_backup_interval: {
          default: "P1D"
        },
        user_data_backup_interval: {
          default: '"P1W"'
        }
      }
    };
  },

  getters: {
    getGlobalConfig(): ConfigProperties {
      return this.properties;
    }
  },

  actions: {
    async loadGlobalConfig(reload = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.informationLoaded === false || reload === true) {
        // Load globalConfig configuration
        const globalConfig = await PodApi.getServerConfig();

        // Update stored config
        // Notice: this is a cross-store operation, for convenience.
        this.properties = globalConfig;
      }

      // Mark as loaded
      LOCAL_STATES.informationLoaded = true;
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $globalConfig;
