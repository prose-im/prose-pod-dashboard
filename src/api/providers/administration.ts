/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { AxiosRequestConfig } from "axios";

// PROJECT: API
import Api from "@/api";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface FactoryResetConfirmation {
  confirmation: string;
}

export interface VersionInfo {
  /** @example `"v0.4.0 (2025-01-01)"` */
  version: string;
  /** @example `"v0.4.0"` */
  tag: string;
  /** @example `"2025-01-01"` */
  build_date: string | null;
  /** @example `"2025-01-01T22:12:00Z"` */
  build_timestamp: string | null;
  /** @example `"e3e6bbb"` */
  commit_short: string | null;
  /** @example `"e3e6bbba82fa0d1934990f878c1db376fc35f7d8"` */
  commit_long: string | null;
}

/* *************************************************************************
 * API
 * ************************************************************************* */

class APIAdministration {
  /** FACTORY RESET **/

  async getFactoryResetConfirmation(
    password: string
  ): Promise<FactoryResetConfirmation> {
    // Important: do not validate status so that interceptor for 401 does \
    //   not trigger and log out user when an invalid password is provided.
    const parameters: AxiosRequestConfig = {
      data: { password },
      validateStatus: null
    };

    // Execute query
    const response = await Api.client.delete("/", parameters);

    // Validate status code
    if (response.status !== 202) {
      throw new Error(`Invalid confirmation status: ${response.status}`);
    }

    return response.data;
  }

  async factoryReset(confirmation: FactoryResetConfirmation): Promise<void> {
    return (await Api.client.delete("/", { data: confirmation })).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIAdministration();
