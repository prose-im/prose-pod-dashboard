/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { createApp } from "vue";

// PROJECT: STYLES
import "@/assets/stylesheets/all.scss";

// PROJECT: MAIN
import App from "@/App.vue";
import Router from "@/router";
import Store from "@/store";

// PROJECT: BOOTSTRAP
import BootstrapComponents from "@/bootstrap/components";
import BootstrapPlugins from "@/bootstrap/plugins";

// VIRTUAL
import "virtual:svg-icons-register";

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const app = createApp(App);

/**************************************************************************
 * PLUGINS
 * ************************************************************************* */

Store.bind(app);
Router.bind(app);

/**************************************************************************
 * BOOTSTRAP
 * ************************************************************************* */

BootstrapComponents.init(app);
BootstrapPlugins.init(app);

/**************************************************************************
 * INITIALIZE
 * ************************************************************************* */

app.mount("#runtime");
