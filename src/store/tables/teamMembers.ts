/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import APITeamMembers, { Roles } from "@/api/providers/teamMembers";
import { defineStore } from "pinia";

/**************************************************************************
 * TYPES
 * ************************************************************************* */

type ActiveMembersList = Array<ActiveMemberEntry>;

type InvitedMembersList = Array<InvitedMemberEntry>;
/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Members {
  activeMembers: ActiveMembersList;
  invitedMembers: InvitedMembersList;
  memberEntries: object;
}

interface ActiveMemberEntry {
  nickname: string;
  jid: string;
  avatar: string;
  role: string;
  online: string;
  os: string;
}

interface InvitedMemberEntry {
  nickname: null;
  jid: string;
  status: string;
}

interface memberEntry {
  jid: string,
  role: string
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
      mockMembers: [
        {
          nickname: "Baptiste Jamin",
          jid: "baptiste@crisp.chat",
          avatar:
            "https://gravatar.com/avatar/5603c33823b047149d9996a1be53afd4?size=400&default=retro&rating=g",
          role: "ADMIN",
          online: "Active",
          os: "mac OS"
        },
        {
          nickname: "Valerian Saliou",
          jid: "valerian.saliou@crisp.chat",
          avatar: "https://avatars.githubusercontent.com/u/1451907?v=4",
          role: "ADMIN",
          online: "Active",
          os: "mac OS"
        },
        {
          nickname: "Eliott Vincent",
          jid: "eliott@crisp.chat",
          avatar: "https://eliottvincent.com/assets/img/profile-pic.webp",
          role: "MEMBER",
          online: "Inactive",
          os: "Last seen active 12 days ago"
        }
      ],

      invitedMembers: [],

      activeMembers:[],

      memberEntries:[]
    };
  },

  getters: {
    getAllMembers: function (page: number) {
      return (): memberEntry[] => {
        return this.memberEntries;
      };
    },

    getEnrichedMemberList: function () {
      return (): Array<ActiveMemberEntry> => {
        return this.activeMembers;
      };
    },

    getInviteList: function () {
      return (): Array<InvitedMemberEntry> => {
        return this.invitedMembers;
      };
    },

    getMockMemberList: function () {
      return (): Array<ActiveMemberEntry> => {
        return this.mockMembers;
      };
    },
  },

  actions: {
    async loadActiveMembers(reload = false): Promise<ActiveMembersList> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {

        // Load all public channels
        const entries: memberEntry[] = await APITeamMembers.getAllMembers();
        this.memberEntries = entries;
        console.log('entries', entries)

        const jids: string[] = []
        
        entries.forEach((member: memberEntry) => {
          // this.memberEntries[member.jid] = {
          //   role: member.role
          // }
          jids.push(member.jid);
        });

        console.log('entriesChanged', this.memberEntries)
        console.log('jids', jids);

        setTimeout(async() => {
          const allMembers = await APITeamMembers.enrichMembers(jids);
          this.activeMembers = allMembers;
  
          console.log('enriched members', allMembers)
        }, 4000 * (Math.random() + 0.5))

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }

      // return this.list;
    },

    getFilteredMembers (filter: number | string) {
      if(typeof filter === 'number'){
        const startIndex = (filter - 1) * 10;
        const endIndex = filter * 10 < this.memberEntries.length ? filter*10: this.memberEntries.length;
        console.log('page', filter)
        console.log('expected return ', this.memberEntries.slice(startIndex, endIndex));
        return this.memberEntries.slice(startIndex, endIndex);

      } else if(typeof filter === 'string') {
        const memberArray = Object.values(this.activeMembers)

        const response = memberArray.filter((member) => {
          const filteredMeber = Object.values(member).filter((e) =>{
            if(!e) {
              return
            } else {
              return e.includes(filter)
            }
          });

          return filteredMeber.length ? filteredMeber : false;
        });

        console.log('filtered', response)
        return response;
        
      }
    },

    async loadInvitedMembers(reload = false): Promise<InvitedMembersList> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {
        // Initialize entries
        this.invitedMembers = await APITeamMembers.getAllInvitations();

        console.log('invites', this.invitedMembers)

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }

      return this.list;
    },

    async sendInvitation(newUsername: string, newRole:string, newInviteEmail: string): Promise<void> {
      const newInvite = {
        username: newUsername,
        pre_assigned_role: newRole.toUpperCase(),
        channel: 'email',
        email_address: newInviteEmail,
      };

      return await APITeamMembers.sendInvitation(newInvite);
      // this.invitedMembers.push(newInvite);
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
