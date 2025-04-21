<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
div(
  v-text="contentText"
  :class=`[
    "c-base-avatar"
  ]`
  :style=`{
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage,
    fontSize: fontSize,
    height: size,
    width: size,
    borderRadius: borderRadius
  }`
)
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
// INSTANCES
const TEXTUAL_INITIALS_NORMALIZE_REGEX = /\p{Diacritic}/gu;

// CONSTANTS
const SIZE_TO_FONT_SIZE_RATIO = 0.5;
const TEXTUAL_PALETTE_COLORS = [
  "df74c9",
  "05cd8f",
  "52a6db",
  "ee733d",
  "f48686",
  "6b6f8c",
  "e13030",
  "8e30de",
  "b258ec",
  "f15e5e",
  "3159ea",
  "7ab0ff",
  "78c670",
  "18aeec",
  "8125d4",
  "c32ea3",
  "415dae",
  "d79b25",
  "ce811a",
  "2ba032"
];

export default {
  name: "BaseAvatar",

  props: {
    size: {
      type: String,
      default: "34px"
    },

    avatarType: {
      type: String,
      default: "image/png"
    },

    avatarData: {
      type: String,
      default: null
    },

    avatarUrl: {
      type: String,
      default: null
    },

    borderRadius: {
      type: String,
      default: "5px"
    },

    name: {
      type: String,
      default: null
    },

    type: {
      type: String,
      default: "person",

      validator(x: string) {
        return ["person", "image"].includes(x);
      }
    }
  },

  computed: {
    backgroundImage(): string | void {
      // Generate avatar URL from raw URL?
      if (this.avatarUrl) {
        return this.avatarUrl;
      }

      // Generate avatar URL from data and MIME type?
      if (this.avatarType && this.avatarData) {
        return `url(data:${this.avatarType};base64,${this.avatarData})`;
      }

      return "";
    },

    backgroundColor(): string | void {
      // Generate background color? (as avatar is textual)
      if (this.isTextual === true) {
        const value = this.name || "";

        if (value) {
          return this.generateTextualPalette(value);
        }
      }

      return undefined;
    },

    isTextual(): boolean {
      return !this.backgroundImage ? true : false;
    },

    sizeNumeric(): number {
      return parseInt(this.size.replace("px", ""));
    },

    contentText(): string | void {
      // Generate content text? (as avatar is textual)
      if (this.isTextual === true) {
        const name = this.name || "";

        return this.normalizeTextualInitials(
          this.generateTextualInitials(name) || undefined
        );
      }

      return undefined;
    },

    fontSize(): string | void {
      // Compute font size? (only if avatar is textual)
      if (this.isTextual === true) {
        // Compute numeric font size
        const fontSizeNumeric = Math.ceil(
          this.sizeNumeric * SIZE_TO_FONT_SIZE_RATIO
        );

        // Return pixel-sized font size
        return `${fontSizeNumeric}px`;
      }

      return undefined;
    }
  },

  watch: {},

  methods: {
    normalizeTextualInitials(initials?: string): string | void {
      // Enforce initials to uppercase, and remove any accent and diacritic
      if (initials) {
        return initials
          .toUpperCase()
          .normalize("NFD")
          .replace(TEXTUAL_INITIALS_NORMALIZE_REGEX, "");
      }

      return undefined;
    },

    generateTextualPalette(value: string): string {
      // Compute value fingerprint
      let valueFingerprint = 0;

      for (let i = 0; i < value.length; i++) {
        valueFingerprint += value.charCodeAt(i);
      }

      // Acquire color based on value fingerprint
      const color =
        TEXTUAL_PALETTE_COLORS[
          valueFingerprint % TEXTUAL_PALETTE_COLORS.length
        ];

      return `#${color}`;
    },

    generateTextualInitials(name = ""): string | void {
      // #1. Extract initials from name (if any, and if long enough)
      if (name) {
        const nameChunks = name
          .split(" ")
          .map(nameChunk => {
            return nameChunk.trim();
          })
          .filter(nameChunk => {
            return nameChunk ? true : false;
          });

        // Extract first name and family name initials?
        if (nameChunks.length >= 2) {
          return `${nameChunks[0][0]}${nameChunks[1][0]}`;
        }

        // Extract first two characters of first name?
        if (nameChunks.length > 0 && nameChunks[0].length >= 1) {
          return nameChunks[0].substring(0, 2);
        }
      }

      // No initials extracted
      return undefined;
    }
  }
};
</script>

<!-- **********************************************************************
      STYLE
      ********************************************************************** -->

<style lang="scss">
$c: ".c-base-avatar";

#{$c} {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  letter-spacing: 0.25px;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-white;
}
</style>
