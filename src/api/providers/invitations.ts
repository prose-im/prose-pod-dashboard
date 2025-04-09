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
import {
  BareJid,
  EmailAddress,
  JidLocalPart,
  Password,
  Timestamp,
  Uuid
} from "./global";
import { MemberRole } from "./members";

/* *************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

export enum InvitationChannel {
  Email = "email"
}
export enum InvitationStatus {
  ToSend = "TO_SEND",
  Sent = "SENT",
  SendFailed = "SEND_FAILED"
}
export enum InvitationTokenType {
  Accept = "accept",
  Reject = "reject"
}

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface InvitationContactEmail {
  channel: InvitationChannel.Email;
  email_address: EmailAddress;
}

export interface Invitation {
  invitation_id: InvitationId;
  created_at: Timestamp;
  status: InvitationStatus;
  jid: BareJid;
  pre_assigned_role: MemberRole;
  contact: InvitationContact;
  accept_token_expires_at: Timestamp;
}
export interface InvitationBasicDetails {
  jid: BareJid;
  pre_assigned_role: MemberRole;
}

export interface AcceptInvitationRequest {
  nickname: string;
  password: Password;
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type InvitationId = number;
/** Note: This could become a union type in the future. */
export type InvitationContact = InvitationContactEmail;
export type InvitationAcceptToken = Uuid;
export type InvitationRejectToken = Uuid;
export type InvitationToken = InvitationAcceptToken | InvitationRejectToken;

type InviteMemberRequest = {
  username: JidLocalPart;
  pre_assigned_role?: MemberRole;
} & InvitationContact;

/* *************************************************************************
 * API
 * ************************************************************************* */

class APIInvitations {
  async canInviteMember(): Promise<
    boolean | "forbidden" | "missing-notifier-config"
  > {
    const res = await Api.client.head("/v1/invitations", {
      validateStatus: status => [204, 403, 412].includes(status)
    });
    switch (res.status) {
      case 403:
        return "forbidden";
      case 412:
        return "missing-notifier-config";
      case 204:
        return true;
      default:
        return false;
    }
  }
  async inviteMember(invitation: InviteMemberRequest): Promise<Invitation> {
    return (await Api.client.post("/v1/invitations", invitation)).data;
  }
  async getAllInvitations(): Promise<Invitation[]> {
    return (await Api.client.get("/v1/invitations")).data;
  }
  async getInvitation(invitationId: InvitationId): Promise<Invitation | null> {
    return (
      (await Api.client.get(`/v1/invitations/${invitationId}`)).data ?? null
    );
  }

  /** INVITATION ACTIONS **/

  async resendInvitation(invitationId: InvitationId): Promise<void> {
    await Api.client.post(`/v1/invitations/${invitationId}/resend`);
  }
  async cancelInvitation(invitationId: InvitationId): Promise<void> {
    await Api.client.delete(`/v1/invitations/${invitationId}`);
  }

  /** INVITATION LINK ACTIONS **/

  async getInvitationDetails(
    token: InvitationToken,
    token_type: InvitationTokenType
  ): Promise<InvitationBasicDetails> {
    return (
      await Api.client.put(
        `/v1/invitation-tokens/${token}/details?token_type=${token_type}`
      )
    ).data;
  }
  async acceptInvitation(
    acceptToken: InvitationAcceptToken,
    request: AcceptInvitationRequest
  ): Promise<void> {
    await Api.client.put(
      `/v1/invitation-tokens/${acceptToken}/accept`,
      request
    );
  }
  async rejectInvitation(rejectToken: InvitationRejectToken): Promise<void> {
    await Api.client.put(`/v1/invitation-tokens/${rejectToken}/reject`);
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIInvitations();
