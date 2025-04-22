/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
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
import { defineStore } from "pinia";
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
        // Load all Members (non enriched)

        if (!searchTerm) {
          const response = await APITeamMembers.getMembersByPage(page);
          console.log(response, "API res", page);

          this.memberTotal = response.itemTotal;

          this.members = new Map(
            response.data.map(member => [member.jid, member])
          );
          console.log("Non-enriched members:", this.members);
        } else {
          const response = await APITeamMembers.getSearchedMembers(searchTerm);
          this.members = new Map(response.map(member => [member.jid, member]));
        }

        // Create a JID Array to ask enrichment
        const jidsToEnrich: BareJid[] = Array.from(this.members.keys());
        console.log("Enriching members:", jidsToEnrich);

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

    getFilteredMembers(filter: number | string): (Member | EnrichedMember)[] {
      const members = Array.from(this.members.values());
      if (typeof filter === "number") {
        /** Page filter */
        const startIndex = (filter - 1) * 10;
        const endIndex =
          filter * 10 < this.members.size ? filter * 10 : this.members.size;

        return members.slice(startIndex, endIndex);
      } else {
        /** Search bar filter */
        return members.filter(member => {
          // Get an array with only the values to be searched
          const memberValues = Object.values(member)
            // Keep only string values since matching booleans or `null` wouldn’t make sense
            .filter((item): item is string => typeof item === "string");

          // Loop through all the values of a member
          const filteredMembers = memberValues.filter(value => {
            return value.includes(filter);
          });

          return filteredMembers.length ? filteredMembers : false;
        });
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

        console.log("invites", this.invitedMembers);

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }
    },

    getFilteredInviteList(filter?: string) {
      /** Searching bar filter */
      console.log("invites filtered", this.invitedMembers);

      if (!filter) {
        return this.invitedMembers;
      } else {
        // Loop through all invited members
        const response = this.invitedMembers.filter(member => {
          return member.contact.email_address.includes(filter);
        });

        return response;
      }
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
