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

/**************************************************************************
 * CONSTANTS
 ***************************************************************************/

const HTTP_TIMEOUT = 10000; // 10 seconds

/**************************************************************************
 * STORE
 * ************************************************************************* */

class API {
  public readonly client: AxiosInstance;

  constructor() {
    // Initialize API HTTP client
    this.client = this.__createClient();
  }

  authenticate(token: string | null): void {
    // Assign token to common authorization
    this.__setCommonHeader("Authorization", `Bearer ${token}`);
  }

  private __createClient(): AxiosInstance {
    return axios.create({
      baseURL: `${CONFIG.api.endpoint.local}/${CONFIG.api.version}`,
      timeout: HTTP_TIMEOUT,

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

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new API();
