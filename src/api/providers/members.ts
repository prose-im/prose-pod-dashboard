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
    return (await Api.client.get("/members")).data;
  }

  async getMember(jid: BareJid): Promise<EnrichedMember | null> {
    return (await Api.client.get(`/members/${jid}`)).data;
  }
  async deleteMember(jid: BareJid): Promise<void> {
    return await Api.client.delete(`/members/${jid}`);
  }

  async setMemberRole(jid: BareJid, role: MemberRole): Promise<MemberRole> {
    return (await Api.client.put(`/members/${jid}/role`, role)).data;
  }

  /** ENRICHING **/

  async enrichMembers(jids: BareJid[]): Promise<EnrichMembersResponse> {
    return (
      await Api.client.get("enrich-members?", {
        params: { jids },
        // TODO: Check if this is really needed (probably not).
        paramsSerializer: params => {
          // Custom serializer to encode array parameters correctly
          return Object.keys(params)
            .map(key => {
              return params[key]
                .map((value: string) => `${key}=${encodeURIComponent(value)}`)
                .join("&");
            })
            .join("&");
        }
      })
    ).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APITeamMembers();
