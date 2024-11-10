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
 * INTERFACES
 * ************************************************************************* */

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
    // Attempt connecting (this might fail, eg. wrong credentials)
    return (await Api.client.get("/invitations")).data;
  }

  async sendInvitation(email: string): Promise<void> {
    // Attempt connecting (this might fail, eg. wrong credentials)
    await Api.client.post("/invitations", {
      email
    });
  }

  async resendInvitation(invitationId: string): Promise<void> {
    // Attempt connecting (this might fail, eg. wrong credentials)
    await Api.client.post(`/invitations/${invitationId}/resend`);
  }

  async cancelInvitation(invitationId: string): Promise<void> {
    await Api.client.delete(`/invitations/${invitationId}`);
  }

  /**  MEMBERS  **/

  async getAllMembers(): Promise<AllMembersResponse> {
    return (await Api.client.get("/members")).data;
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
