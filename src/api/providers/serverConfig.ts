/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// PROJECT: API
import Api from "@/api";
import { DurationDateLike, Hostname } from "./global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface ServerConfig {
  domain: Hostname;
  message_archive_enabled: boolean;
  message_archive_retention: MessageArchiveRetention;
  file_upload_allowed: boolean;
  file_storage_encryption_scheme: string;
  file_storage_retention: FileStorageRetention;
  mfa_required: boolean;
  tls_profile: TlsProfile;
  federation_enabled: boolean;
  federation_whitelist_enabled: boolean;
  federation_friendly_servers: Hostname[];
  settings_backup_interval: DurationDateLike;
  user_data_backup_interval: DurationDateLike;
  push_notification_with_body: boolean;
  push_notification_with_sender: boolean;
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type MessageArchiveRetention = DurationDateLike | "infinite";
export type FileStorageRetention = DurationDateLike | "infinite";
export type TlsProfile = "modern" | "intermediate" | "old";

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const SERVER_CONFIG_PREFIX = "/v1/server/config";

/**
 * @deprecated The Pod Dashboard shouldn’t depend on default values
 *   as they can change in the Pod API at any time without prior notice.
 *   It should use `undefined` and UI placeholders instead.
 */
export const DEFAULT_SERVER_CONFIG: ServerConfig = {
  domain: "",
  message_archive_enabled: true,
  message_archive_retention: "infinite",
  file_upload_allowed: true,
  file_storage_encryption_scheme: "AES-256",
  file_storage_retention: "infinite",
  mfa_required: true,
  tls_profile: "modern",
  federation_enabled: false,
  federation_whitelist_enabled: false,
  federation_friendly_servers: [],
  settings_backup_interval: "P1D",
  user_data_backup_interval: "P1W",
  push_notification_with_body: false,
  push_notification_with_sender: false
};

/* *************************************************************************
 * API
 * ************************************************************************* */

class APIServerConfig {
  async initServerConfig(domain: Hostname): Promise<ServerConfig> {
    return (await Api.client.put(`${SERVER_CONFIG_PREFIX}`, { domain })).data;
  }
  async getServerConfig(): Promise<ServerConfig> {
    return (await Api.client.get(`${SERVER_CONFIG_PREFIX}`)).data;
  }

  /** FILES **/

  async resetFilesConfig(): Promise<ServerConfig> {
    return (await Api.client.delete(`${SERVER_CONFIG_PREFIX}/files`)).data;
  }

  async setFileUploadAllowed(newValue: boolean): Promise<boolean> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/file-upload-allowed`,
        newValue
      )
    ).data;
  }
  async getFileUploadAllowed(): Promise<boolean> {
    return (await Api.client.get(`${SERVER_CONFIG_PREFIX}/file-upload-allowed`))
      .data;
  }
  async resetFileUploadAllowed(): Promise<boolean> {
    return (
      await Api.client.delete(`${SERVER_CONFIG_PREFIX}/file-upload-allowed`)
    ).data;
  }

  async setFileStorageEncryptionScheme(newValue: string): Promise<string> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/file-storage-encryption-scheme`,
        newValue
      )
    ).data;
  }

  async setFileStorageRetention(
    newValue: FileStorageRetention
  ): Promise<FileStorageRetention> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/file-storage-retention`,
        newValue
      )
    ).data;
  }
  async getFileStorageRetention(): Promise<FileStorageRetention> {
    return (
      await Api.client.get(`${SERVER_CONFIG_PREFIX}/file-storage-retention`)
    ).data;
  }
  async resetFileStorageRetention(): Promise<FileStorageRetention> {
    return (
      await Api.client.delete(`${SERVER_CONFIG_PREFIX}/file-storage-retention`)
    ).data;
  }

  /** MESSAGING **/

  async resetMessagingConfig(): Promise<ServerConfig> {
    return (await Api.client.delete(`${SERVER_CONFIG_PREFIX}/messaging`)).data;
  }

  async setMessageArchiveEnabled(newValue: boolean): Promise<boolean> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/message-archive-enabled`,
        newValue
      )
    ).data;
  }
  async getMessageArchiveEnabled(): Promise<boolean> {
    return (
      await Api.client.get(`${SERVER_CONFIG_PREFIX}/message-archive-enabled`)
    ).data;
  }
  async resetMessageArchiveEnabled(): Promise<boolean> {
    return (
      await Api.client.delete(`${SERVER_CONFIG_PREFIX}/message-archive-enabled`)
    ).data;
  }

  async setMessageArchiveRetention(
    newValue: MessageArchiveRetention
  ): Promise<MessageArchiveRetention> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/message-archive-retention`,
        newValue
      )
    ).data;
  }
  async getMessageArchiveRetention(): Promise<MessageArchiveRetention> {
    return (
      await Api.client.get(`${SERVER_CONFIG_PREFIX}/message-archive-retention`)
    ).data;
  }
  async resetMessageArchiveRetention(): Promise<MessageArchiveRetention> {
    return (
      await Api.client.delete(
        `${SERVER_CONFIG_PREFIX}/message-archive-retention`
      )
    ).data;
  }

  /** PUSH NOTIFICATIONS **/

  async resetPushNotificationsConfig(): Promise<ServerConfig> {
    return (
      await Api.client.delete(`${SERVER_CONFIG_PREFIX}/push-notifications`)
    ).data;
  }

  async setPushNotificationWithBody(newValue: boolean): Promise<boolean> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/push-notification-with-body`,
        newValue
      )
    ).data;
  }
  async getPushNotificationWithBody(): Promise<boolean> {
    return (
      await Api.client.get(
        `${SERVER_CONFIG_PREFIX}/push-notification-with-body`
      )
    ).data;
  }
  async resetPushNotificationWithBody(): Promise<boolean> {
    return (
      await Api.client.delete(
        `${SERVER_CONFIG_PREFIX}/push-notification-with-body`
      )
    ).data;
  }

  async setPushNotificationWithSender(newValue: boolean): Promise<boolean> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/push-notification-with-sender`,
        newValue
      )
    ).data;
  }
  async getPushNotificationWithSender(): Promise<boolean> {
    return (
      await Api.client.get(
        `${SERVER_CONFIG_PREFIX}/push-notification-with-sender`
      )
    ).data;
  }
  async resetPushNotificationWithSender(): Promise<boolean> {
    return (
      await Api.client.delete(
        `${SERVER_CONFIG_PREFIX}/push-notification-with-sender`
      )
    ).data;
  }

  /** NETWORK ENCRYPTION **/

  async resetNetworkEncryptionConfig(): Promise<ServerConfig> {
    return (
      await Api.client.delete(`${SERVER_CONFIG_PREFIX}/network-encryption`)
    ).data;
  }

  async setTlsProfile(newValue: TlsProfile): Promise<TlsProfile> {
    return (
      await Api.client.put(`${SERVER_CONFIG_PREFIX}/tls-profile`, newValue)
    ).data;
  }
  async getTlsProfile(): Promise<TlsProfile> {
    return (await Api.client.get(`${SERVER_CONFIG_PREFIX}/tls-profile`)).data;
  }
  async resetTlsProfile(): Promise<TlsProfile> {
    return (await Api.client.delete(`${SERVER_CONFIG_PREFIX}/tls-profile`))
      .data;
  }

  /** SERVER FEDERATION **/

  async resetServerFederationConfig(): Promise<ServerConfig> {
    return (
      await Api.client.delete(`${SERVER_CONFIG_PREFIX}/server-federation`)
    ).data;
  }

  async setFederationEnabled(newValue: boolean): Promise<boolean> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/federation-enabled`,
        newValue
      )
    ).data;
  }
  async getFederationEnabled(): Promise<boolean> {
    return (await Api.client.get(`${SERVER_CONFIG_PREFIX}/federation-enabled`))
      .data;
  }
  async resetFederationEnabled(): Promise<boolean> {
    return (
      await Api.client.delete(`${SERVER_CONFIG_PREFIX}/federation-enabled`)
    ).data;
  }

  async setFederationWhitelistEnabled(newValue: boolean): Promise<boolean> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/federation-whitelist-enabled`,
        newValue
      )
    ).data;
  }
  async getFederationWhitelistEnabled(): Promise<boolean> {
    return (
      await Api.client.get(
        `${SERVER_CONFIG_PREFIX}/federation-whitelist-enabled`
      )
    ).data;
  }
  async resetFederationWhitelistEnabled(): Promise<boolean> {
    return (
      await Api.client.delete(
        `${SERVER_CONFIG_PREFIX}/federation-whitelist-enabled`
      )
    ).data;
  }

  async setFederationFriendlyServers(
    newValue: Hostname[]
  ): Promise<Hostname[]> {
    return (
      await Api.client.put(
        `${SERVER_CONFIG_PREFIX}/federation-friendly-servers`,
        newValue
      )
    ).data;
  }
  async getFederationFriendlyServers(): Promise<Hostname[]> {
    return (
      await Api.client.get(
        `${SERVER_CONFIG_PREFIX}/federation-friendly-servers`
      )
    ).data;
  }
  async resetFederationFriendlyServers(): Promise<Hostname[]> {
    return (
      await Api.client.delete(
        `${SERVER_CONFIG_PREFIX}/federation-friendly-servers`
      )
    ).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIServerConfig();
