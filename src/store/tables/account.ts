/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";

// PROJECT: API
import Api from "@/api";
import APIAuth from "@/api/providers/auth";
import APIInit from "@/api/providers/init";
import { Avatar, MemberRole } from "@/api/providers/members";
import { BareJid } from "@/api/providers/global";

// PROJECT: STORE
import store from "@/store";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface AccountSession {
  token: string | null;
  jid: BareJid | null;
  role: MemberRole | null;
  nickname: string | null;
  avatar: Avatar | null;
}

export interface OnboardingChecks {
  all_dns_checks_passed_once: boolean | null;
  at_least_one_invitation_sent: boolean | null;
}

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $account = defineStore("account", {
  // Important: persist this store, since it retains account-level information.
  persist: true,

  state: () => {
    return {
      session: {} as AccountSession,
      onboardingStatus: {} as OnboardingChecks
    };
  },

  getters: {
    getOnboardingStatus: function () {
      return (): OnboardingChecks => {
        return this.onboardingStatus;
      };
    },

    getSessionToken: function () {
      return (): string | null => {
        return this.session?.token;
      };
    },

    getUserSessionData: function () {
      return () => {
        return {
          jid: this.session?.jid,
          nickname: this.session?.nickname,
          role: this.session?.role,
          avatar: this.session?.avatar
        };
      };
    },

    getUserRole: function () {
      return (): MemberRole | null => {
        return this.session?.role;
      };
    }
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      const { token } = await APIAuth.login(username, password);

      // Save session token
      this.setSessionToken(token);
      this.setSessionJid(username);

      // Load user information
      this.loadUserInformation();
    },

    async logout(): Promise<void> {
      // Clear session token
      this.setSessionToken(null);
    },

    async loadUserInformation() {
      const jid = this.session?.jid || null;

      // Proceed loading?
      if (jid !== null) {
        const user = await store.$teamMembers.loadMemberById(jid);

        if (user) {
          // Update user session data
          this.$patch(() => {
            this.session.nickname = user.nickname;
            this.session.role = user.role;
            this.session.avatar = user.avatar || null;
          });
        }
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
    },

    async loadOnboardingStatus() {
      const status = await APIInit.getOnboardingStatus();

      // Update status
      this.$patch(() => {
        this.onboardingStatus = status;
      });
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $account;
