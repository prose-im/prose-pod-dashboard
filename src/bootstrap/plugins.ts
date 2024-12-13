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
import VueClickAway from "vue3-click-away";

/**************************************************************************
 * PLUGINS
 * ************************************************************************* */

class BootstrapPlugins {
  init(app: App): void {
    // Vue directives
    app.use(VueClickAway);
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new BootstrapPlugins();
