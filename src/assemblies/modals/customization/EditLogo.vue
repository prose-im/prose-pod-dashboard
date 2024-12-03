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
  position="center"
  title="Select new icon"
  buttonColor="purple"
  buttonLabel="Change icon"
  :disabled="proceedDisabled"
  @close="onClose"
  @confirm="onProceed"
)
  .a-edit-logo
    h4
      | New icon

    .a-edit-logo__upload
      base-avatar(
        :avatarDataUrl="imageUrl"
        class="a-edit-logo__upload--avatar"
        size="60px"
        borderRadius="7px"
        type="image"
      )

      .a-edit-logo__upload--left
        base-button(
          tint="white"
        )
          | Upload image...  

        input(
          type="file"
          class="a-edit-logo__input"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked"
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
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import FormField from "@/components/form/FormField.vue";
import store from "@/store";

// PACKAGES
import { fileToBase64 } from "file64";
import imageCompression from "browser-image-compression";

export default {
  name: "EditLogo",

  components: {
    BaseAvatar,
    BaseButton,
    BaseIcon,
    BaseModal,
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

      proceedDisabled: true,
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--
    async compressImage(imageFile) {
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.256,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        return compressedFile;
      } catch (error) {
        console.log(error);
      }
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },

    async onFilePicked(event) {
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
        this.imageUrl = fileReader.result;
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

      console.log("encoded file", file);
      // console.log("image after encoding", this.image);
      // console.log("type of image after encoding", typeof this.image);
    },

    // --> EVENT LISTENERS <--
    onProceed() {
      if (this.image) {
        store.$customizationWorkspace.updateWorkspaceIcon(this.image);

        // Reinitialize variables
        this.imageUrl = "";
        this.image = "";

        // Close modal
        this.$emit("close");
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
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-edit-logo";

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

    p {
      margin: 0;
      margin-block-start: 8px;
      margin-inline-start: 2px;
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
