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

export interface ServerConfig {
  message_archive_enabled: boolean;
  message_archive_retention: string;
  file_upload_allowed: boolean;
  file_storage_encryption_scheme: string;
  file_storage_retention: string;
}

export interface ServerConfigResponse extends ServerConfig {
  domain: string;

  // Security
  mfa_required: boolean;
  tls_profile: string;
  federation_enabled: boolean;
  federation_whitelist_enabled: boolean;
  federation_friendly_servers: string[];
  settings_backup_interval: string;
  user_data_backup_interval: string;
}

/**************************************************************************
 * API
 * ************************************************************************* */

class APIGlobal {
  /**  CONFIG  **/

  async getWholeServerConfig(): Promise<ServerConfigResponse> {
    return (await Api.client.get(`/server/config`)).data;
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIGlobal();
