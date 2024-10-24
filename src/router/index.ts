// /*
//  * This file is part of prose-app-web
//  *
//  * Copyright 2023, Prose Foundation
//  */

// /**************************************************************************
//  * IMPORTS
//  * ************************************************************************* */

// NPM
import { App } from "vue";
import {
  Router as VueRouter,
  createRouter,
  createWebHistory 
} from "vue-router";
import { JID } from "@prose-im/prose-sdk-js";

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

// import AppIndex from "@/views/app/AppIndex.vue";
// import AppSpotlightUnread from "@/views/app/spotlight/AppSpotlightUnread.vue";
// import AppSpotlightBrowseBase from "@/views/app/spotlight/AppSpotlightBrowseBase.vue";
// import AppSpotlightBrowsePeople from "@/views/app/spotlight/AppSpotlightBrowsePeople.vue";
// import AppSpotlightBrowseChannels from "@/views/app/spotlight/AppSpotlightBrowseChannels.vue";
// import AppSpotlightBrowseInvites from "@/views/app/spotlight/AppSpotlightBrowseInvites.vue";
// import AppSpotlightBrowseBlocked from "@/views/app/spotlight/AppSpotlightBrowseBlocked.vue";
// import AppInboxBase from "@/views/app/inbox/AppInboxBase.vue";

// // PROJECT: COMMONS
// import CONFIG from "@/commons/config";

// // PROJECT: STORES
// import Store from "@/store";

// // PROJECT: BROKER
// import Broker from "@/broker";

// // PROJECT: UTILITIES
// import logger from "@/utilities/logger";
// import UtilitiesTitle from "@/utilities/title";

// /**************************************************************************
//  * ENUMERATIONS
//  * ************************************************************************* */

enum NavigateState {
  // Forwards direction.
  Forwards = "forwards",
  // Backwards direction.
  Backwards = "backwards"
}

// /**************************************************************************
//  * ROUTER
//  * ************************************************************************* */

class Router {
  private readonly __router: VueRouter;

  private __lastNavigateStatePosition = 0;
  private __pendingNavigateState: NavigateState | null = null;

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

//           beforeEnter: async () => {
//             try {
//               await this.__guardAnonymous();
//             } catch (_) {
//               logger.warn(
//                 "Cannot route to the start login, user already logged in"
//               );
//             }
//           }
        },

        // --> APP <--

        {
          path: "/",
          name: "app",
          component: AppBase as object,

          // beforeEnter: async () => {
          //   try {
          //     await this.__guardAuthenticated();
          //   } catch (_) {
          //     logger.warn("Cannot route to the app, user not logged in");
          //   }

            // // Important: do not await here, as this would block routing while \
            // //   the broker client is connecting to the network. We want this \
            // //   to be done in the background while the app is already showing \
            // //   on screen for the user.
            // this.__setupBrokerClient();
          // },

          children: [
            {
              path: "/team/members",
              name: "app.members",
              component: AppTeamMembers as object,

          //     beforeEnter: async (_to, from) => {
          //       // Redirect to last used room?
          //       // Notice: only do so when the application just loaded, ie. we \
          //       //   are not navigating from anywhere.
          //       const lastRoomId = Store.$navigation.inbox.lastRoomId;

          //       if (!from.name && lastRoomId !== null) {
          //         logger.info(`Restoring last used room: ${lastRoomId}`);

          //         // Restore last used room instead
          //         return {
          //           name: "app.inbox",

          //           params: {
          //             roomId: lastRoomId
          //           }
          //         };
          //       }
          //     }
            },

            {
              path: "/server/configuration",
              name: "app.server",
              component: AppServerConfiguration as object,
            },

            {
              path: "/customization/workspace",
              name: "app.customization.workspace",
              component: AppCustomizationWorkspace as object,
            },

            {
              path: "/customization/emojis",
              name: "app.customization.emojis",
              component: AppCustomizationEmojis as object,
            },

            {
              path: "/advanced/security",
              name: "app.advanced.security",
              component: AppAdvancedSecurity as object,
            },

            {
              path: "/advanced/network",
              name: "app.advanced.network",
              component: AppAdvancedNetwork as object,
            },

            {
              path: "/advanced/backup",
              name: "app.advanced.backup",
              component: AppAdvancedBackup as object,
            },
          //   {
          //     path: "spotlight/browse/",
          //     name: "app.spotlight.browse",
          //     component: AppSpotlightBrowseBase as object,

          //     children: [
          //       {
          //         path: "people/",
          //         name: "app.spotlight.browse.people",
          //         component: AppSpotlightBrowsePeople as object
          //       },

          //       {
          //         path: "channels/",
          //         name: "app.spotlight.browse.channels",
          //         component: AppSpotlightBrowseChannels as object
          //       },

          //       {
          //         path: "invites/",
          //         name: "app.spotlight.browse.invites",
          //         component: AppSpotlightBrowseInvites as object
          //       },

          //       {
          //         path: "blocked/",
          //         name: "app.spotlight.browse.blocked",
          //         component: AppSpotlightBrowseBlocked as object
          //       }
          //     ]
          //   },

          //   {
          //     path: "inbox/:roomId/",
          //     name: "app.inbox",
          //     component: AppInboxBase as object
          //   }
          ]
        },

//         // --> REDIRECT <--

//         { path: "/:path(.*)*", redirect: "/" }
      ]
    });

//     // Bind router events
//     this.__bindEvents(this.__router);
  }

  bind(app: App): void {
    // Bind to app
    app.use(this.__router);
  }

  instance(): VueRouter {
    return this.__router;
  }

//   private async __guardAuthenticated(): Promise<void> {
//     // Ensure that user is logged in (redirect to base if not)
//     if (!Store.$account.credentials.jid) {
//       this.__router.push({
//         name: "start.login"
//       });

//       return Promise.reject();
//     }
//   }

//   private async __guardAnonymous(): Promise<void> {
//     // Ensure that user is not logged-in (redirect to app if so)
//     if (Store.$account.credentials.jid) {
//       this.__router.push({
//         name: "app.index"
//       });

//       return Promise.reject();
//     }
//   }

//   private async __setupBrokerClient(): Promise<void> {
//     // Authenticate to broker client
//     const credentials = Store.$account.credentials;

//     if (credentials.jid) {
//       try {
//         const jid = new JID(credentials.jid);

//         // Authenticate client? (if not already bound to JID, eg. user just \
//         //   logged-in)
//         if (Broker.client.authenticationJID?.equals(jid) !== true) {
//           await Broker.client.authenticate(jid, credentials.password);
//         }

//         // Start observers
//         await Broker.client.observe();
//       } catch (error) {
//         // Ignore authentication errors here
//         logger.error("Error setting up broker client", error);
//       }
//     }
//   }

//   private __bindEvents(router: VueRouter) {
//     // Initialize initial navigation position
//     if (history.state !== null) {
//       this.__lastNavigateStatePosition = history.state.position;
//     }

//     // Bind to window history events
//     window.addEventListener("popstate", event => {
//       if (event.state !== null) {
//         // Reset pending navigation state first
//         this.__pendingNavigateState = null;

//         // Assign pending navigation state (as needed)
//         if (event.state.position < this.__lastNavigateStatePosition) {
//           this.__pendingNavigateState = NavigateState.Backwards;
//         } else if (event.state.position > this.__lastNavigateStatePosition) {
//           this.__pendingNavigateState = NavigateState.Forwards;
//         }

//         // Handle history change straight away
//         // Notice: this cannot be done in 'router.afterEach' due to the the \
//         //   'popstate' event firing AFTER 'router.afterEach' fires, therefore \
//         //   the marker has no time to be set.
//         switch (this.__pendingNavigateState) {
//           case NavigateState.Backwards: {
//             // Move to previous in history
//             Store.$history.movePrevious();

//             break;
//           }

//           case NavigateState.Forwards: {
//             // Move to next in history
//             Store.$history.moveNext();

//             break;
//           }
//         }

//         // Assign new position in state
//         this.__lastNavigateStatePosition = event.state.position;
//       }
//     });

//     history.pushState = new Proxy(history.pushState, {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       apply: (target, self, data: any) => {
//         // Update navigation state (always reset, as we are navigating)
//         this.__pendingNavigateState = null;
//         this.__lastNavigateStatePosition = data[0].position;

//         // Trigger original 'pushState'
//         return target.apply(self, data);
//       }
//     });

//     // Bind to router events
//     router.afterEach((to, from) => {
//       // Ensure title from last route has been cleared
//       // Notice: only if route path changed, since pushing twice the same \
//       //   route with the same parameters will lead to this hook being called \
//       //   twice, even if we did not actually navigate following the second \
//       //   route push. This would lead to the page title for the mounted view \
//       //   being wrongfully reset.
//       if (to?.path !== from?.path) {
//         UtilitiesTitle.reset();
//       }

//       // Update current history?
//       if (to?.name) {
//         // No navigation state pending, meaning the route changes by pushing \
//         //   the state.
//         if (this.__pendingNavigateState === null) {
//           Store.$history.setCurrent(to.name as string, to.params);
//         }
//       }

//       // Reset pending navigation state
//       this.__pendingNavigateState = null;
//     });
//   }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new Router();
