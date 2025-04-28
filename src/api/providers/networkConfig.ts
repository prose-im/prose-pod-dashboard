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

export interface DnsRecordA {
  hostname: Hostname;
  type: "A";
  ttl: number;
  value: Ipv4;
}
export interface DnsRecordAAAA {
  hostname: Hostname;
  type: "AAAA";
  ttl: number;
  value: Ipv6;
}
export interface DnsRecordSRV {
  hostname: Hostname;
  type: "SRV";
  ttl: number;
  priority: number;
  weight: number;
  port: number;
  target: string;
}
export interface DnsRecordStringRepr {
  string_repr: string;
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
  Valid = "VALID",
  PartiallyValid = "PARTIALLY_VALID",
  Checking = "CHECKING",
  Invalid = "INVALID"
}
export enum PortReachabilityStatus {
  Queued = "QUEUED",
  Open = "OPEN",
  Checking = "CHECKING",
  Closed = "CLOSED"
}
export enum IpConnectivityStatus {
  Queued = "QUEUED",
  Success = "SUCCESS",
  Checking = "CHECKING",
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

export type AnyDnsRecord = DnsRecordA | DnsRecordAAAA | DnsRecordSRV;
export type AnyDnsRecordWithStringRepr = AnyDnsRecord & DnsRecordStringRepr;

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
  /* DNS SETUP */

  async getDnsRecords(): Promise<GetDnsRecordsResponse> {
    return (await Api.client.get("/v1/network/dns/records")).data;
  }

  /* NETWORK CHECKS */

  checkAll(
    onMessage: (
      message:
        | DnsRecordCheckResult
        | PortReachabilityCheckResult
        | IpConnectivityCheckResult
    ) => void,
    onClose: () => void,
    abortSignal: AbortSignal,
    /** Default value: 5 minutes. */
    timeoutMillis = 5 * 60 * 1_000
  ): Promise<void> {
    return new Promise<void>(resolve => {
      function end(message: string, timeout = null as NodeJS.Timeout | null) {
        return () => {
          clearTimeout(timeout ?? undefined);
          eventSource.close();
          resolve();
          onClose();
        };
      }
      const timeout = setTimeout(
        end("Network checks timed out."),
        timeoutMillis
      );

      const eventSource = Api.eventSource("/v1/network/checks");

      // Event processing
      eventSource.addEventListener("dns-record-check-result", event => {
        onMessage({
          event: "dns-record-check-result",
          id: event.lastEventId,
          data: JSON.parse(event.data)
        });
      });
      eventSource.addEventListener("port-reachability-check-result", event => {
        onMessage({
          event: "port-reachability-check-result",
          id: event.lastEventId,
          data: JSON.parse(event.data)
        });
      });
      eventSource.addEventListener("ip-connectivity-check-result", event => {
        onMessage({
          event: "ip-connectivity-check-result",
          id: event.lastEventId,
          data: JSON.parse(event.data)
        });
      });

      // Stream management
      eventSource.addEventListener(
        "end",
        end("Server asked to close the network checks stream.", timeout)
      );
      eventSource.onerror = error => {
        console.error("Error when enriching members:", error);
      };
      abortSignal.addEventListener(
        "abort",
        end("Network checks stream aborted.", timeout)
      );
    });
  }
  async checkAllOnce(): Promise<AnyNetworkCheckResult[]> {
    return (await Api.client.get("/v1/network/checks")).data;
  }

  async checkDnsRecordsOnce(): Promise<DnsRecordCheckResult[]> {
    return (await Api.client.get("/v1/network/checks/dns")).data;
  }
  async checkPortsReachabilityOnce(): Promise<PortReachabilityCheckResult[]> {
    return (await Api.client.get("/v1/network/checks/ports")).data;
  }
  async checkIpConnectivityOnce(): Promise<IpConnectivityCheckResult[]> {
    return (await Api.client.get("/v1/network/checks/ip")).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APINetworkConfig();
