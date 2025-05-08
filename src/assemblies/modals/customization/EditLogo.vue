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
  :disabled="proceedDisabled"
  :loading="sendingRequest"
  :visible="visibility"
  position="center"
  title="Select new icon"
  button-color="purple"
  button-label="Change icon"
)
  .a-edit-logo
    h4
      | Workspace icon

    .a-edit-logo__upload
      base-avatar(
        :avatar-content-type="previewImageType"
        :avatar-data-base64="previewImageData"
        :placeholder-data="domain"
        class="a-edit-logo__upload--avatar"
        size="60px"
        border-radius="7px"
        type="image"
      )

      .a-edit-logo__upload--left
        base-upload-button(
          @file-picked="onFilePicked"
          accept="image/*"
          label="Select an image..."
          width="117px"
        )

        p
          | (Formats: .jpeg, .png, .gif)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { fileToBase64 } from "file64";
import { readAndCompressImage } from "browser-image-resizer";

// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: STORE
import store from "@/store";

// TYPES
export type ImageUrl = string | ArrayBuffer | null;

export default {
  name: "EditLogo",

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "proceed", "showSuccess"],

  data() {
    return {
      // --> STATE <--

      chosenImageType: "",
      domain: "",

      imageUrl: null as ImageUrl,
      image: "" as string | ArrayBuffer,
      recreatedImage: "" as string | ArrayBuffer,

      imageLoading: false,
      proceedDisabled: true,
      sendingRequest: false
    };
  },

  computed: {
    currentImage() {
      return store.$customizationWorkspace.getWorkspaceLogo();
    },

    previewImageData(): ImageUrl | undefined {
      return this.image ? this.image : this.currentImage?.base64;
    },

    previewImageType(): ImageUrl | undefined {
      return this.chosenImageType
        ? this.chosenImageType
        : this.currentImage?.type;
    }
  },

  beforeMount() {
    return (this.domain = store.$globalConfig.getDomain());
  },

  methods: {
    // --> EVENT LISTENERS <--

    onPickFile() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },

    async onFilePicked(event: Event) {
      // Update confirm button as loading
      this.proceedDisabled = true;
      this.imageLoading = true;

      const files = (event.target as HTMLInputElement).files || [];

      let file = files[0] as File | null;

      if (file) {
        const fileType = file.type.split("/")[1];

        // Let the user know the format they chose is wrong
        if (
          !(fileType === "jpeg" || fileType === "png" || fileType === "gif")
        ) {
          BaseAlert.error(
            "Please choose an image in the right format",
            "Accepted formats: .jpeg, .png, .gif"
          );

          return;
        }

        this.chosenImageType = file.type;

        // Show image preview
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
          if (!fileReader.result) {
            BaseAlert.error("An error occurred", "Mind try again?");

            return;
          }

          this.imageUrl = fileReader.result;
        });

        fileReader.readAsDataURL(file);

        let resizedImage = null as Blob | File | null;

        if (fileType === "gif") {
          resizedImage = file;
        } else {
          resizedImage = await readAndCompressImage(file, {
            quality: 0.85,
            maxWidth: 512,
            maxHeight: 512,
            debug: true
          });
        }

        if (file) {
          // Encode to Base64
          let encodedResult = await fileToBase64(resizedImage);

          this.image = encodedResult.split(",")[1];

          // Enable proceed button
          this.imageLoading = false;
          this.proceedDisabled = false;
        } else {
          this.imageLoading = false;
        }
      }
    },

    async onProceed() {
      try {
        if (this.image && typeof this.image === "string") {
          this.sendingRequest = true;

          await store.$customizationWorkspace.updateWorkspaceIcon({
            base64: this.image,
            type: this.chosenImageType
          });

          // Reinitialize variables + close modal
          this.sendingRequest = false;

          this.onClose();

          // Make success notitification visible
          this.$emit("showSuccess");
        } else {
          throw new Error("No image");
        }
      } catch (_) {
        BaseAlert.error(
          "Could not change your logo",
          "Please upload a valid image"
        );
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
