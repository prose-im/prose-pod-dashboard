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

// PROJECT: API
import Api from "@/api";
import APILogin from "@/api/providers/login";

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Account {
  session: {
    token: string | null;
  };
}

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $account = defineStore("account", {
  state: (): Account => {
    return {
      session: {
        token: null
      }
    };
  },

  getters: {
    getSessionToken: function () {
      return (): string | null => {
        return this.session.token;
      };
    }
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      const { token } = await APILogin.login(username, password);

      // Save session token
      this.setSessionToken(token);
    },

    async logout() {
      // Clear session token
      this.setSessionToken(null);
    },

    setSessionToken(token: string | null): void {
      // Update saved token
      this.$patch(() => {
        this.session.token = token;
      });

      // Re-authenticate to API client (or de-authenticate)
      Api.authenticate(token);
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $account;
