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
import { Ipv4, Ipv6, Hostname, Url } from "@/api/providers/global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface PodAddress {
  domain: Hostname | null;
  ipv4: Ipv4 | null;
  ipv6: Ipv6 | null;
}

export interface PodConfig {
  address: PodAddress;
  dashboard_url: DashboardUrl;
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type DashboardUrl = Url | null;

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const POD_CONFIG_PREFIX = "/v1/pod/config";

/* *************************************************************************
 * API
 * ************************************************************************* */

class APIPodConfig {
  /** BASE **/

  async getPodConfig(): Promise<PodConfig> {
    return (await Api.client.get(`${POD_CONFIG_PREFIX}`)).data;
  }

  /** ADDRESS **/

  async getPodAddress(): Promise<PodAddress> {
    return (await Api.client.get(`${POD_CONFIG_PREFIX}/address`)).data;
  }

  /** DASHBOARD URL **/

  async getDashboardUrl(): Promise<DashboardUrl> {
    return (await Api.client.get(`${POD_CONFIG_PREFIX}/dashboard-url`)).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIPodConfig();
