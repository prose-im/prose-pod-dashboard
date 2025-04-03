/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";

// PROJECT: API
import Api from "@/api";
import APIAuth from "@/api/providers/auth";
import store from "..";
import { MemberRole } from "@/api/providers/members";
import { BareJid } from "@/api/providers/global";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Account {
  session: {
    token: string | null;
    jid: BareJid | null;
    role: MemberRole | null;
    nickname: string | null;
    avatar: string | null;
  };
}

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $account = defineStore("account", {
  // Important: persist this store, since it retains account-level information.
  persist: true,

  state: (): Account => {
    return {
      session: {
        token: null,
        jid: null,
        nickname: null,
        role: null,
        avatar: null
      }
    };
  },

  getters: {
    getSessionToken: function () {
      return (): string | null => {
        return this.session.token;
      };
    },

    getUserSessionData: function () {
      return () => {
        return {
          jid: this.session.jid,
          nickname: this.session.nickname,
          role: this.session.role
        };
      };
    },

    getUserRole: function () {
      return (): MemberRole | null => {
        return this.session.role;
      };
    }
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      const { token } = await APIAuth.login(username, password);

      // Save session token
      this.setSessionToken(token);

      this.setSessionJid(username);

      this.loadUserInformation();
    },

    async logout(): Promise<void> {
      // Clear session token
      this.setSessionToken(null);
    },

    async loadUserInformation() {
      const user = await store.$teamMembers.loadMemberById(this.session.jid);

      if (user) {
        // Update user session data
        this.$patch(() => {
          this.session.nickname = user.nickname;
          this.session.role = user.role;
          this.session.avatar = user.avatar;
        });
        console.log("user", user);
      }
    },

    setSessionToken(token: string | null): void {
      // Update saved token
      this.$patch(() => {
        this.session.token = token;
      });

      // Re-authenticate to API client (or de-authenticate)
      Api.authenticate(token);
    },

    setSessionJid(jid: string | null) {
      // Update jid
      this.$patch(() => {
        this.session.jid = jid;
      });
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $account;
