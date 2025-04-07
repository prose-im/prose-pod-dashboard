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
import { BareJid } from "./global";
import { EventSource } from "extended-eventsource";

/* *************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

export enum MemberRole {
  Member = "MEMBER",
  Admin = "ADMIN"
}

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface Member {
  jid: BareJid;
  role: MemberRole;
}

export interface EnrichMembersResponse {
  [key: BareJid]: EnrichedMember;
}

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

export const RolesDisplayStrings = {
  [MemberRole.Member]: "Member",
  [MemberRole.Admin]: "Admin"
};

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type EnrichedMember = Member & {
  online: boolean;
  nickname: string;
  avatar: string | null;
};

/* *************************************************************************
 * API
 * ************************************************************************* */

class APITeamMembers {
  async getAllMembers(): Promise<Member[]> {
    return (await Api.client.get("/v1/members")).data;
  }

  async getMember(jid: BareJid): Promise<EnrichedMember | null> {
    return (await Api.client.get(`/v1/members/${jid}`)).data;
  }
  async deleteMember(jid: BareJid): Promise<void> {
    return await Api.client.delete(`/v1/members/${jid}`);
  }

  async setMemberRole(jid: BareJid, role: MemberRole): Promise<MemberRole> {
    return (await Api.client.put(`/v1/members/${jid}/role`, role)).data;
  }

  /** ENRICHING **/

  async enrichMembers(jids: BareJid[]): Promise<EnrichMembersResponse> {
    return (
      await Api.client.get("/v1/enrich-members", {
        params: { jids }
      })
    ).data;
  }
  enrichMembersStream(jids: BareJid[]): EventSource {
    const queryString = new URLSearchParams();
    jids.forEach(jid => queryString.append("jids", jid));
    return Api.eventSource(`/v1/enrich-members?${queryString}`);
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APITeamMembers();
