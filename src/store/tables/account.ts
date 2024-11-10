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

// PROJECT: STORES
import APILogin from "@/api/providers/login";

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Account {
  token: string | null;
}

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $account = defineStore("account", {
  state: (): Account => {
    return {
      token: null
    };
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      const { token } = await APILogin.login(username, password);

      // TODO
      console.error("==> got token = " + token);
    },

    async logout(purge = false) {
      // TODO: clear cookies et al
      throw new Error("Not implemented");
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $account;
