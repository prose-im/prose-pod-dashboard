/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// PROJECT: API
import Api from "@/api";
import { ServerConfigResponse } from "./global";

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface DnsRecord {
  type: string;
  hostname: string;
  ttl: number;
  priority: number;
  weight: number;
  port: number;
  target: string;
  string_repr: string;
}

export interface DnsStep {
  purpose: string;
  records: DnsRecord[];
}

interface DNSRecordsResponse {
  steps: DnsStep[];
}

interface AllNetworkChecksResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

export interface CheckData {
  description: string;
  status: string;
}

interface CheckRecord {
  id: string;
  event: string;
  data: CheckData;
}

/**************************************************************************
 * TYPES
 * ************************************************************************* */

type CheckResponse = CheckRecord[];

/**************************************************************************
 * API
 * ************************************************************************* */

class APIAdvancedNetwork {
  /**  SERVER FEDERATION **/
  async updateServerFederationEnabled(newState: boolean): Promise<void> {
    return await Api.client.put(`/server/config/federation-enabled`, {
      federation_enabled: newState
    });
  }

  async restoreServerFederationEnabled(): Promise<ServerConfigResponse> {
    return (await Api.client.put(`/server/config/federation-enabled/reset`))
      .data;
  }

  /**  DNS RECORDS  **/

  async getDnsRecords(): Promise<DNSRecordsResponse> {
    return (await Api.client.get(`/network/dns/records`)).data;
  }

  /**  NETWORK CHECKS  **/

  async getAllNetworkChecks(): Promise<AllNetworkChecksResponse> {
    return (await Api.client.get(`/network/checks`)).data;
  }

  async getDnsRecordsCheck(): Promise<CheckResponse> {
    return (await Api.client.get(`/network/checks/dns`)).data;
  }

  async getPortsCheck(): Promise<CheckResponse> {
    return (await Api.client.get(`/network/checks/ports`)).data;
  }

  async getIPConnectivityCheck(): Promise<CheckResponse> {
    return (await Api.client.get(`/network/checks/ip`)).data;
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIAdvancedNetwork();
