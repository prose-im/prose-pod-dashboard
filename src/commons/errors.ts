/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface ErrorWithMessageAndStatus {
  status: number;
  message: string;
}

interface ErrorFromResponse {
  response: {
    data: {
      message: string;
      error: string;
    };
  };
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export type { ErrorWithMessageAndStatus, ErrorFromResponse };
