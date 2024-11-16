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
 * CONSTANTS
 * ************************************************************************* */

const CONFIG_URL = "/server/config";

/**************************************************************************
 * API
 * ************************************************************************* */

class APIServerConfiguration {
  /**  WHOLE SERVER CONFIG  **/

  async getServerConfig(): Promise<void> {
    return await Api.client.get(`${CONFIG_URL}`);
  }

  /**  MESSAGING  **/

  async resetMessagesConfig(): Promise<void> {
    return (await Api.client.put(`${CONFIG_URL}/messaging/reset`)).data;
  }

  async updateMessageArchiveEnabled(enableArchive: boolean): Promise<void> {
    return await Api.client.put(`${CONFIG_URL}/message-archive-enabled`, {
      message_archive_enabled: enableArchive
    });
  }

  async updateMessageRetentionTime(newRetentionTime: string): Promise<void> {
    await Api.client.put(`${CONFIG_URL}/message-archive-retention`, {
      message_archive_retention: newRetentionTime
    });
  }

  async resetMessageRetentionTime(): Promise<void> {
    return (await Api.client.put(`${CONFIG_URL}/message-archive-retention/reset`)).data;
  }

  /**  FILES  **/

  async resetFilesConfig(): Promise<void> {
    await Api.client.put(`${CONFIG_URL}/files/reset`);
  }

  async updateFileUploadPermission(
    uploadAllowed: boolean
  ): Promise<void> {
    await Api.client.put(`${CONFIG_URL}/file-upload-allowed`, {
      file_upload_allowed: uploadAllowed
    });
  }

  async updateFileEncryptionScheme(
    newEncryptionScheme: string
  ): Promise<void> {
    await Api.client.put(`${CONFIG_URL}/file-storage-encryption-scheme`, {
      newEncryptionScheme
    });
  }

  async updateFileRetentionTime(newRetentionTime: string): Promise<void> {
    await Api.client.put(`${CONFIG_URL}/file-storage-retention`, {
      file_storage_retention: newRetentionTime
    });
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIServerConfiguration();
