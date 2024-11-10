/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

import axios from "axios";

class APIGlobal {
  /**  CONFIG  **/

  async getServerConfig(): Promise<void> {
    await axios.get(`/server/config`); // global config??
  }

  async getDefaultServerConfig(): Promise<void> {
    await axios.put(`/server/config`);
  }
}

export default new APIGlobal();
