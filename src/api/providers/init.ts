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

class APIInit {
  async isPodInitialized(): Promise<boolean> {
    // NOTE: This is a shortcut. `HEAD /v1/server/config` is the only route
    //   that allows checking if the Pod is completely initialized at the
    //   time of writing this, we’ll improve that later.
    return (
      (
        await Api.client.head("/v1/server/config", {
          headers: {
            "If-None-Match": "*"
          },
          validateStatus: status => status === 204 || status === 412
        })
      ).status === 204
    );
  }

  async initWorkspace(name: string): Promise<Workspace> {
    return (await Api.client.put("/v1/workspace", { name })).data;
  }

  async initServer(domain: string): Promise<ServerConfig> {
    return (await Api.client.put("/v1/server/config", { domain })).data;
  }
  /** Note: Requires the server to be initialized. */
  async createFirstAccount(data: InitFirstAccountRequest): Promise<Member> {
    return (await Api.client.put("/v1/init/first-account", data)).data;
  }

  async initPodConfig(data: InitPodConfigRequest): Promise<PodConfig> {
    return APIPodConfig.initPodConfig(data);
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
