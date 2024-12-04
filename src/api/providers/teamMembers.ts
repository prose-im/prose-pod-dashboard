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
 * TYPES
 * ************************************************************************* */
export type inviteChannel = 'email';

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */
export enum Roles {
  Member = 'Member',
  Admin = 'Admin',
}

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */
interface Invitation {
  username: string,
  pre_assigned_role: [Roles],
  channel: string,
  email_address: string
}

interface InvitedMemberEntry {
  invitation_id: number,
  created_at: string,
  status: string,
  jid: string,
  pre_assigned_role: [Roles],
  contact: { 
    channel: string,
    email_address: string
  },
  accept_token_expires_at: string
}

interface MemberEntry {
  jid: string,
  role: string
}

interface MemberByIdResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

interface EnrichedMember {
  jid: string,
  role: string,
  online: boolean,
  nickname: string,
  avatar: string
}

export interface EnrichMembersResponse {
  [key: string]: EnrichedMember; // The key is the `jid`, and the value conforms to the `User` interface.
}

/**************************************************************************
 * TYPES
 * ************************************************************************* */
export type AllMembersResponse = MemberEntry[];

export type AllInvitationsResponse = InvitedMemberEntry[];

/**************************************************************************
 * API
 * ************************************************************************* */

class APITeamMembers {
  /**  INVITATIONS  **/

  async getAllInvitations(): Promise<AllInvitationsResponse> {
    return (await Api.client.get("/invitations")).data;
  }

  async sendInvitation(invite: Invitation): Promise<void> {
    await Api.client.post("/invitations",
      invite
    );
  }

  async resendInvitation(invitationId: string): Promise<void> {
    await Api.client.post(`/invitations/${invitationId}/resend`);
  }

  async cancelInvitation(invitationId: string): Promise<void> {
    await Api.client.delete(`/invitations/${invitationId}`);
  }

  /**  MEMBERS  **/

  async getAllMembers(): Promise<AllMembersResponse> {
    return (await Api.client.get("/members")).data;
  }

  async enrichMembers(jids: string[]): Promise<EnrichMembersResponse> {
    return (await Api.client.get("enrich-members?",{
      params: {
        jids: jids
      },
      paramsSerializer: params => {
        // Custom serializer to encode array parameters correctly
        return Object.keys(params).map(key => {
          return params[key].map((value: string )=> `${key}=${encodeURIComponent(value)}`).join('&');
        }).join('&');
      }
    })).data
  }

  async getMemberById(memberId: number): Promise<MemberByIdResponse> {
    return (await Api.client.get(`/members/${memberId}`)).data;
  }

  async updateMemberMfa(memberId: number, mfa: boolean): Promise<void> {
    await Api.client.put(`/members/${memberId}/mfa`, {
      mfa
    });
  }

  async updateMemberRole(memberId: number, role: string): Promise<void> {
    await Api.client.put(`/members/${memberId}/role`, {
      role
    });
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APITeamMembers();