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

interface WorkspaceColorResponse {
  color: string;
}

/**************************************************************************
 * API
 * ************************************************************************* */

export class APIAdvancedSecurity {
  /**  NETWORK ENCRYPTION **/

  async updateTlsProfile(newTlsProfile: string): Promise<void> {
    await Api.client.put("/server/config/tls-profile", {
      tls_profile: newTlsProfile
    });
  }

  async resetTlsProfile(): Promise<ServerConfigResponse> {
    return (await Api.client.put("/server/config/tls-profile/reset")).data;
  }

  /**  APPEARANCE  **/

  async getWorkspaceColor(): Promise<WorkspaceColorResponse> {
    return (await Api.client.get("/workspace/accent-color")).data;
  }

  async updateWorkspaceColor(newColor: string): Promise<void> {
    await Api.client.put("/workspace/accent-color", {
      newColor
    });
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIAdvancedSecurity();
