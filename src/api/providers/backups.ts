/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2026, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import {
  fetchEventSource,
  FetchEventSourceInit
} from "@microsoft/fetch-event-source";

// PROJECT: API
import Api from "@/api";
import { Url } from "@/api/providers/global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface Backup<Metadata> {
  id: BackupId;
  description: string;
  metadata: Metadata;
}

export interface BackupMetadataPartial {
  /**
   * UTC timestamp at which the backup was created.
   */
  created_at: Date;

  /**
   * Size of the backup, in bytes.
   */
  size_bytes: number;

  /**
   * Whether or not the backup was signed.
   *
   * This doesn’t mean anything regarding whether or not the signature
   * was issued by a trusted entity nor if it’s valid. Such information
   * is only present in `BackupMetadataFull`.
   */
  is_signed: boolean;

  /**
   * Whether or not the backup is encrypted.
   */
  is_encrypted: boolean;

  /**
   * An indicator potentially indicating a backup cannot be restored
   * (e.g. it’s not signed but signing is mandatory).
   *
   * ⚠️ Beware that `can_be_restored` is a one-sided indicator. `true`
   * doesn’t mean a restore will succeed for sure. More computation is
   * required to know if the backup is intact and using trusted keys for
   * example. `false`, however, means restoring this backup is impossible
   * and the option shouldn’t be presented to a user.
   */
  can_be_restored: boolean;
}

export interface BackupMetadataFull {
  /**
   * UTC timestamp at which the backup was created.
   */
  created_at: Date;

  /**
   * Size of the backup, in bytes.
   */
  size_bytes: number;

  /**
   * Whether or not the backup is intact (not corrupted).
   *
   * If it’s not intact, you cannot restore it.
   */
  is_intact: boolean;

  /**
   * Whether or not the backup was signed.
   *
   * This doesn’t mean anything regarding whether or not the signature
   * was issued by a trusted entity nor if it’s valid. Such information
   * is in `signing_keys`, then `is_trusted` and `is_valid`.
   */
  is_signed: boolean;

  /**
   * Fingerprint of the key(s) used to sign the backup, if applicable.
   *
   * Note that this list might be empty while `is_signed` is `true`.
   * It means the backup was signed but with an unknown key (lost or
   * malicious). In that case, `can_be_restored` might still be `true`
   * (e.g. if the integrity of the backup was verified successfully).
   */
  known_signing_keys: SigningKeyReport[];

  /**
   * Whether or not the backup is encrypted.
   */
  is_encrypted: boolean;

  /**
   * Fingerprint of the key used to encrypt the backup, if applicable.
   */
  encryption_key: OpenPgpKeyFingerprint | null;

  /**
   * Whether or not the backup can be successfully decrypted
   * (i.e. encrypted with an known private key).
   */
  is_encryption_valid: boolean | null;

  /**
   * Whether or not the backup can be restored (e.g. `false` if its
   * signature is invalid).
   *
   * ⚠️ Beware that `BackupMetadataFull::can_be_restored` might
   * differ from `BackupMetadataPartial::can_be_restored` as the
   * latter doesn’t know if the backup is intact or using trusted keys.
   */
  can_be_restored: boolean;
}

export interface SigningKeyReport {
  fingerprint: OpenPgpKeyFingerprint;
  is_valid: boolean;
}

export interface CreateBackupRequest {
  description: string;
}

export interface CreateBackupSuccess {
  backup: PartialBackup;
  backup_id: BackupId;
  digest_ids: string[];
  signature_ids: string[];
}

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type BackupId = string;
export type OpenPgpKeyFingerprint = string;

export type PartialBackup = Backup<BackupMetadataPartial>;
export type FullBackup = Backup<BackupMetadataFull>;

/* *************************************************************************
 * API
 * ************************************************************************* */

class APIBackups {
  /** LIST **/

  async getAllBackups(): Promise<PartialBackup[]> {
    return (await Api.client.get("/v1/backups")).data;
  }

  /** BACKUP **/

  async getbackup(backupId: BackupId): Promise<FullBackup | null> {
    return (await Api.client.get(`/v1/backups/${backupId}`)).data;
  }

  async deleteBackup(backupId: BackupId): Promise<void> {
    return await Api.client.delete(`/v1/backups/${backupId}`);
  }

  async getBackupDownloadUrl(backupId: BackupId): Promise<Url> {
    return (await Api.client.get(`/v1/backups/${backupId}/download-url`)).data;
  }

  /** CREATE **/

  async createBackup(
    request: CreateBackupRequest
  ): Promise<CreateBackupSuccess> {
    return (await Api.client.post("/v1/backups", request)).data;
  }

  async createBackupStream(
    request: CreateBackupRequest,
    init: FetchEventSourceInit
  ): Promise<void> {
    const ts_request = new Request("/v1/backups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    fetchEventSource(ts_request, init);
  }

  /** RESTORE **/

  async restoreBackup(backupId: BackupId): Promise<void> {
    return (await Api.client.put(`/v1/backups/${backupId}`)).data;
  }

  async restoreBackupStream(
    backupId: BackupId,
    init: FetchEventSourceInit
  ): Promise<void> {
    const ts_request = new Request(`/v1/backups/${backupId}`, {
      method: "PUT"
    });

    fetchEventSource(ts_request, init);
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIBackups();
