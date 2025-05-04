/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

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
import AppCustomizationWorkspace from "@/views/app/dashboard/customization/AppCustomizationWorkspace.vue";
import AppServerConfiguration from "@/views/app/dashboard/server/AppServerConfiguration.vue";
import AppTeamMembers from "@/views/app/dashboard/team/AppTeamMembers.vue";
import StartLogin from "@/views/app/start/StartLogin.vue";
import StartInit from "@/views/app/start/StartInit.vue";
import PlaceholderError from "@/views/app/placeholders/PlaceholderError.vue";
import InvitationAccept from "@/views/app/invitations/InvitationAccept.vue";
import InvitationReject from "@/views/app/invitations/InvitationReject.vue";

// PROJECT: STORE
import Store from "@/store";

// PROJECT: API
import APIInit from "@/api/providers/init";

/* *************************************************************************
 * ROUTER
 * ************************************************************************* */

class Router {
  private readonly __router: VueRouter;

  constructor() {
    // Create router
    this.__router = createRouter({
      history: createWebHistory(),

      routes: [
        // --> START <--

        { path: "/start/", redirect: { name: "start.login" } },

        {
          path: "/start/login/",
          name: "start.login",
          component: StartLogin as object,

          beforeEnter: async () => {
            await this.__guardPodInitialized();

            try {
              // Anonymous status guard
              await this.__guardAnonymous();
            } catch (_) {
              // Ignore.
            }
          }
        },

        {
          path: "/start/init/",
          name: "start.init",
          component: StartInit as object
        },

        // --> APP <--

        {
          path: "/",
          name: "app",
          component: AppBase as object,

          beforeEnter: async to => {
            await this.__guardPodInitialized();

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

        // --> INVITATIONS <--

        {
          path: "/invitations/accept",
          name: "invitations.accept",
          component: InvitationAccept as object,
          props: true
        },
        {
          path: "/invitations/reject",
          name: "invitations.reject",
          component: InvitationReject as object,
          props: true
        },

        // --> REDIRECT <--

        { path: "/:path(.*)*", redirect: "/" },

        // --> BROKEN API <--
        {
          path: "/error",
          name: "error",
          component: PlaceholderError,
          props: true
        }
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

  /** Ensure that Pod is initialized (redirect to init if not) */
  private async __guardPodInitialized(): Promise<void> {
    if (!(await APIInit.isPodInitialized())) {
      this.__router.push({
        name: "start.init"
      });

      return Promise.reject();
    }
  }

  /** Ensure that user is logged in (redirect to base if not) */
  private async __guardAuthenticated(): Promise<void> {
    if (!Store.$account.session.token) {
      this.__router.push({
        name: "start.login"
      });

      return Promise.reject();
    }
  }

  /** Ensure that user is not logged-in (redirect to app if so) */
  private async __guardAnonymous(): Promise<void> {
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
