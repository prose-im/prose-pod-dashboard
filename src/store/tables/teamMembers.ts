/*
 * This file is part of prose-app-web
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
  name: string,
  email: string,
  avatarUrl: string,
  admin: boolean,
  status: string,
  os: string
};

interface InvitedMemberEntry {
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
      activeMembers: [],

      invitedMembers: []
    };
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

    getActiveMembers(): ActiveMembersList {
      return this.activeMembers;
    },

    getInvitedMembers(): ActiveMembersList {
      return this.activeMembers;
    },

    setInvitedMembers(newInviteEmail: string):void {
      const newInvite = {
        email: newInviteEmail,
        status: 'invited'
      }

      const newInvitedMembersList = {...this.invitedMembers, newInvite}
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $teamMembers;
