import { EmojiListEntry } from '@/store/tables/customizationEmojis';
import axios from 'axios';

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const REACTIONS_URL = '/workspace/reactions';

class CustomizationReactions {
  /**  REACTIONS  **/ 

  async getAllReactions(): Promise<void> {
    await axios.get(`${REACTIONS_URL}`);
  }

  async addReaction(
    reaction : EmojiListEntry  //?? homogeineiser emojis vs reactions?
  ): Promise<void> {
    await axios.post(`${REACTIONS_URL}`, {
      reaction
    });
  }

  async getReactionById(
    reactionId: number
  ): Promise<void> {
    await axios.get(`${REACTIONS_URL}/${reactionId}`);
  }  

  async updateReactionById(
    reactionId: number
  ): Promise<void> {
    await axios.put(`${REACTIONS_URL}/${reactionId}`);
  }  

  async deleteReactionById(
    reactionId: number
  ): Promise<void> {
    await axios.delete(`${REACTIONS_URL}/${reactionId}`);
  }  
}

export default new CustomizationReactions();
