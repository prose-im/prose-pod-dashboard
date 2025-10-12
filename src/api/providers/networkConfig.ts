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
import { Hostname, Ipv4, Ipv6 } from "@/api/providers/global";

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

export interface DnsRecordCNAME {
  hostname: Hostname;
  type: "CNAME";
  ttl: number;
  target: string;
}

export interface DnsRecordStringRepr {
  string_repr: string;
}

export interface DnsSetupStep {
  purpose: string;
  records: AnyDnsRecordWithStringRepr[];
}

interface GetDnsRecordsResponse {
  steps: DnsSetupStep[];
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
 * ENUMERATIONS
 * ************************************************************************* */

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

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type AnyDnsRecord =
  | DnsRecordA
  | DnsRecordAAAA
  | DnsRecordSRV
  | DnsRecordCNAME;
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
 * CONSTANTS
 * ************************************************************************* */

const CHECK_TIMEOUT_DEFAULT = 5 * 60 * 1_000; // 5 minutes

/* *************************************************************************
 * API
 * ************************************************************************* */

class APINetworkConfig {
  /* DNS SETUP */

  async getDnsRecords(): Promise<GetDnsRecordsResponse> {
    return (await Api.client.get("/v1/network/dns/records")).data;
  }

  /* CHECKS */

  checkAll(
    onMessage: (
      message:
        | DnsRecordCheckResult
        | PortReachabilityCheckResult
        | IpConnectivityCheckResult
    ) => void,
    onClose: () => void,
    abortSignal: AbortSignal,
    timeout = CHECK_TIMEOUT_DEFAULT
  ): Promise<void> {
    return new Promise<void>(resolve => {
      function end(_: string, timeout = null as NodeJS.Timeout | null) {
        return () => {
          clearTimeout(timeout ?? undefined);

          eventSource.close();

          resolve();
          onClose();
        };
      }

      const timeoutDelay = setTimeout(
        end("Network checks timed out."),
        timeout
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
        end("Server asked to close the network checks stream.", timeoutDelay)
      );

      eventSource.onerror = error => {
        console.error("Error on network checks stream:", error);
      };

      abortSignal.addEventListener(
        "abort",
        end("Network checks stream aborted.", timeoutDelay)
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
