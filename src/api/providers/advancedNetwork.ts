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

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface DNSRecordsResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

interface AllNetworkChecksResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}


/**************************************************************************
 * API
 * ************************************************************************* */

class APIAdvancedNetwork {
  async getDnsRecords(): Promise<DNSRecordsResponse> {
    return (await Api.client.get(`/network/dns/records`)).data;
  }

  async getAllNetworkChecks(): Promise<AllNetworkChecksResponse> {
    return (await Api.client.get(`/network/checks`)).data;
  }

  async getDnsRecordsCheck(): Promise<AllNetworkChecksResponse> {
    return (await Api.client.get(`/network/checks/dns`)).data;
  }

  async getPortsCheck(): Promise<AllNetworkChecksResponse> {
    return (await Api.client.get(`/network/checks/ports`)).data;
  }

  async getIPConnectivityCheck(): Promise<AllNetworkChecksResponse> {
    return (await Api.client.get(`/network/checks/ip`)).data;
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIAdvancedNetwork();
