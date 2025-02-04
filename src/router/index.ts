/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

// *************************************************************************
//  * IMPORTS
//  * *************************************************************************

// NPM
import { App } from "vue";
import {
  Router as VueRouter,
  createRouter,
  createWebHistory
} from "vue-router";

// PROJECT: VIEWS
import AppBase from "@/views/app/AppBase.vue";
import AppAdvancedBackup from "@/views/app/dashboard/advanced/AppAdvancedBackup.vue";
import AppAdvancedNetwork from "@/views/app/dashboard/advanced/AppAdvancedNetwork.vue";
import AppAdvancedSecurity from "@/views/app/dashboard/advanced/AppAdvancedSecurity.vue";
import AppCustomizationEmojis from "@/views/app/dashboard/customization/AppCustomizationEmojis.vue";
import AppCustomizationWorkspace from "@/views/app/dashboard/customization/AppCustomizationWorkspace.vue";
import AppServerConfiguration from "@/views/app/dashboard/server/AppServerConfiguration.vue";
import AppTeamMembers from "@/views/app/dashboard/team/AppTeamMembers.vue";
import StartLogin from "@/views/start/StartLogin.vue";

// PROJECT: STORES
import Store from "@/store";
import StartSignup from "@/views/start/StartSignup.vue";

// /**************************************************************************
//  * ROUTER
//  * ************************************************************************* */

class Router {
  private readonly __router: VueRouter;

  constructor() {
    // Create router
    this.__router = createRouter({
      history: createWebHistory(),

      routes: [
        //         // --> START <--

        { path: "/start/", redirect: { name: "start.login" } },

        {
          path: "/start/login/",
          name: "start.login",
          component: StartLogin as object,

          beforeEnter: async () => {
            try {
              // Anonymous status guard
              await this.__guardAnonymous();
            } catch (_) {
              // Ignore.
            }
          }
        },

        {
          path: "/start/signup/",
          name: "start.signup",
          component: StartSignup as object
        },

        // --> APP <--

        {
          path: "/",
          name: "app",
          component: AppBase as object,

          beforeEnter: async to => {
            try {
              // Authenticated status guard
              await this.__guardAuthenticated();

              // Redirect to first authenticated route?
              if (to?.name === "app") {
                await this.__redirectAuthenticated();
              }
            } catch (_) {
              // Ignore.
            }
          },

          children: [
            {
              path: "/team/members",
              name: "app.members",
              component: AppTeamMembers as object
            },

            {
              path: "/server/configuration",
              name: "app.server",
              component: AppServerConfiguration as object
            },

            {
              path: "/customization/workspace",
              name: "app.customization.workspace",
              component: AppCustomizationWorkspace as object
            },

            {
              path: "/customization/emojis",
              name: "app.customization.emojis",
              component: AppCustomizationEmojis as object,
              beforeEnter: (to, from) => {
                // reject the navigation
                return { path: from.path };
              }
            },

            {
              path: "/advanced/security",
              name: "app.advanced.security",
              component: AppAdvancedSecurity as object
            },

            {
              path: "/advanced/network",
              name: "app.advanced.network",
              component: AppAdvancedNetwork as object
            },

            {
              path: "/advanced/backup",
              name: "app.advanced.backup",
              component: AppAdvancedBackup as object
            }
          ]
        },

        // --> REDIRECT <--

        { path: "/:path(.*)*", redirect: "/" }
      ]
    });
  }

  bind(app: App): void {
    // Bind to app
    app.use(this.__router);
  }

  instance(): VueRouter {
    return this.__router;
  }

  private async __guardAuthenticated(): Promise<void> {
    // Ensure that user is logged in (redirect to base if not)
    if (!Store.$account.session.token) {
      this.__router.push({
        name: "start.login"
      });

      return Promise.reject();
    }
  }

  private async __guardAnonymous(): Promise<void> {
    // Ensure that user is not logged-in (redirect to app if so)
    if (Store.$account.session.token) {
      this.__router.push({
        name: "app"
      });

      return Promise.reject();
    }
  }

  private async __redirectAuthenticated(): Promise<void> {
    await this.__router.push({
      name: "app.members"
    });
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new Router();
