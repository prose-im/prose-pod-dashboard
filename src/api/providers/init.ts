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
import { Member } from "@/api/providers/members";
import { Workspace } from "@/api/providers/workspace";
import { OnboardingChecks } from "@/store/tables/account";

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
  /** BASE **/

  async isPodInitialized(): Promise<boolean> {
    // Notice: we don’t check for `isPodConfigInitialized` because
    //   this doesn’t happen during the initialization process
    //   (it happens when the Dashboard loads).
    return (
      (await this.isWorkspaceInitialized()) &&
      (await this.isFirstAccountCreated())
    );
  }

  /** WORKSPACE **/

  async initWorkspace(name: string): Promise<Workspace> {
    return (await Api.client.put("/v1/workspace", { name })).data;
  }

  async isWorkspaceInitialized(): Promise<boolean> {
    return this.__resourceExists("/v1/workspace");
  }

  /** ACCOUNT **/

  async createFirstAccount(data: InitFirstAccountRequest): Promise<Member> {
    return (await Api.client.put("/v1/init/first-account", data)).data;
  }

  async isFirstAccountCreated(): Promise<boolean> {
    return (await Api.client.head("/v1/init/first-account")).status === 200;
  }

  /** ONBOARDING **/

  async getOnboardingStatus(): Promise<OnboardingChecks> {
    return (await Api.client.get("/v1/onboarding-steps")).data;
  }

  private async __resourceExists(path: string) {
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
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIInit();
