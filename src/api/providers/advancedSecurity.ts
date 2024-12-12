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
  name: string
}

interface WorkspaceIconResponse {
  icon: string
}

interface WorkspaceDetailsCardResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

interface WorkspaceColorResponse {
  color: string
}

/**************************************************************************
 * API
 * ************************************************************************* */

export class APIAdvancedSecurity {

  /**  WORKSPACE PROFILE **/

  async getWorkspaceName(): Promise<WorkspaceNameResponse> {
    return (await Api.client.get("/workspace/name")).data;
  }

  async updateWorkspaceName(newName: string): Promise<void> {
    await Api.client.put("/workspace/name", {
      newName
    });
  }

  async getWorkspaceIcon(): Promise<WorkspaceIconResponse> {
    return (await Api.client.get("/workspace/icon")).data;
  }

  async updateWorkspaceIcon(newIcon: string): Promise<void> {
    await Api.client.put("/workspace/icon", {
      newIcon
    });
  }

  async getWorkspaceDetailsCard(): Promise<WorkspaceDetailsCardResponse> {
    return (await Api.client.get("/workspace/details-card")).data;
  }

  async updateWorkspaceDetailsCard(newDetailsCard: string): Promise<void> {
    await Api.client.put("/workspace/details-card", {
      newDetailsCard
    });
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
