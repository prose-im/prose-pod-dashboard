<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
transition(
  enter-active-class="u-animate u-animate--fade-in-down-small u-animate--fast"
  leave-active-class="u-animate u-animate--fade-out-up-small u-animate--superfast"
)
  div(
    v-if="title"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    :class=`[
      "c-base-alert",
      "c-base-alert--" + level,
      {
        "c-base-alert--with-toolbar": hasToolbar,
        "c-base-alert--with-sidebar": hasSidebar,
        "c-base-alert--with-inbox-details": hasInboxDetails
      }
    ]`
  )
    .c-base-alert__inner
      .c-base-alert__badge
        base-icon(
          :name="badgeIcon"
          :fill="badgeIconColor"
          size="24px"
          class="c-base-alert__badge-icon"
        )

      .c-base-alert__text
        p.c-base-alert__text-title.u-medium
          | {{ title }}

        p.c-base-alert__text-description(
          v-if="description"
        )
          | {{ description }}

      base-action(
        @click="onCloseClick"
        class="c-base-alert__close"
        icon="xmark"
        context="grey"
        size="12px"
        auto-width
        auto-height
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
//PROJECT COMPONENTS
import BaseAction from "@/components/base/BaseAction.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";

// NPM
import mitt, { Handler } from "mitt";

// PROJECT: STORES
import Store from "@/store";

// ENUMERATIONS
enum Level {
  // Error alert level.
  Error = "error",
  // Warning alert level.
  Warning = "warning",
  // Info alert level.
  Info = "info",
  // Success alert level.
  Success = "success"
}

export enum Visibility {
  // Auto-hide visibility.
  AutoHide = "auto-hide",
  // Sticky visibility.
  Sticky = "sticky"
}

// INTERFACES
interface State {
  level: Level;
  title: string;
  description: string;
  visibility: Visibility;

  timers: {
    show: null | ReturnType<typeof setTimeout>;
    hide: null | ReturnType<typeof setTimeout>;
  };
}

// CONSTANTS
const ALERT_SHOW_AFTER_DELAY = 250; // 250 milliseconds

const ALERT_EXPIRE_HIDE_DELAY_DEFAULT = 4000; // 4 seconds
const ALERT_EXPIRE_HIDE_DELAY_SHORT = 2000; // 2 seconds

const ALERT_VISIBILITY_DEFAULT = Visibility.AutoHide;

// INSTANCES
const EventBus = mitt();

export default {
  name: "BaseAlert",

  components: {
    BaseAction,
    BaseIcon
  },

  data() {
    return {
      // --> STATE <--

      level: Level.Error,
      title: "",
      description: "",
      visibility: ALERT_VISIBILITY_DEFAULT,

      timers: {
        show: null,
        hide: null
      }
    } as State;
  },

  error(title: string, description?: string, visibility?: Visibility) {
    EventBus.emit("show", {
      level: Level.Error,
      title,
      description,
      visibility
    });
  },

  warning(title: string, description?: string, visibility?: Visibility) {
    EventBus.emit("show", {
      level: Level.Warning,
      title,
      description,
      visibility
    });
  },

  info(title: string, description?: string, visibility?: Visibility) {
    EventBus.emit("show", {
      level: Level.Info,
      title,
      description,
      visibility
    });
  },

  success(title: string, description?: string, visibility?: Visibility) {
    EventBus.emit("show", {
      level: Level.Success,
      title,
      description,
      visibility
    });
  },

  computed: {
    badgeIcon(): string {
      switch (this.level) {
        case "success": {
          return "checkmark.circle.fill";
        }

        case "info": {
          return "info.circle.fill";
        }

        case "warning":
        case "error": {
          return "exclamationmark.circle.fill";
        }

        default: {
          return "questionmark.circle.fill";
        }
      }
    },

    badgeIconColor(): string {
      switch (this.level) {
        case "error": {
          return "#dd2f2f";
        }

        default: {
          return "#000000";
        }
      }
    },

    hasToolbar(): boolean {
      return false //this.session.interface.toolbar.mounted || false;
    },

    hasSidebar(): boolean {
      return false //this.session.interface.sidebar.mounted || false;
    },

    hasInboxDetails(): boolean {
      return false //this.session.interface.inboxDetails.mounted || false;
    },

    session(): typeof Store.$session {
      return Store.$session;
    },

    hotkeys(): { [name: string]: (event: Event) => void } {
      return {
        esc: this.onHotkeyEscape
      };
    }
  },

  created() {
    // Bind show event
    EventBus.on("show", this.show as Handler);
  },

  beforeUnmount() {
    // Unbind show event
    EventBus.off("show", this.show as Handler);
  },

  methods: {
    // --> HELPERS <--

    show({
      level,
      title,
      description = "",
      visibility = ALERT_VISIBILITY_DEFAULT
    }: {
      level: Level;
      title: string;
      description?: string;
      visibility?: Visibility;
    }): void {
      if (!level || !title) {
        throw new Error("No alert level or title provided");
      }

      // Cancel any pending alert show
      this.unscheduleShow();

      // Hide previous alert?
      this.hide();

      // Open alert
      this.timers.show = setTimeout(() => {
        this.timers.show = null;

        // Assign alert data
        this.level = level;
        this.title = title;
        this.description = description;
        this.visibility = visibility;

        // Schedule later alert hide (as needed)
        this.scheduleHide();
      }, ALERT_SHOW_AFTER_DELAY);
    },

    hide(): void {
      if (this.title) {
        // Unschedule hide
        this.unscheduleHide();

        // Hide alert
        this.title = "";
        this.description = "";
      }
    },

    scheduleHide(shortLived = false, force = false): void {
      // Unschedule any previously-scheduled hide
      this.unscheduleHide();

      // Schedule later hide? (if auto-hide visibility or forced)
      if (force === true || this.visibility === Visibility.AutoHide) {
        this.timers.hide = setTimeout(
          () => {
            this.timers.hide = null;

            // Hide alert
            this.hide();
          },

          shortLived === true
            ? ALERT_EXPIRE_HIDE_DELAY_SHORT
            : ALERT_EXPIRE_HIDE_DELAY_DEFAULT
        );
      }
    },

    unscheduleHide(): void {
      // Clear existing hide timer?
      if (this.timers.hide !== null) {
        clearTimeout(this.timers.hide);

        this.timers.hide = null;
      }
    },

    unscheduleShow(): void {
      // Clear existing show timer?
      if (this.timers.show !== null) {
        clearTimeout(this.timers.show);

        this.timers.show = null;
      }
    },

    // --> EVENT LISTENERS <--

    onMouseOver(): void {
      // Unschedules close
      this.unscheduleHide();
    },

    onMouseLeave(): void {
      // Re-schedule closure (as it was previously unscheduled, as needed)
      this.scheduleHide(true);
    },

    onCloseClick(): void {
      // Hide alert
      this.hide();
    },

    onHotkeyEscape(event: Event): void {
      event.stopPropagation();
      event.preventDefault();

      // Hide alert
      this.hide();
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-alert";

// VARIABLES
$alert-padding-sides: 12px;

#{$c} {
  padding-inline: $alert-padding-sides;
  pointer-events: none;
  display: flex;
  justify-content: center;
  position: absolute;
  inset-block-start: 90%;
  inset-inline: 0;
  z-index: $index-foreground-primary;

  #{$c}__inner {
    background-color: $color-white;
    border: 1px solid $color-border-secondary;
    padding-block: 10px;
    padding-inline: 10px 17px;
    backdrop-filter: blur(9px);
    pointer-events: initial;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px 0 rgba($color-black, 0.03),
      inset 0 1px 0 0 rgba($color-white, 0.2);
    border-radius: 14px;

    #{$c}__badge {
      height: 54px;
      width: 54px;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
    }

    #{$c}__text {
      font-family: $font-family-default;
      line-height: 17px;
      margin-block-start: -1px;
      padding-inline: 26px 51px;
      flex: 1;

      #{$c}__text-title {
        font-size: ($font-size-baseline + 3px);
        font-weight: $font-weight-medium;
        margin-block: 0 10px;
        flex: 0 0 auto;
      }

      #{$c}__text-description {
        font-size: ($font-size-baseline + 1px);
        font-weight: $font-weight-light;
        margin-block: 0;
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }

  // --> LEVELS <--

  &--error {
    #{$c}__badge {
      background-color: rgba($color-base-red-normal, 0.15);
    }

    #{$c}__text-title {
      color: $color-base-red-normal;
    }
  }

  &--warning {
    #{$c}__inner {
      background-color: rgba($color-base-orange-normal, 0.95);
    }
  }

  // --> BOOLEANS <--

  &--with-toolbar {
    margin-block-start: $size-layout-view-topbar-height;
  }

  &--with-sidebar {
    padding-inline-start: ($alert-padding-sides + $size-sidebar-width);
  }

  &--with-inbox-details {
    padding-inline-end: ($alert-padding-sides + $size-inbox-details-width);
  }
}
</style>
