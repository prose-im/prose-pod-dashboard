/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { default as axios, AxiosInstance } from "axios";

// PROJECT: COMMONS
import CONFIG from "@/commons/config";

/**************************************************************************
 * STORE
 * ************************************************************************* */

class API {
  public readonly client: AxiosInstance;

  constructor() {
    // Initialize API HTTP client
    this.client = this.__createClient();
  }

  private __createClient(): AxiosInstance {
    return axios.create({
      baseURL: `${CONFIG.api.endpoint.local}/${CONFIG.api.version}`,

      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new API();
