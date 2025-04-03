/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// PROJECT: API
import Api from "@/api";
import { Hostname, Ipv4, Ipv6 } from "./global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface DnsRecordA {
  hostname: Hostname;
  type: "A";
  ttl: number;
  value: Ipv4;
}
interface DnsRecordAAAA {
  hostname: Hostname;
  type: "AAAA";
  ttl: number;
  value: Ipv6;
}
interface DnsRecordSRV {
  hostname: Hostname;
  type: "SRV";
  ttl: number;
  priority: number;
  weight: number;
  port: number;
  target: string;
}

export interface DnsSetupStep {
  /** The purpose of this step. Note that it always starts with a lowercase letter. */
  purpose: string;
  records: AnyDnsRecordWithStringRepr[];
}
interface GetDnsRecordsResponse {
  steps: DnsSetupStep[];
}

export enum DnsRecordStatus {
  Queued = "QUEUED",
  Checking = "CHECKING",
  Valid = "VALID",
  PartiallyValid = "PARTIALLY_VALID",
  Invalid = "INVALID"
}
export enum PortReachabilityStatus {
  Queued = "QUEUED",
  Checking = "CHECKING",
  Open = "OPEN",
  Closed = "CLOSED"
}
export enum IpConnectivityStatus {
  Queued = "QUEUED",
  Checking = "CHECKING",
  Success = "SUCCESS",
  Failure = "FAILURE"
}

export interface CheckResultData<Status extends AnyNetworkCheckStatus> {
  description: string;
  status: Status;
}

export interface DnsRecordCheckResult {
  id: string;
  event: "dns-record-check-result";
  data: CheckResultData<DnsRecordStatus>;
}
export interface PortReachabilityCheckResult {
  id: string;
  event: "port-reachability-check-result";
  data: CheckResultData<PortReachabilityStatus>;
}
export interface IpConnectivityCheckResult {
  id: string;
  event: "ip-connectivity-check-result";
  data: CheckResultData<IpConnectivityStatus>;
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

type AnyDnsRecord = DnsRecordA | DnsRecordAAAA | DnsRecordSRV;
type AnyDnsRecordWithStringRepr = AnyDnsRecord & {
  string_repr: string;
};

export type AnyNetworkCheckResult =
  | DnsRecordCheckResult
  | PortReachabilityCheckResult
  | IpConnectivityCheckResult;
export type AnyNetworkCheckStatus =
  | DnsRecordStatus
  | PortReachabilityStatus
  | IpConnectivityStatus;

/* *************************************************************************
 * API
 * ************************************************************************* */

class APINetworkConfig {
  /** DNS SETUP **/

  async getDnsRecords(): Promise<GetDnsRecordsResponse> {
    return (await Api.client.get(`/v1/network/dns/records`)).data;
  }

  /** NETWORK CHECKS **/

  async checkAll(): Promise<AnyNetworkCheckResult[]> {
    return (await Api.client.get(`/v1/network/checks`)).data;
  }

  async checkDnsRecords(): Promise<DnsRecordCheckResult[]> {
    return (await Api.client.get(`/v1/network/checks/dns`)).data;
  }
  async checkPortsReachability(): Promise<PortReachabilityCheckResult[]> {
    return (await Api.client.get(`/v1/network/checks/ports`)).data;
  }
  async checkIpConnectivity(): Promise<IpConnectivityCheckResult[]> {
    return (await Api.client.get(`/v1/network/checks/ip`)).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APINetworkConfig();
