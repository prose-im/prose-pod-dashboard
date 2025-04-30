/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";

// PROJECT: API
import APITeamMembers, {
  Member,
  MemberRole,
  EnrichedMember
} from "@/api/providers/members";
import APIInvitations, {
  InvitationChannel,
  Invitation,
  InvitationId
} from "@/api/providers/invitations";
import { BareJid, EmailAddress, JidLocalPart } from "@/api/providers/global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Members {
  invitedMembers: Invitation[];
  /** NOTE: `Map`s keep insertion order. */
  members: Map<BareJid, Member | EnrichedMember>;
  memberTotal: number | null;
}

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  loaded: false
};

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $teamMembers = defineStore("teamMembers", {
  state: (): Members => {
    return {
      invitedMembers: [],
      members: new Map(),
      memberTotal: null as number | null
    };
  },

  getters: {
    getAllMembers: function () {
      return () => {
        return Array.from(this.members.values());
      };
    },

    getMemberTotal: function () {
      return () => {
        return this.memberTotal;
      };
    }
  },

  actions: {
    // <-- ACTIVE MEMBERS -->

    async loadActiveMembersByPage(
      reload = false,
      page = 1,
      searchTerm = ""
    ): Promise<void> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {
        // Load all members (non enriched)
        if (!searchTerm) {
          const response = await APITeamMembers.getMembersByPage(page);

          this.memberTotal = response.itemTotal;

          this.members = new Map(
            response.data.map(member => [member.jid, member])
          );
        } else {
          const response = await APITeamMembers.getSearchedMembers(searchTerm);
          this.members = new Map(response.map(member => [member.jid, member]));
        }

        // Create a JID array to ask enrichment
        const jidsToEnrich: BareJid[] = Array.from(this.members.keys());

        // Enrich members
        await new Promise<void>(resolve => {
          setTimeout(resolve, 5000);

          const eventSource = APITeamMembers.enrichMembersStream(jidsToEnrich);

          eventSource.addEventListener("enriched-member", event => {
            this.members.set(event.lastEventId, JSON.parse(event.data));
          });

          eventSource.addEventListener("end", () => {
            eventSource.close();

            resolve();
          });

          eventSource.onerror = error => {
            console.error("Error when enriching members:", error);
          };
        });

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }
    },

    loadMemberById(jid: BareJid) {
      return APITeamMembers.getMember(jid);
    },

    updateRoleLocally(jid: BareJid, newValue: MemberRole) {
      const member = this.members.get(jid);

      if (member) {
        member.role = newValue;
      }
    },

    async updateRoleByMemberId(jid: BareJid, newRole: MemberRole) {
      return await APITeamMembers.setMemberRole(jid, newRole);
    },

    deleteMemberLocally(jid: BareJid) {
      this.members.delete(jid);
    },

    async deleteMemberById(jid: BareJid) {
      return await APITeamMembers.deleteMember(jid);
    },

    // <-- INVITES -->

    async loadInvitedMembers(reload = false): Promise<void> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {
        // Initialize entries
        this.invitedMembers = await APIInvitations.getAllInvitations();

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }
    },

    getFilteredInviteList(filter?: string) {
      // Searching bar filter
      if (!filter) {
        return this.invitedMembers;
      }

      // Loop through all invited members
      const response = this.invitedMembers.filter(member => {
        return member.contact.email_address.includes(filter);
      });

      return response;
    },

    async sendInvitation(
      username: JidLocalPart,
      preAssignedRole: MemberRole,
      emailAddress: EmailAddress
    ): Promise<Invitation> {
      const invitation = {
        username,
        pre_assigned_role: preAssignedRole,
        channel: InvitationChannel.Email,
        email_address: emailAddress
      };

      return await APIInvitations.inviteMember(invitation);
    },

    async cancelInvitation(invitationId: InvitationId): Promise<void> {
      await APIInvitations.cancelInvitation(invitationId);

      this.$patch(() => {
        this.invitedMembers = this.invitedMembers.filter(
          invitation => invitation.invitation_id !== Number(invitationId)
        );
      });
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $teamMembers;
