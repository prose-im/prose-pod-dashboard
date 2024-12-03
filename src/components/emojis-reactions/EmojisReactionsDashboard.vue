<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-emojis-reactions-dashboard
  .c-emojis-reactions-dashboard__upper
    search-bar(
      button-label="Add Custom Emoji"
      :click-handle="onInvitePeopleClick"
      placeholder-text="a custom emoji..."
    )

    emojis-reactions-row(
      :emoji-data="{}"
      :table-headers="['Image', 'Shortcut', 'Date added', 'Added by']"
    )

    emojis-reactions-row(
      v-for="(emoji, index) in emojis"
      :key="emoji.shortcut"
      :emoji-data="emoji"
      class="c-emojis-reactions-dashboard__users"
    )

  base-navigation-footer

<!-- Modal -->
add-custom-emoji(
  :visible="isModalVisible"
  @close="toggleModalVisible"
  @confirm=""
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import AddCustomEmoji from "@/assemblies/modals/customization/AddCustomEmoji.vue";
import BaseNavigationFooter from "@/components/base/BaseNavigationFooter.vue";
import EmojisReactionsRow from "@/components/emojis-reactions/EmojisReactionsRow.vue";
import SearchBar from "@/components/search/SearchBar.vue";

// STORE
import store from "@/store";

export default {
  name: "EmojisReactionDashboard",

  components: {
    AddCustomEmoji,
    BaseNavigationFooter,
    EmojisReactionsRow,
    SearchBar,
  },

  props: {},

  emits: [],

  data() {
    return {
      // --> STATE <--
      isModalVisible: false,
    };
  },

  computed: {
    emojis() {
      return store.$customizationEmojis.getEmojiList();
    },
  },

  watch: {},

  mounted() {
    store.$customizationEmojis.loadAllReactions();
  },

  methods: {
    // --> EVENT LISTENERS <--
    toggleModalVisible() {
      this.isModalVisible = !this.isModalVisible;
    },

    onInvitePeopleClick(): void {
      this.toggleModalVisible();
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-emojis-reactions-dashboard";

#{$c} {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  height: 100%;

  #{$c}__users {
    &:nth-child(even) {
      background-color: $color-base-purple-ultra-light;
    }
  }
}
</style>
