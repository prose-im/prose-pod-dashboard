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
 * INTERFACES
 * ************************************************************************* */

interface ServerConfigResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

interface DefaultServerConfigResponse {
  /* TODO: fill me! */
  _keyToReplace: string;
}

/**************************************************************************
 * API
 * ************************************************************************* */

class APIGlobal {
  /**  CONFIG  **/

  async getWholeServerConfig(): Promise<ServerConfigResponse> {
    return (await Api.client.get(`/server/config`)).data; 
  }

  async getDefaultServerConfig(): Promise<DefaultServerConfigResponse> {
    return (await Api.client.put(`/server/config`)).data;
  }
} 

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIGlobal();
