/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import axios, { AxiosInstance, AxiosHeaderValue, AxiosError } from "axios";
import { EventSource } from "extended-eventsource";

// PROJECT: COMMONS
import CONFIG from "@/commons/config";

// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: STORE
import store from "@/store";

// PROJECT: ROUTER
import router from "@/router";

/* *************************************************************************
 * CONSTANTS
 ***************************************************************************/

const HTTP_TIMEOUT = 30000; // 30 seconds

const BASE_URL = CONFIG.api.endpoint.local;

/* *************************************************************************
 * STORE
 * ************************************************************************* */

class API {
  public readonly client: AxiosInstance;

  private token: string | null = null;

  constructor() {
    // Initialize API HTTP client
    this.client = this.__createClient();

    this.addInterceptor();
  }

  addInterceptor() {
    const self = this;

    this.client.interceptors.response.use(
      function (response) {
        // Success responses
        return response;
      },

      async function (error: AxiosError) {
        // Only trigger interceptor if we are logged-in
        // Notice: check if the error response status is 401 before logging out
        if (self.token && error.response) {
          switch (error.response.status) {
            case 401: {
              try {
                // Logout from account
                await store.$account.logout();

                // Redirect to login page
                router
                  .instance()
                  .push({ name: "start.login", query: { action: "logout" } });
              } catch (e) {
                BaseAlert.error("Could not log out", "Maybe try again?");
              }

              break;
            }

            case 500: {
              if (error.response.statusText === "Internal Server Error") {
                router.instance().push("/error");
              }

              break;
            }
          }
        }

        // Handle other errors globally if needed
        return Promise.reject(error);
      }
    );
  }

  authenticate(token: string | null): void {
    this.token = token;

    // Assign token to common authorization
    this.__setCommonHeader("Authorization", `Bearer ${token}`);
  }

  eventSource(route: string): EventSource {
    return new EventSource(`${BASE_URL}${route}`, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      disableRetry: true
    });
  }

  private __createClient(): AxiosInstance {
    return axios.create({
      baseURL: BASE_URL,
      timeout: HTTP_TIMEOUT,

      // Notice: some routes accept primitive JSON types, but Axios doesn’t \
      //   mark it as JSON by default. This sets a default value for the \
      //   `Content-Type` header.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
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

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new API();
