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

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface LoginResponse {
  token: string;
}

/* *************************************************************************
 * API
 * ************************************************************************* */

class APIAuth {
  async login(username: string, password: string): Promise<LoginResponse> {
    return (
      await Api.client.post<LoginResponse>("/login", undefined, {
        auth: {
          username,
          password
        }
      })
    ).data;
  }
}

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APIAuth();
