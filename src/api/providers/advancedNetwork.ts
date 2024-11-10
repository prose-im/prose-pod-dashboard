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

const NETWORK_CHECK_URL = "/network/checks"; //// EFFACER ??

class APIAdvancedNetwork {
  /**  SERVER  **/

  /**  NETWORK  **/
  async getDnsRecords(): Promise<void> {
    await axios.get(`/network/dns/records`);
  }

  async getAllNetworkChecks(): Promise<void> {
    await axios.get(`/network/checks`);
  }
}

export default new APIAdvancedNetwork();
