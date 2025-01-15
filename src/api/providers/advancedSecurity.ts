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

interface WorkspaceNameResponse {
  name: string;
}

interface WorkspaceIconResponse {
  icon: string;
}

interface WorkspaceDetailsCardResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

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

  async resetTlsProfile(): Promise<WorkspaceIconResponse> {
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
