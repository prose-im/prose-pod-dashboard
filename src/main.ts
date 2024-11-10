/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// PROJECT: STYLES
import "@/assets/stylesheets/all.scss";


import { createApp } from 'vue';

// PROJECT: MAIN
import App from '@/App.vue';
import Router from "@/router";
import Store from "@/store";

import 'virtual:svg-icons-register';

createApp(App).mount('#runtime')

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const app = createApp(App)


/**************************************************************************
 * PLUGINS
 * ************************************************************************* */

Store.bind(app);
Router.bind(app);

app.mount("#runtime");
