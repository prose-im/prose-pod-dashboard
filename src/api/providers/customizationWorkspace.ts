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
 * TYPES
 * ************************************************************************* */

type WorkspaceConfigResponse = [
  WorkspaceNameResponse,
  WorkspaceIconResponse,
  WorkspaceColorResponse
];

/**************************************************************************
 * API
 * ************************************************************************* */

export class APICustomizationWorkspace {
  /**  CONFIG  **/

  async getWorkspaceConfig(): Promise<WorkspaceConfigResponse> {
    return await Promise.all([
      this.getWorkspaceName(),
      this.getWorkspaceIcon(),
      this.getWorkspaceColor()
    ]);
  }

  /**  WORKSPACE PROFILE **/

  async getWorkspaceName(): Promise<WorkspaceNameResponse> {
    return (await Api.client.get("/workspace/name")).data;
  }

  async setWorkspaceName(newName: string): Promise<void> {
    await Api.client.put("/workspace/name", {
      name: newName
    });
  }

  async getWorkspaceIcon(): Promise<WorkspaceIconResponse> {
    return (await Api.client.get("/workspace/icon")).data;
  }

  async setWorkspaceIcon(newIcon: string): Promise<void> {
    await Api.client.put("/workspace/icon", {
      method: "put",
      image: newIcon
    });
  }

  async getWorkspaceDetailsCard(): Promise<WorkspaceDetailsCardResponse> {
    return (await Api.client.get("/workspace/details-card")).data;
  }

  async setWorkspaceDetailsCard(newDetailsCard: string): Promise<void> {
    await Api.client.put("/workspace/details-card", {
      newDetailsCard
    });
  }

  /**  APPEARANCE  **/

  async getWorkspaceColor(): Promise<WorkspaceColorResponse> {
    return (await Api.client.get("/workspace/accent-color")).data;
  }

  async setWorkspaceColor(newColor: string): Promise<void> {
    await Api.client.put("/workspace/accent-color", {
      color: newColor
    });
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APICustomizationWorkspace();
