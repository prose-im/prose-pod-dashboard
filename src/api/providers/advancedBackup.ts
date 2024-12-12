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

export class APIAdvancedBackup {
  /* TODO */
  async getBackupConfig(): Promise<void> {
    return (await Api.client.get(``)).data;
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIAdvancedBackup();
