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
}

interface ActiveMemberEntry {
  id: string;
  name: string;
  email: string;
  picture: string;
  admin: boolean;
  status: string;
  os: string;
}

interface InvitedMemberEntry {
  id: string;
  name: null;
  email: string;
  status: string;
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
      activeMembers: [
        {
          id: "028de0b0-2d6d-441c-884d-bfc80ee3d041",
          name: "Baptiste Jamin",
          email: "baptiste@crisp.chat",
          picture:
            "https://gravatar.com/avatar/5603c33823b047149d9996a1be53afd4?size=400&default=retro&rating=g",
          admin: true,
          status: "Active",
          os: "mac OS"
        },
        {
          id: "9362d4f6-832c-4cca-83f1-8a3d1e82adc3",
          name: "Valerian Saliou",
          email: "valerian.saliou@crisp.chat",
          picture: "https://avatars.githubusercontent.com/u/1451907?v=4",
          admin: true,
          status: "Active",
          os: "mac OS"
        },
        {
          id: "786b36b3-d0ad-44ab-8aa9-59688b4f7562",
          name: "Eliott Vincent",
          email: "eliott@crisp.chat",
          picture: "https://eliottvincent.com/assets/img/profile-pic.webp",
          admin: false,
          status: "Inactive",
          os: "Last seen active 12 days ago"
        }
      ],

      invitedMembers: [
        {
          id: "fbd3e8ab-3f31-49da-8474-f4d28649b559",
          name: null,
          email: "valerian.saliou@crisp.chat",
          status: "Active"
        }
      ]
    };
  },

  getters: {
    getMemberList: function () {
      return (): Array<ActiveMemberEntry> => {
        return this.activeMembers;
      };
    },

    getInviteList: function () {
      return (): Array<InvitedMemberEntry> => {
        return this.invitedMembers;
      };
    }
  },

  actions: {
    async loadActiveMembers(reload = false): Promise<ActiveMembersList> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {

        // Load all public channels
        const entries = await APITeamMembers.getAllMembers();
        console.log('entries', entries)

        const jids = ['valerian@prose.org.local', 'remi@prose.org.local']
        
        // entries.forEach((member: object, index: number) => {
        //   if(index === 0){
        //     enrichUrl += 'jids=' + member.jid;
        //   } else {
        //     enrichUrl += '&jids=' + member.jid;
        //   }
        // })
        console.log('url', jids);
        const allMembers = await APITeamMembers.enrichMembers();

        console.log('all members', allMembers)

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }

      // return this.list;
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
