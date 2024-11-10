/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// PROJECT: API
import Api from "@/api";

// PROJECT: STORE
import { EmojiListEntry } from "@/store/tables/customizationEmojis";

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface AllReactionsResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

interface ReactionByIdResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const REACTIONS_URL = "/workspace/reactions";

/**************************************************************************
 * API
 * ************************************************************************* */

class APICustomizationReactions {
  /**  REACTIONS  **/

  async getAllReactions(): Promise<AllReactionsResponse> {
    return (await Api.client.get(`${REACTIONS_URL}`)).data;
  }

  async addReaction(
    reaction: EmojiListEntry //?? homogeineiser emojis vs reactions?
  ): Promise<void> {
    await Api.client.post(`${REACTIONS_URL}`, {
      reaction
    });
  }

  async getReactionById(reactionId: string): Promise<ReactionByIdResponse> {
    return (await Api.client.get(`${REACTIONS_URL}/${reactionId}`)).data;
  }

  async updateReactionById(
    reactionId: string,
    newReaction: EmojiListEntry
  ): Promise<void> {
    await Api.client.put(`${REACTIONS_URL}/${reactionId}`, {
      newReaction
    });
  }

  async deleteReactionById(reactionId: string): Promise<void> {
    await Api.client.delete(`${REACTIONS_URL}/${reactionId}`);
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APICustomizationReactions();
