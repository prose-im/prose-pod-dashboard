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
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIAdvancedNetwork();
