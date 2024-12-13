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
  @close="onClose"
  @confirm="onProceed"
  :visible="visibility"
  position="center"
  title="Select new icon"
  button-color="purple"
  button-label="Change icon"
  :disabled="proceedDisabled"
)
  .a-edit-logo
    h4
      | New icon

    .a-edit-logo__upload
      base-avatar(
        :avatar-data-url="chosenImageUrl"
        class="a-edit-logo__upload--avatar"
        size="60px"
        border-radius="7px"
        type="image"
      )

      .a-edit-logo__upload--left
        base-upload-button(
          @filePicked="onFilePicked"
          accept="image/*"
          label="Upload image..."
          width="117px"
        )

        p
          | (Formats: .jpeg, .png, .gif, .webp)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// STORE
import store from "@/store";

// PACKAGES
import { fileToBase64 } from "file64";
import imageCompression from "browser-image-compression";

export default {
  name: "EditLogo",

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--

      imageUrl: "",
      image: "",

      shortcut: "",

      proceedDisabled: true
    };
  },

  computed: {
    currentImage() {
      return ""; //store.$customizationWorkspace.getWorkspaceLogo();
    },

    chosenImageUrl() {
      return this.imageUrl ? this.imageUrl : this.currentImage;
    }
  },

  methods: {
    // --> HELPERS <--
    async compressImage(imageFile: File) {
      console.log("type", typeof imageFile, imageFile);
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.256,
        maxWidthOrHeight: 1000,
        useWebWorker: true
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);

        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        return compressedFile;
      } catch (error) {
        console.log(error);
      }
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },

    async onFilePicked(event: Event) {
      const files = event.target.files;
      let file = files[0];
      const fileType = file.type.split("/")[1];

      if (
        !(
          fileType === "jpeg" ||
          fileType === "png" ||
          fileType === "gif" ||
          fileType === "webp"
        )
      ) {
        BaseAlert.error("Please choose an image with the right format");
        return;
      }

      // Show image preview
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        if (!fileReader.result) {
          BaseAlert.error("An error occurred");
          return;
        } else {
          this.imageUrl = fileReader.result;
        }
      });

      fileReader.readAsDataURL(file);

      // Compress image if it's bigger than 256 ko
      if (file.size > 256000) {
        file = await this.compressImage(files[0]);
      }

      const encodedResult = await fileToBase64(file);
      this.image = encodedResult.split(",")[1];

      // Enable proceed button
      this.proceedDisabled = false;
    },

    // --> EVENT LISTENERS <--
    onProceed() {
      if (this.image) {
        store.$customizationWorkspace.updateWorkspaceIcon(this.image);

        // Reinitialize variables + close modal
        this.onClose();
      } else {
        BaseAlert.error("Could not change your logo", "Please upload an image");
      }
    },

    onClose() {
      // Reinitialize variables
      this.imageUrl = "";
      this.image = "";

      // Close modal
      this.$emit("close");
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-edit-logo";

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
    border: 1px solid $color-border-secondary;
    border-radius: 7px;

    &--avatar {
      outline: 1px solid $color-border-secondary;
      outline-offset: 1.5px;
      margin-right: 21.5px;
    }

    p {
      margin: 0;
      margin-block-start: 8px;
      margin-inline: 2px;
      font-size: ($font-size-baseline - 3px);
    }
  }

  #{$c}__input {
    position: absolute;
    cursor: pointer;
    width: 120px;
    left: 18%;
    opacity: 0;
  }
}
</style>
