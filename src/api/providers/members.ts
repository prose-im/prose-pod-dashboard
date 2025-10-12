/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { EventSource } from "extended-eventsource";

// PROJECT: API
import Api from "@/api";
import { BareJid, Mime } from "@/api/providers/global";

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

interface MembersByPageResponse {
  data: Member[];
  itemTotal: number;
}

export interface Member {
  jid: BareJid;
  role: MemberRole;
}

export interface Avatar {
  base64: string;
  type: Mime;
}

export interface EnrichMembersResponse {
  [key: BareJid]: EnrichedMember;
}

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

export const PAGE_SIZE = 40;

export const ROLES_DISPLAY_STRINGS = {
  [MemberRole.Member]: "Member",
  [MemberRole.Admin]: "Admin"
};

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type EnrichedMember = Member & {
  online: boolean;
  nickname: string;
  avatar: Avatar | null;
};

export type MemberEmail = string;
export type MemberNickname = string;

export type searchedMembers = Member[];

/* *************************************************************************
 * API
 * ************************************************************************* */

class APITeamMembers {
  /** LIST **/

  async getAllMembers(): Promise<Member[]> {
    return (await Api.client.get("/v1/members")).data;
  }

  async getMembersByPage(page: number): Promise<MembersByPageResponse> {
    const { data, headers } = await Api.client.get("/v1/members", {
      params: {
        page_number: page,
        page_size: PAGE_SIZE
      }
    });

    const itemTotal = headers["pagination-item-count"];

    return { data, itemTotal };
  }

  async getSearchedMembers(searchTerm: string): Promise<searchedMembers> {
    const { data } = await Api.client.get("/v1/members", {
      params: {
        q: searchTerm
      }
    });

    return data;
  }

  /** MEMBER **/

  async getMember(jid: BareJid): Promise<EnrichedMember | null> {
    return (await Api.client.get(`/v1/members/${jid}`)).data;
  }

  async deleteMember(jid: BareJid): Promise<void> {
    return await Api.client.delete(`/v1/members/${jid}`);
  }

  async setMemberRole(jid: BareJid, role: MemberRole): Promise<MemberRole> {
    return (await Api.client.put(`/v1/members/${jid}/role`, role)).data;
  }

  async setMemberNickname(
    jid: BareJid,
    nickname: MemberNickname
  ): Promise<MemberNickname> {
    return (await Api.client.put(`/v1/members/${jid}/nickname`, nickname)).data;
  }

  async getMemberEmailAddress(jid: BareJid): Promise<MemberEmail> {
    return (await Api.client.get(`/v1/members/${jid}/email-address`)).data;
  }

  async setMemberEmailAddress(
    jid: BareJid,
    email: MemberEmail
  ): Promise<MemberEmail> {
    return (await Api.client.put(`/v1/members/${jid}/email-address`, email))
      .data;
  }

  async requestMemberPasswordRecover(jid: BareJid): Promise<void> {
    return await Api.client.delete(`/v1/members/${jid}/password`);
  }

  /** ENRICHMENT **/

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
