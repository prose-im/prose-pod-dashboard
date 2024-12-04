/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import APITeamMembers, { AllInvitationsResponse, AllMembersResponse, EnrichMembersResponse, Roles } from "@/api/providers/teamMembers";
import { defineStore } from "pinia"; 

/**************************************************************************
 * TYPES
 * ************************************************************************* */


/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Members {
  enrichedMembers: EnrichMembersResponse;
  invitedMembers: AllInvitationsResponse;
  nonEnrichedMembers: AllMembersResponse;
}

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  loaded: false
};

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $teamMembers = defineStore("teamMembers", {
  state: (): Members => {
    return {
      invitedMembers: [],

      enrichedMembers:{},

      nonEnrichedMembers:[]
    };
  },

  getters: {
    getAllMembers: function () {
      return () => {
        return this.nonEnrichedMembers;
      };
    },

    getEnrichedMemberList: function () {
      return () => {
        return this.enrichedMembers;
      };
    },

    getInviteList: function () {
      return () => {
        return this.invitedMembers;
      };
    },
  },

  actions: {
    // <-- ACTIVE MEMBERS --> 

    async loadActiveMembers(reload = false): Promise<void> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {

        // Load all Members (non enriched)
        const entries = await APITeamMembers.getAllMembers();
        this.nonEnrichedMembers = entries;
        console.log('non enriched entries', entries)

        // Create a jid Array to ask enrichment
        const jids: string[] = []
        
        entries.forEach((member) => {
          jids.push(member.jid);
        });

        console.log('jids', jids);

        // Get enriched Members
        setTimeout(async() => {
          const allMembers = await APITeamMembers.enrichMembers(jids);
          this.enrichedMembers = allMembers;
  
          console.log('enriched members', allMembers)
        }, 14000 * (Math.random() + 0.5))

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }
    },

    getFilteredMembers (filter: number | string) {
      if(typeof filter === 'number'){
  
        /** Page filter */
        const startIndex = (filter - 1) * 10;
        const endIndex = filter * 10 < this.nonEnrichedMembers.length ? filter * 10: this.nonEnrichedMembers.length;

        return this.nonEnrichedMembers.slice(startIndex, endIndex);

      } else if(typeof filter === 'string') {

        /** Searching bar filter */
        const memberArray = Object.values(this.enrichedMembers)

        // Loop through all members
        const response = memberArray.filter((member) => {

          // Loop through all the values of a member
          const filteredMember = Object.values(member).filter((e) =>{
            if(!e) {
              return
            } else {
              return e.includes(filter)
            }
          });

          return filteredMember.length ? filteredMember : false;
        });

        console.log('filtered', response)
        return response;
      }
    },

    async updateRoleByMemberId(jid: string, newRole: [Roles]) {
      return true;   ///// TODO
    },

    async deleteMemberById(jid: string) {
      return true;   ///// TODO
    },

    // <-- INVITES --> 

    async loadInvitedMembers(reload = false): Promise<void> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {
        // Initialize entries
        this.invitedMembers = await APITeamMembers.getAllInvitations();

        console.log('invites', this.invitedMembers)

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }
    },

    async sendInvitation(newUsername: string, newRole:string, newInviteEmail: string): Promise<void> {
      const newInvite = {
        username: newUsername,
        pre_assigned_role: newRole.toUpperCase(),
        channel: 'email',
        email_address: newInviteEmail,
      };

      return await APITeamMembers.sendInvitation(newInvite);
    },

    async cancelInvitation(inviteId: string): Promise<void> {
      return await APITeamMembers.cancelInvitation(inviteId);
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $teamMembers;
