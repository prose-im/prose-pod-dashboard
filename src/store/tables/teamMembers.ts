/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2023, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { JID, UserStatus } from "@prose-im/prose-sdk-js";
import { defineStore } from "pinia";

/**************************************************************************
 * TYPES
 * ************************************************************************* */

type ActiveMembersList = Array<ActiveMemberEntry>;

type InvitedMembersList = Array<InvitedMemberEntry>;
/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Members{
  activeMembers: ActiveMembersList,
  invitedMembers: InvitedMembersList
}

interface ActiveMemberEntry {
  id: string,
  name: string,
  email: string,
  picture: string,
  admin: boolean,
  status: string,
  os: string
};

interface InvitedMemberEntry {
  id: string,
  name: null,
  email: string,
  status: string
};

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
  persist: true,

  state: (): Members => {
    return {
      activeMembers: [        
        {
          id: "028de0b0-2d6d-441c-884d-bfc80ee3d041",
          name: "Baptiste Jamin",
          email: "baptiste@crisp.chat",
          picture: "https://gravatar.com/avatar/5603c33823b047149d9996a1be53afd4?size=400&default=retro&rating=g",
          admin: true,
          status: "Active",
          os: "mac OS"
        },
        {
          id: "9362d4f6-832c-4cca-83f1-8a3d1e82adc3",
          name:"Valerian Saliou",
          email:"valerian.saliou@crisp.chat",
          picture:"https://avatars.githubusercontent.com/u/1451907?v=4",
          admin: true,
          status:"Active",
          os:"mac OS"
        },
        {
          id: "786b36b3-d0ad-44ab-8aa9-59688b4f7562",
          name:"Eliott Vincent",
          email:"eliott@crisp.chat",
          picture:"https://eliottvincent.com/assets/img/profile-pic.webp",
          admin: false,
          status:"Inactive",
          os:"Last seen active 12 days ago"
        }
      ],

      invitedMembers: [
        {
          id: "fbd3e8ab-3f31-49da-8474-f4d28649b559",
          name: null,
          email: "valerian.saliou@crisp.chat",
          status: "Active",
        }
      ]
    };
  },

  getters: {
    getMemberList: function () {
      return (): Array<ActiveMemberEntry> => {
        return this.activeMembers
      };
    },

    getInviteList: function () {
      return (): Array<InvitedMemberEntry> => {
        return this.invitedMembers
      };
    },
  },

  actions: {
    async loadActiveMembers(reload = false): Promise<ActiveMembersList> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {
        // Initialize entries
        const entries: ActiveMembersList = [];

        // Load all public channels
        const publicChannels = await Broker.$channel.loadPublicChannels();

        publicChannels.forEach(publicChannel => {
          entries.push({
            type: ChannelType.Public,
            jid: publicChannel.jid.toString(),
            name: publicChannel.name
          });
        });

        this.$patch(state => {
          state.list = entries;
        });

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }

      return this.list;
    },

    async loadInvitedMembers(reload = false): Promise<InvitedMembersList> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {
        // Initialize entries
        const entries: InvitedMembersList = [];

        // Load all public channels
        const publicChannels = await Broker.$channel.loadPublicChannels();

        publicChannels.forEach(publicChannel => {
          entries.push({
            type: ChannelType.Public,
            jid: publicChannel.jid.toString(),
            name: publicChannel.name
          });
        });

        this.$patch(state => {
          state.list = entries;
        });

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }

      return this.list;
    },

    sendInvitation(newInviteEmail: string):void {
      const newInvite = {
        id: "3ea40db6-ee83-406b-b735-17ecb89f26bd",
        name: null,
        email: newInviteEmail,
        status: 'invited'
      };

      this.invitedMembers.push(newInvite);
    },

    cancelInvitation(inviteId: string):void {
      const indexToRemove = this.invitedMembers.findIndex((invitedMember) => invitedMember["id"] === inviteId);

      if(indexToRemove > -1) {
        this.invitedMembers.splice(indexToRemove, 1);
      } 
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $teamMembers;
