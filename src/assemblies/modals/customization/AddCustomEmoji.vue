<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
base-modal(
  title="Add a custom emoji"
  button-color="purple"
  button-label="Add custom Emoji"
  @close="onClose"
  @confirm="onProceed"
)
  .a-add-custom-emoji
    h4
      | Emoji image

    .a-add-custom-emoji__upload
      base-avatar(
        :avatar-data-url="emojiUrl"
        class="a-add-custom-emoji__upload--avatar"
        size="60px"
        borderRadius="7px"
        type="image"
      )

      base-upload-button(
        @filePicked="onFilePicked"
        accept="image/*"
        label="Upload image..."
        width="117px"
      )

    base-modal-input-block(
      v-model="emojiShortcut"
      :autofocus="inputAutofocus"
      type="text"
      label="Emoji shortcut"
      placeholder="Enter a :shortcut: for the emoji..."
    )
    
    .a-add-custom-emoji__info
      base-icon(
        class="a-add-custom-emoji__info--icon"
        name="info.circle"
        height="20px"
        width="21.5px"
      )

      p
        | The emoji shortcut is what users can enter in the message field to insert the emoji, in text form. We recommend to keep it short and memorable.
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import store from "@/store";

// TYPES
export type imageUrl = string | ArrayBuffer | null;

export default {
  name: "AddCustomEmoji",

  props: {},

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--

      emojiUrl: "" as imageUrl,

      emoji: null as File | null,

      emojiShortcut: "",

      inputAutofocus: false,
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--
    onPickFile() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },

    onFilePicked(event: Event) {
      this.inputAutofocus = false;

      const files = (event.target as HTMLInputElement).files || [];

      // Show emoji preview
      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        this.emojiUrl = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);

      this.emoji = files[0];

      this.inputAutofocus = true;
    },

    onProceed() {
      if (!this.emojiUrl || !this.emojiShortcut) {
        BaseAlert.error("Please complete all the fields");
      } else {
        // const date = new Date();
        // const options = {
        //   day: "numeric",
        //   month: "long",
        //   year: "numeric",
        // };

        // const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

        // const newReaction = {
        //   id: "e8f6dbac-cda3-460e-88f1-5e588c64c76e",
        //   imageUrl: this.emojiUrl,
        //   shortcut: this.emojiShortcut,
        //   date: formattedDate,
        //   contributor: "Valerian Saliou",
        //   contributorAvatar: "https://avatars.githubusercontent.com/u/1451907?v=4",
        // };

        // store.$customizationEmojis.addReaction(newReaction);

        this.onClose();
      }
    },

    onClose() {
      this.emojiUrl = "";
      this.emoji = null;
      this.emojiShortcut = "";

      this.$emit("close");
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-add-custom-emoji";

#{$c} {
  margin-inline: 48px;

  h4 {
    color: $color-text-secondary;
    margin-top: 0;
    margin-bottom: 11px;
    margin-left: 8px;
    font-weight: $font-weight-medium;
  }

  #{$c}__upload {
    display: flex;
    align-items: center;
    position: relative;
    padding-block: 13.5px;
    padding-left: 33px;
    margin-bottom: 30px;
    border: 1px solid $color-border-secondary;
    border-radius: 7px;

    &--avatar {
      outline: 1px solid $color-border-secondary;
      outline-offset: 1.5px;
      margin-right: 21.5px;
    }
  }

  #{$c}__input {
    position: absolute;
    cursor: pointer;
    width: 120px;
    left: 18%;
    opacity: 0;
  }

  #{$c}__info {
    display: flex;
    align-items: center;
    font-weight: $font-weight-light;
    margin-top: 38px;
    margin-left: 9px;
    font-size: ($font-size-baseline - 1px);

    p {
      margin: 0;
    }

    &--icon {
      margin-right: 13px;
    }
  }
}
</style>
