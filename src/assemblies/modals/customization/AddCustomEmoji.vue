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
        :avatar-data-url="imageUrl"
        class="a-add-custom-emoji__upload--avatar"
        size="60px"
        borderRadius="7px"
      )

      base-upload-button(
        @filePicked="onFilePicked"
        accept="image/*"
        label="Upload image..."
        width="117px"
      )

    h4
      | Emoji shortcut
      
    form-field(
      v-model="shortcut"
      type="text"
      size="mid-large"
      align="left"
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
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseUploadButton from "@/components/base/BaseUploadButton.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import FormField from "@/components/form/FormField.vue";
import store from "@/store";

export default {
  name: "AddCustomEmoji",

  components: {
    BaseAvatar,
    BaseIcon,
    BaseModal,
    BaseUploadButton,
    FormField,
  },

  props: {},

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--

      imageUrl: "",

      image: "",

      shortcut: "",
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--
    onPickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      console.log("hi");
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },

    onProceed() {
      const date = new Date();
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

      const newReaction = {
        id: "e8f6dbac-cda3-460e-88f1-5e588c64c76e",
        imageUrl: this.imageUrl,
        shortcut: this.shortcut,
        date: formattedDate,
        contributor: "Valerian Saliou",
        contributorAvatar: "https://avatars.githubusercontent.com/u/1451907?v=4",
      };

      store.$customizationEmojis.addReaction(newReaction);

      this.imageUrl = "";
      this.image = "";
      this.$emit("close");
    },

    onClose() {
      this.imageUrl = "";
      this.image = "";
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
  font-family: $font-family-default;

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
