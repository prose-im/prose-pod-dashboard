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

/**************************************************************************
 * API
 * ************************************************************************* */

class APIConnect {
  /**  CONFIG  **/

  async initializeAccount(): Promise<void> {
    await Api.client.put(`http://127.0.0.1:8000/v1/init/first-account`, {
      username: "remi.bardon",
      password: "HsV>dFx^P[m!jM+4W9wf5k:_t{8pSQ*?",
      nickname: "Rémi B."
    });
  }

  async setPodAddess(): Promise<void> {
    await Api.client.put(`http://127.0.0.1:8000/v1/pod/config/address`, {
      hostname: "crisp.chat"
    });
  }

  async initializeServer(): Promise<void> {
    await Api.client.put(`http://127.0.0.1:8000/v1/server/config`, {
      domain: "crisp.chat"
    });
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIConnect();
