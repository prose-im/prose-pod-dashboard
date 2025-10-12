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
import { Timestamp, TimeToLive } from "@/api/providers/global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface License {
  id: string;
  name: string;
  user_limit: number;
  expiry: Timestamp;
  ttl_ms: TimeToLive;
}

export interface Status {
  license: License;
  user_count: number;
  remaining_seats: number;
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type LicenseKey = string;

/* *************************************************************************
 * API
 * ************************************************************************* */

class APILicensing {
  async setLicense(licenseKey: LicenseKey): Promise<void> {
    await Api.client.put("/v1/licensing/license", licenseKey);
  }

  async getLicense(): Promise<License> {
    return (await Api.client.get("/v1/licensing/license")).data;
  }

  async getStatus(): Promise<Status> {
    return (await Api.client.get("/v1/licensing/status")).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APILicensing();
