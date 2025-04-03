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

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Workspace {
  name: WorkspaceName;
  icon: WorkspaceIcon;
  accent_color: WorkspaceAccentColor;
}

interface WorkspacePatchRequest {
  name?: WorkspaceName | null;
  accent_color?: WorkspaceAccentColor | null;
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

type WorkspaceName = string;
type WorkspaceIcon = string | null;
type WorkspaceAccentColor = string | null;

/* *************************************************************************
 * API
 * ************************************************************************* */

export class APIWorkspace {
  /** WORKSPACE DETAILS **/

  async initWorkspace(workspace: Workspace): Promise<Workspace> {
    return (await Api.client.put("/workspace", workspace)).data;
  }

  async getWorkspace(): Promise<Workspace> {
    return (await Api.client.get("/workspace")).data;
  }

  async patchWorkspace(patch: WorkspacePatchRequest): Promise<Workspace> {
    return (await Api.client.patch("/workspace", patch)).data;
  }

  /** WORKSPACE NAME **/

  async setWorkspaceName(newName: WorkspaceName): Promise<WorkspaceName> {
    return (await Api.client.put("/workspace/name", newName)).data;
  }

  async getWorkspaceName(): Promise<WorkspaceName> {
    return (await Api.client.get("/workspace/name")).data;
  }

  /** WORKSPACE ACCENT COLOR **/

  async setWorkspaceAccentColor(
    newAccentColor: WorkspaceAccentColor
  ): Promise<WorkspaceAccentColor> {
    return (await Api.client.put("/workspace/accent-color", newAccentColor))
      .data;
  }

  async getWorkspaceAccentColor(): Promise<WorkspaceAccentColor> {
    return (await Api.client.get("/workspace/accent-color")).data;
  }

  /** WORKSPACE ICON **/

  async setWorkspaceIcon(newIcon: WorkspaceIcon): Promise<WorkspaceIcon> {
    return (await Api.client.put("/workspace/icon", newIcon)).data;
  }

  async getWorkspaceIcon(): Promise<WorkspaceIcon> {
    return (await Api.client.get("/workspace/icon")).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIWorkspace();
