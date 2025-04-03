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
import { Ipv4, Ipv6, Hostname, Url } from "./global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface PodAddress {
  ipv4: Ipv4 | null;
  ipv6: Ipv6 | null;
  hostname: Hostname | null;
}
export interface PodConfig {
  address: PodAddress;
  dashboard_url: DashboardUrl;
}

/** Note: At least one value must be non-`null`. */
export interface SetPodAddressRequest {
  ipv4?: Ipv4 | null;
  ipv6?: Ipv6 | null;
  hostname?: Hostname | null;
}
export interface InitPodConfigRequest {
  address: SetPodAddressRequest;
  dashboard_url: DashboardUrl;
}
/** Note: At least one value must be defined. */
export interface PatchPodAddressRequest {
  ipv4?: Ipv4 | null;
  ipv6?: Ipv6 | null;
  hostname?: Hostname | null;
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

type DashboardUrl = Url | null;

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const POD_CONFIG_PREFIX = "/pod/config";

/* *************************************************************************
 * API
 * ************************************************************************* */

class APIPodConfig {
  async initPodConfig(podConfig: InitPodConfigRequest): Promise<PodConfig> {
    return (await Api.client.put(`${POD_CONFIG_PREFIX}`, podConfig)).data;
  }
  async getPodConfig(): Promise<PodConfig> {
    return (await Api.client.get(`${POD_CONFIG_PREFIX}`)).data;
  }

  /** POD ADDRESS **/

  async setPodAddress(newValue: SetPodAddressRequest): Promise<PodAddress> {
    return (await Api.client.put(`${POD_CONFIG_PREFIX}/address`, newValue))
      .data;
  }
  async getPodAddress(): Promise<PodAddress> {
    return (await Api.client.get(`${POD_CONFIG_PREFIX}/address`)).data;
  }
  async patchPodAddress(change: PatchPodAddressRequest): Promise<PodAddress> {
    return (await Api.client.patch(`${POD_CONFIG_PREFIX}/address`, change))
      .data;
  }

  /** DASHBOARD URL **/

  async setDashboardUrl(newValue: DashboardUrl): Promise<DashboardUrl> {
    return (
      await Api.client.put(`${POD_CONFIG_PREFIX}/dashboard-url`, newValue)
    ).data;
  }
  async getDashboardUrl(): Promise<DashboardUrl> {
    return (await Api.client.get(`${POD_CONFIG_PREFIX}/dashboard-url`)).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIPodConfig();
