/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import axios, { AxiosInstance, AxiosHeaderValue, AxiosError } from "axios";
import { EventSource } from "extended-eventsource";

// PROJECT: COMMONS
import CONFIG from "@/commons/config";

// PROJECT: STORES
import store from "@/store";
import BaseAlert from "@/components/base/BaseAlert.vue";
import router from "@/router";

/* *************************************************************************
 * CONSTANTS
 ***************************************************************************/

const HTTP_TIMEOUT = 30000; // 30 seconds

/* *************************************************************************
 * STORE
 * ************************************************************************* */

class API {
  public readonly client: AxiosInstance;
  public static BASE_URL = `${CONFIG.api.endpoint.local}`;

  private token: string | null = null;

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
      async function (error: AxiosError) {
        // Check if the error response status is 401 before logging out
        if (error.response) {
          if (error.response.status === 401) {
            try {
              // Logout from account
              await store.$account.logout();

              // Redirect to login page
              // console.log("router", router.instance());
              router
                .instance()
                .push("/start/login")
                .catch(err => {
                  // Handle redundant navigation error
                  console.error("error reroute:", err);
                });

              // Acknowledge logout success
              BaseAlert.info("Logged out", "Logged out of your dashboard");
            } catch (e) {
              console.error("router error", e);
              BaseAlert.error("Could not log out", "Maybe try again?");
            }
          } else if (error.response.status === 500) {
            setTimeout(() => console.log("error 500", error.response), 5000);

            if (error.response.statusText === "Internal Server Error") {
              router
                .instance()
                .push("/error")
                .catch(err => {
                  // Handle redundant navigation error
                  console.error("error reroute:", err);
                });
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
    return new EventSource(`${API.BASE_URL}${route}`, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      disableRetry: true
    });
  }

  private __createClient(): AxiosInstance {
    return axios.create({
      baseURL: API.BASE_URL,
      timeout: HTTP_TIMEOUT,
      // NOTE: Some routes accept primitive JSON types,
      //   but Axios doesn’t mark it as JSON by default.
      //   This sets a default value for the `Content-Type` header.
      headers: {
        "Content-Type": "application/json"
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
