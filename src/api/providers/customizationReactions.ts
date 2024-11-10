/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

import { EmojiListEntry } from "@/store/tables/customizationEmojis";
import axios from "axios";

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const REACTIONS_URL = "/workspace/reactions";

class APICustomizationReactions {
  /**  REACTIONS  **/

  async getAllReactions(): Promise<void> {
    await axios.get(`${REACTIONS_URL}`);
  }

  async addReaction(
    reaction: EmojiListEntry //?? homogeineiser emojis vs reactions?
  ): Promise<void> {
    await axios.post(`${REACTIONS_URL}`, {
      reaction
    });
  }

  async getReactionById(reactionId: string): Promise<void> {
    await axios.get(`${REACTIONS_URL}/${reactionId}`);
  }

  async updateReactionById(
    reactionId: string,
    newReaction: EmojiListEntry
  ): Promise<void> {
    await axios.put(`${REACTIONS_URL}/${reactionId}`, {
      newReaction
    });
  }

  async deleteReactionById(reactionId: string): Promise<void> {
    await axios.delete(`${REACTIONS_URL}/${reactionId}`);
  }
}

export default new APICustomizationReactions();
