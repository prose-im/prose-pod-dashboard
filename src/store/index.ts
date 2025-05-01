/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { App } from "vue";
import { Pinia, createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

// PROJECT: STORE
import $account from "@/store/tables/account";
import $customizationWorkspace from "@/store/tables/customizationWorkspace";
import $globalConfig from "@/store/tables/globalConfig";
import $serverConfiguration from "@/store/tables/serverConfiguration";
import $settingsBackup from "@/store/tables/settingsBackup";
import $settingsNetwork from "@/store/tables/settingsNetwork";
import $settingsSecurity from "@/store/tables/settingsSecurity";
import $teamMembers from "@/store/tables/teamMembers";
import $session from "@/store/tables/settingsNetwork";

// PROJECT: API
import Api from "@/api";

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const STORE_PERSIST_PREFIX = "prose-pod-dashboard";
const STORE_PERSIST_REVISION = "v1";

const STORE_KEY_PREFIX = "$";

/**************************************************************************
 * STORE
 * ************************************************************************* */

class Store {
  private readonly __store: Pinia;

  $account!: ReturnType<typeof $account>;
  $customizationWorkspace!: ReturnType<typeof $customizationWorkspace>;
  $globalConfig!: ReturnType<typeof $globalConfig>;
  $serverConfiguration!: ReturnType<typeof $serverConfiguration>;
  $settingsBackup!: ReturnType<typeof $settingsBackup>;
  $settingsNetwork!: ReturnType<typeof $settingsNetwork>;
  $settingsSecurity!: ReturnType<typeof $settingsSecurity>;
  $teamMembers!: ReturnType<typeof $teamMembers>;
  $session!: ReturnType<typeof $session>;

  constructor() {
    this.__store = createPinia();
  }

  bind(app: App): void {
    // Notice: order of binding is critical, eg. the plugins will not work if \
    //   they are applied before Pinia is bound to the app. They need to be \
    //   applied AFTER binding to the app. The same applies to loading tables.

    // #1. Bind to app
    app.use(this.__store);

    // #2. Bind all plugins
    this.__applyPlugins();

    // #3. Load all tables
    this.__loadTables();

    // #4. Execute restore hooks
    this.__executeRestoreHooks();
  }

  reset(): void {
    // Reset all stores
    for (const [storeName, storeInstance] of Object.entries(this)) {
      if (storeName.startsWith(STORE_KEY_PREFIX) === true) {
        // Reset store
        storeInstance.$reset();
      }
    }
  }

  private __applyPlugins(): void {
    this.__store.use(
      createPersistedState({
        key: id => [STORE_PERSIST_PREFIX, STORE_PERSIST_REVISION, id].join(":"),
        storage: localStorage
      })
    );
  }

  private __loadTables(): void {
    this.$session = $session(this.__store);
    this.$account = $account(this.__store);
    this.$customizationWorkspace = $customizationWorkspace(this.__store);
    this.$globalConfig = $globalConfig(this.__store);
    this.$serverConfiguration = $serverConfiguration(this.__store);
    this.$settingsBackup = $settingsBackup(this.__store);
    this.$settingsNetwork = $settingsNetwork(this.__store);
    this.$settingsSecurity = $settingsSecurity(this.__store);
    this.$teamMembers = $teamMembers(this.__store);
  }

  private __executeRestoreHooks(): void {
    // Re-authenticate to API client (or de-authenticate)
    Api.authenticate(this.$account.session.token || null);
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new Store();
