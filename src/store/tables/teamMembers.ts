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
  EnrichMembersResponse,
  MemberRole
} from "@/api/providers/members";
import APIInvitations, {
  InvitationChannel,
  Invitation,
  InvitationId
} from "@/api/providers/invitations";
import { defineStore } from "pinia";
import { EmailAddress, JidLocalPart } from "@/api/providers/global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Members {
  enrichedMembers: EnrichMembersResponse;
  invitedMembers: Invitation[];
  notEnrichedMembers: Member[];
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

      enrichedMembers: {},

      notEnrichedMembers: []
    };
  },

  getters: {
    getAllMembers: function () {
      return () => {
        return this.notEnrichedMembers;
      };
    },

    getEnrichedMemberList: function () {
      return () => {
        return this.enrichedMembers;
      };
    }
  },

  actions: {
    // <-- ACTIVE MEMBERS -->
    async loadActiveMembers(reload = false): Promise<void> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {
        // Load all Members (non enriched)
        const entries = await APITeamMembers.getAllMembers();
        this.notEnrichedMembers = entries;
        console.log("non enriched entries", entries);

        // Create a jid Array to ask enrichment
        const jids: string[] = [];

        entries.forEach(member => {
          jids.push(member.jid);
        });

        console.log("jids", jids);

        // Get enriched Members
        setTimeout(async () => {
          const enrichedMembers = await APITeamMembers.enrichMembers(jids);
          this.enrichedMembers = enrichedMembers;

          console.log("enriched members", this.enrichedMembers);
        }, 5000 * (Math.random() + 0.5));

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }
    },

    getFilteredMembers(filter: number | string) {
      if (typeof filter === "number") {
        /** Page filter */
        const startIndex = (filter - 1) * 10;
        const endIndex =
          filter * 10 < this.notEnrichedMembers.length
            ? filter * 10
            : this.notEnrichedMembers.length;

        return this.notEnrichedMembers.slice(startIndex, endIndex);
      } else if (typeof filter === "string") {
        /** Searching bar filter */
        const enrichedMemberArray = Object.values(this.enrichedMembers);

        // Loop through all members
        const response = enrichedMemberArray.filter(member => {
          // Get an array with only the values to be searched
          const memberElements = Object.values(member);
          memberElements.pop();

          // Loop through all the values of a member
          const filteredMember = memberElements.filter(e => {
            if (!e) {
              return;
            } else {
              return e.includes(filter);
            }
          });

          return filteredMember.length ? filteredMember : false;
        });

        return response;
      }
    },

    loadMemberById(jid: string | null) {
      if (jid) {
        return APITeamMembers.getMember(jid);
      }
    },

    updateRoleLocally(jid: string, newValue: MemberRole) {
      for (const member of this.notEnrichedMembers) {
        if (member.jid === jid) {
          member.role = newValue;
          break;
        }
      }
    },

    async updateRoleByMemberId(jid: string, newRole: MemberRole) {
      return await APITeamMembers.setMemberRole(jid, newRole);
    },

    deleteMemberLocally(jid: string) {
      return (this.notEnrichedMembers = this.notEnrichedMembers.filter(
        member => {
          return member.jid !== jid;
        }
      ));
    },

    async deleteMemberById(jid: string) {
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
