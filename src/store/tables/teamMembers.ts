/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
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
  MemberNickname,
  MemberEmail,
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
    // --> ACTIVE MEMBERS <--

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

        // Enrich members only if there's any members to enrich
        if (jidsToEnrich.length > 0) {
          // Enrich members
          await new Promise<void>(resolve => {
            const eventSource =
              APITeamMembers.enrichMembersStream(jidsToEnrich);

            eventSource.addEventListener("enriched-member", event => {
              const enrichData = JSON.parse(event.data);

              // Mark as enriched (this stops loading indicator)
              enrichData.enriched = true;

              // No nickname? Extract from JID
              // Notice: this happens when the user has not yet defined a \
              //   first name or last name.
              if (!enrichData.nickname) {
                enrichData.nickname = enrichData.jid.split("@")[0] || null;
              }

              this.members.set(event.lastEventId, enrichData);
            });

            // Treat end and error alike (resolve)
            ["end", "error"].forEach(eventName => {
              eventSource.addEventListener(eventName, () => {
                eventSource.close();

                resolve();
              });
            });
          });
        }

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }
    },

    loadMemberById(jid: BareJid) {
      return APITeamMembers.getMember(jid);
    },

    acquireMemberEmailById(jid: BareJid) {
      return APITeamMembers.getMemberEmailAddress(jid);
    },

    updateRoleLocally(jid: BareJid, newValue: MemberRole) {
      const member = this.members.get(jid);

      if (member) {
        member.role = newValue;
      }
    },

    updateNicknameLocally(jid: BareJid, newValue: MemberNickname) {
      const member = this.members.get(jid) as EnrichedMember | null;

      if (member) {
        member.nickname = newValue;
      }
    },

    async updateRoleByMemberId(jid: BareJid, newRole: MemberRole) {
      return await APITeamMembers.setMemberRole(jid, newRole);
    },

    async updateNicknameByMemberId(jid: BareJid, newNickname: MemberNickname) {
      return await APITeamMembers.setMemberNickname(jid, newNickname);
    },

    async updateEmailByMemberId(jid: BareJid, newEmail: MemberEmail) {
      return await APITeamMembers.setMemberEmailAddress(jid, newEmail);
    },

    deleteMemberLocally(jid: BareJid) {
      this.members.delete(jid);
    },

    async deleteMemberById(jid: BareJid) {
      return await APITeamMembers.deleteMember(jid);
    },

    // --> INVITES <--

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

    async resendInvitation(invitationId: InvitationId): Promise<void> {
      await APIInvitations.resendInvitation(invitationId);
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
