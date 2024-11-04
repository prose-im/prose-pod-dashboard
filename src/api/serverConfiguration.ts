import axios from 'axios';

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const CONFIG_URL = '/server/config';

class ServerConfiguration {

  /**  MESSAGING  **/ 

  async resetMessagesConfig(): Promise<void> {
    await axios.put(`${CONFIG_URL}/messaging/reset`);
  }

  async updateMessageArchiveEnabled(
    enableArchive: boolean
  ): Promise<void> {
    await axios.put(`${CONFIG_URL}/message-archive-enabled`, {
      enableArchive
    });
  }

  async updateMessageRetentionTime(
    newRetentionTime: string
  ): Promise<void> {
    await axios.put(`${CONFIG_URL}/message-archive-retention`, {
      newRetentionTime
    });
  }

  async resetMessageRetentionTime(): Promise<void> {
    await axios.put(`${CONFIG_URL}/message-archive-retention/reset`);
  }

  /**  FILES  **/ 

  async resetFilesConfig(): Promise<void> {
    await axios.put(`${CONFIG_URL}/files/reset`);
  }

  async updateFileUploadPermission(  /// ?? get to update UI?
    uploadAllowed: string
  ): Promise<void> {
    await axios.put(`${CONFIG_URL}/file-upload-allowed`, {
      uploadAllowed
    });
  }

  async updateFileEncryptionScheme(
    newEncryptionScheme: string
  ): Promise<void> {
    await axios.put(`${CONFIG_URL}/file-storage-encryption-scheme`, {
      newEncryptionScheme
    });
  }

  async updateFileRetentionTime(
    newRetentionTime: string
  ): Promise<void> {
    await axios.put(`${CONFIG_URL}/file-storage-retention`, {
      newRetentionTime
    });
  }
}

export default new ServerConfiguration();