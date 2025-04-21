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
import { CssColor } from "./global";
import { Avatar } from "./members";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface Workspace {
  name: WorkspaceName;
  icon: WorkspaceIcon | null;
  accent_color: CssColor | null;
}

interface WorkspacePatchRequest {
  name?: WorkspaceName | null;
  accent_color?: CssColor | null;
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type WorkspaceName = string;
/** A Base64-encoded image. */
export type WorkspaceIcon = Avatar;

/* *************************************************************************
 * API
 * ************************************************************************* */

export class APIWorkspace {
  /** WORKSPACE DETAILS **/

  async initWorkspace(workspace: Workspace): Promise<Workspace> {
    return (await Api.client.put("/v1/workspace", workspace)).data;
  }

  async getWorkspace(): Promise<Workspace> {
    return (await Api.client.get("/v1/workspace")).data;
  }

  async patchWorkspace(patch: WorkspacePatchRequest): Promise<Workspace> {
    return (await Api.client.patch("/v1/workspace", patch)).data;
  }

  /** WORKSPACE NAME **/

  async setWorkspaceName(newName: WorkspaceName): Promise<WorkspaceName> {
    return (await Api.client.put("/v1/workspace/name", newName)).data;
  }

  async getWorkspaceName(): Promise<WorkspaceName> {
    return (await Api.client.get("/v1/workspace/name")).data;
  }

  /** WORKSPACE ACCENT COLOR **/

  async setWorkspaceAccentColor(
    newAccentColor: CssColor | null
  ): Promise<CssColor | null> {
    return (await Api.client.put("/v1/workspace/accent-color", newAccentColor))
      .data;
  }

  async getWorkspaceAccentColor(): Promise<CssColor | null> {
    return (await Api.client.get("/v1/workspace/accent-color")).data;
  }

  /** WORKSPACE ICON **/

  async setWorkspaceIcon(
    newIcon: WorkspaceIcon | null
  ): Promise<WorkspaceIcon | null> {
    return (
      await Api.client.put("/v1/workspace/icon", newIcon?.base64, {
        headers: { "Content-Type": newIcon?.type }
      })
    ).data;
  }

  async getWorkspaceIcon(): Promise<WorkspaceIcon | null> {
    return (await Api.client.get("/v1/workspace/icon")).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIWorkspace();
