/*
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// PROJECT: STYLES
import "@/assets/stylesheets/all.scss";


import { createApp } from 'vue'

import App from './App.vue';
// import Router from "@/router";
import 'virtual:svg-icons-register'

createApp(App).mount('#app')

/**************************************************************************
 * PLUGINS
 * ************************************************************************* */

// Router.bind(App);
