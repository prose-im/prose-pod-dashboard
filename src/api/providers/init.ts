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
import { Url } from "./global";
import { Member } from "./members";
import APIPodConfig, {
  DashboardUrl,
  InitPodConfigRequest,
  PodConfig
} from "./podConfig";
import { ServerConfig } from "./serverConfig";
import { Workspace } from "./workspace";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface InitFirstAccountRequest {
  username: string;
  password: string;
  nickname: string;
}

/* *************************************************************************
 * API
 * ************************************************************************* */

async function resource_exists(path: string) {
  return (
    (
      await Api.client.head(path, {
        headers: {
          "If-Match": "*"
        },
        validateStatus: status => [204, 412].includes(status)
      })
    ).status === 204
  );
}

class APIInit {
  async isPodInitialized(): Promise<boolean> {
    // NOTE: We don’t check for `isPodConfigInitialized` because
    //   this doesn’t happen during the initialization process
    //   (it happens when the Dashboard loads).
    return (
      (await this.isServerInitialized()) &&
      (await this.isWorkspaceInitialized()) &&
      (await this.isFirstAccountCreated())
    );
  }

  async initWorkspace(name: string): Promise<Workspace> {
    return (await Api.client.put("/v1/workspace", { name })).data;
  }
  async isWorkspaceInitialized(): Promise<boolean> {
    return resource_exists("/v1/workspace");
  }

  async initServer(domain: string): Promise<ServerConfig> {
    return (await Api.client.put("/v1/server/config", { domain })).data;
  }
  async isServerInitialized(): Promise<boolean> {
    return resource_exists("/v1/server/config");
  }

  /** Note: Requires the server to be initialized. */
  async createFirstAccount(data: InitFirstAccountRequest): Promise<Member> {
    return (await Api.client.put("/v1/init/first-account", data)).data;
  }
  async isFirstAccountCreated(): Promise<boolean> {
    return (
      (
        await Api.client.head("/v1/init/first-account", {
          validateStatus: status => [204, 409].includes(status)
        })
      ).status === 409
    );
  }

  async initPodConfig(data: InitPodConfigRequest): Promise<PodConfig> {
    return APIPodConfig.initPodConfig(data);
  }
  async isPodConfigInitialized(): Promise<boolean> {
    return resource_exists("/v1/pod/config");
  }
  /** Note: Requires the Pod configuration to be initialized. */
  async initDashboardUrl(url: Url): Promise<DashboardUrl> {
    return APIPodConfig.setDashboardUrl(url);
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIInit();
