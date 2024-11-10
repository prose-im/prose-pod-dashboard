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

interface LoginResponse {
  token: string;
}

/**************************************************************************
 * API
 * ************************************************************************* */

class APILogin {
  async login(username: string, password: string): Promise<LoginResponse> {
    return (
      await Api.client.post<LoginResponse>(
        "/login",
        {},
        {
          auth: {
            username,
            password
          }
        }
      )
    ).data;
  }
}

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default new APILogin();
