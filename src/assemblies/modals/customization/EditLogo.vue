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
  :loading="imageLoading"
  :visible="visibility"
  position="center"
  title="Select new icon"
  button-color="purple"
  button-label="Change icon"
)
  .a-edit-logo
    h4
      | New icon

    .a-edit-logo__upload
      base-avatar(
        :avatar-type="chosenImageType"
        :avatar-data="chosenImageData"
        :name="domain"
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
import { readAndCompressImage } from "browser-image-resizer";

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
      imageUrl: null as ImageUrl,

      image: "" as string | ArrayBuffer,

      imageLoading: false,

      domain: "",

      proceedDisabled: true,

      recreatedImage: "" as string | ArrayBuffer
    };
  },

  computed: {
    currentImage() {
      return store.$customizationWorkspace.getWorkspaceLogo()?.base64;
    },

    chosenImageType() {
      // TODO: put correct type here
      return "image/png";
    },

    chosenImageData(): ImageUrl | undefined {
      return this.image ? this.image : this.currentImage;
    }
  },

  beforeMount() {
    return (this.domain = store.$globalConfig.getDomain());
  },

  methods: {
    // --> HELPERS <--
    onPickFile() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },

    async onFilePicked(event: Event) {
      // Update confirm button as loading
      this.proceedDisabled = true;
      this.imageLoading = true;

      const files = (event.target as HTMLInputElement).files || [];
      let file = files[0] as File | null;
      console.log("files", files);

      if (file) {
        const fileType = file.type.split("/")[1];

        // Let the user know the format they chose is wrong
        if (
          !(
            fileType === "jpeg" ||
            fileType === "png" ||
            fileType === "gif" ||
            fileType === "webp"
          )
        ) {
          BaseAlert.error(
            "Please choose an image in the right format",
            "Accepted formats: .jpeg, .png, .gif, .webp"
          );
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
            console.log("imagUrl from reader", this.imageUrl);
          }
        });

        fileReader.readAsDataURL(file);

        let resizedImage = await readAndCompressImage(file, {
          quality: 0.85,
          maxWidth: 512,
          maxHeight: 512,
          debug: true
        });

        if (file) {
          // Encode to base64
          let encodedResult = await fileToBase64(resizedImage);

          // Remove unnecessary 'data:image/**;base64'
          // TODO: obtain type from file.type or else
          this.image = encodedResult.split(",")[1];

          // Enable proceed button
          this.imageLoading = false;
          this.proceedDisabled = false;
        } else {
          this.imageLoading = false;
        }
      }
    },

    // --> EVENT LISTENERS <--
    async onProceed() {
      if (this.image && typeof this.image === "string") {
        try {
          console.log("new logo length", this.image.length);
          await store.$customizationWorkspace.updateWorkspaceIcon({
            base64: this.image,
            type: this.chosenImageType
          });

          // Reinitialize variables + close modal
          this.onClose();

          //Make success Notitification Visible
          this.$emit("showSuccess");
        } catch (e) {
          console.error("logo lad error", e);
        }
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
