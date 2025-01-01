/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import mitt from "mitt";
import { defineStore } from "pinia";

// PROJECT: STORES
import APICustomizationReactions from "@/api/providers/customizationReactions";

/**************************************************************************
 * TYPES
 * ************************************************************************* */

type EmojiList = Array<EmojiListEntry>;

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface EmojiListEntry {
  id: string;
  imageUrl: string;
  shortcut: string;
  date: string;
  contributor: string;
  contributorAvatar: string;
}

interface Emojis {
  emojisList: EmojiList;
}

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  loaded: false
};

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $customizationEmojis = defineStore("room", {
  state: (): Emojis => {
    return {
      emojisList: [
        {
          id: "29684b21-e799-4aa9-b475-d307493a7719",
          imageUrl:
            "https://i.pinimg.com/736x/24/0d/22/240d22bf3aeda750fca5c00d2dfbf72a.jpg",
          shortcut: ":excellent:",
          date: "11 November 2012",
          contributor: "Valerian Saliou",
          contributorAvatar:
            "https://avatars.githubusercontent.com/u/1451907?v=4"
        },
        {
          id: "ec30d684-5d54-42fb-834e-cc0a192f021f",
          imageUrl:
            "https://emojis.slackmojis.com/emojis/images/1693897448/68276/1000046743.jpg?1693897448",
          shortcut: ":excellent:",
          date: "11 November 2012",
          contributor: "Karen Paloma Sanchez Rojas",
          contributorAvatar:
            "https://avatars.githubusercontent.com/u/1451907?v=4"
        },
        {
          id: "2b74c4f2-7010-411d-bc42-4ca88b2495d2",
          imageUrl:
            "https://emojis.slackmojis.com/emojis/images/1697828273/71257/1000057723q.gif?1697828273",
          shortcut: ":excellent:",
          date: "11 November 2012",
          contributor: "Valerian Saliou",
          contributorAvatar:
            "https://avatars.githubusercontent.com/u/1451907?v=4"
        }
      ]
    };
  },

  getters: {
    getEmojiList: function () {
      return (): EmojiList => {
        return this.emojisList;
      };
    }
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    async loadAllReactions(reload = false): Promise<void> {
      // Load room list? (or reload)
      if (LOCAL_STATES.loaded !== true || reload === true) {
        // Initialize entries
        const allReactions = await APICustomizationReactions.getAllReactions();

        console.log("reactions", allReactions);

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }
    },

    getFilteredEmojis(filter: number | string) {
      if (typeof filter === "number") {
        /** Page filter */
        const startIndex = (filter - 1) * 10;
        const endIndex =
          filter * 10 < this.emojisList.length
            ? filter * 10
            : this.emojisList.length;

        return this.emojisList.slice(startIndex, endIndex);
      } else if (typeof filter === "string") {
        /** Searching bar filter */
        //const memberArray = Object.values(this.enrichedMembers);

        // Loop through all members
        const response = this.emojisList.filter(member => {
          // Loop through all the values of a member
          const filteredMember = Object.values(member).filter(e => {
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

    addReaction(reaction: EmojiListEntry): void {
      console.log("hey hey");
      this.emojisList.push(reaction);
      // customizationReactions.addReaction(reaction);
      // loadReactions(true):
    },

    deleteReaction(reactionId: string): void {
      APICustomizationReactions.deleteReactionById(reactionId);
    },

    updateReaction(reactionId: string, newReaction: EmojiListEntry) {
      APICustomizationReactions.updateReactionById(reactionId, newReaction);
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */
export type { EmojiListEntry };
export default $customizationEmojis;
