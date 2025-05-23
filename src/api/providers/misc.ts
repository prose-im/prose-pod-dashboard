/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// PROJECT: API
import Api from "@/api";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface PodComponentsVersions {
  api: VersionInfo;
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

class APIMisc {
  async getPodVersion(): Promise<PodComponentsVersions> {
    return (await Api.client.get("/pod/version")).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIMisc();
