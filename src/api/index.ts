/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { default as axios, AxiosInstance, AxiosHeaderValue } from "axios";

// PROJECT: COMMONS
import CONFIG from "@/commons/config";

// PROJECT: STORES
import store from "@/store";
import BaseAlert from "@/components/base/BaseAlert.vue";
import router from "@/router";

/**************************************************************************
 * CONSTANTS
 ***************************************************************************/

const HTTP_TIMEOUT = 30000; // 30 seconds

/**************************************************************************
 * STORE
 * ************************************************************************* */

class API {
  public readonly client: AxiosInstance;

  constructor() {
    // Initialize API HTTP client
    this.client = this.__createClient();

    this.addInterceptor();
  }

  addInterceptor() {
    this.client.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async function (error) {
        // Check if the error response status is 403 before logging out
        if (error.response && error.response.status === 403) {
          try {
            // Logout from account
            await store.$account.logout();

            // Redirect to login page
            console.log("router", router.instance());

            router
              .instance()
              .push("/start/login")
              .catch(err => {
                // Handle redundant navigation error
                console.error("error reroute:", err);
              });

            // Acknowledge logout success
            BaseAlert.info("Logged out", "Logged out of your dashboard");
          } catch (_) {
            console.error("router error", _);
            BaseAlert.error("Could not log out", "Maybe try again?");
          }
        }
        // Handle other errors globally if needed

        return Promise.reject(error);
      }
    );
  }

  authenticate(token: string | null): void {
    // Assign token to common authorization
    this.__setCommonHeader("Authorization", `Bearer ${token}`);
  }

  private __createClient(): AxiosInstance {
    return axios.create({
      baseURL: `${CONFIG.api.endpoint.local}/${CONFIG.api.version}`,
      timeout: HTTP_TIMEOUT
    });
  }

  private __setCommonHeader(
    name: string,
    value: AxiosHeaderValue | null
  ): void {
    const commonHeaders = this.client.defaults.headers.common;

    if (value === null) {
      delete commonHeaders[name];
    } else {
      commonHeaders[name] = value;
    }
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new API();
