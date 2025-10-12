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
import APILicensing, {
  Status,
  License,
  LicenseKey
} from "@/api/providers/licensing";

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $licensing = defineStore("licensing", {
  state: (): { status: Status | null } => {
    return { status: null };
  },

  getters: {
    getStatus: function () {
      return (): Status | null => {
        return this.status;
      };
    },

    getLicense: function () {
      return (): License | null => {
        // Notice: license can be extracted from status without re-fetching.
        return this.status?.license || null;
      };
    }
  },

  actions: {
    async fetchStatus() {
      const status = await APILicensing.getStatus();

      this.$patch(() => {
        this.status = status;
      });
    },

    async updateLicense(licenseKey: LicenseKey) {
      // Set the new license key
      await APILicensing.setLicense(licenseKey);

      // Update the license status from server
      await this.fetchStatus();
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $licensing;
