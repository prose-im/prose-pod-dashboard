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

interface Invite {
  channel: 'email';
  email_address: string;
  pre_assigned_role: Roles;
  username: string;
}

interface AllInvitationsResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

interface AllMembersResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

interface MemberByIdResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

/**************************************************************************
 * API
 * ************************************************************************* */

class APITeamMembers {
  /**  INVITATIONS  **/

  async getAllInvitations(): Promise<AllInvitationsResponse> {
    return (await Api.client.get("/invitations")).data;
  }

  async sendInvitation(invite: Invite): Promise<void> {
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

  async enrichMembers(): Promise<AllMembersResponse> {
    await Api.client.get(`enrich-members?jids=valerian%40prose.org.local`)
      // %40prose.org.local&jids=remi%40prose.org.local
      // params: {
      //   jids: jids
      // },
      // paramsSerializer: params => {
      //   // Custom serializer to encode array parameters correctly
      //   return Object.keys(params).map(key => {
      //     return params[key].map(value => `${key}=${encodeURIComponent(value)}`).join('&');
      //   }).join('&');
      // }
    
    .then(response => {
      return response.data; // Handle the successful response
    })
    .catch(error => {
      console.error('Error occurred:', error); // Handle any errors
    })
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
