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
      v-model="searchTerm"
      button-label="Add Custom Emoji"
      :click-handle="onInvitePeopleClick"
      placeholder-text="a custom emoji..."
    )

    emojis-reactions-row(
      :emoji-data="{}"
      :table-headers="['Image', 'Shortcut', 'Date added', 'Added by']"
    )

    emojis-reactions-row(
      v-for="(emoji, index) in allEmojis"
      :key="emoji.shortcut"
      :emoji-data="emoji"
      class="c-emojis-reactions-dashboard__users"
    )

  base-navigation-footer(
    v-if="!searchTerm"
    @navFooterUpdate="onChangePage"
    listing="reactions"
    :page="pageNumber"
    :total="totalEmojiNumber"
  )

<!-- Modals -->
add-custom-emoji(
  v-if="isAddEmojiModalVisible"
  @close="toggleAddEmojiModalVisible"
  :visible="addEmojiModalVisibility"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import AddCustomEmoji from "@/assemblies/modals/customization/AddCustomEmoji.vue";
import EmojisReactionsRow from "@/components/emojis-reactions/EmojisReactionsRow.vue";
import SearchBar from "@/components/search/SearchBar.vue";

// STORE
import store from "@/store";

export default {
  name: "EmojisReactionDashboard",

  components: {
    AddCustomEmoji,
    EmojisReactionsRow,
    SearchBar
  },

  data() {
    return {
      // --> STATE <--
      isAddEmojiModalVisible: false,

      addEmojiModalVisibility: false,

      searchTerm: "",

      pageNumber: 1
    };
  },

  computed: {
    allEmojis() {
      return store.$customizationEmojis.getEmojiList();
    },

    totalEmojiNumber() {
      return this.allEmojis.length;
    }
  },

  watch: {
    isAddEmojiModalVisible(newValue) {
      setTimeout(() => (this.addEmojiModalVisibility = newValue), 10);
    }
  },

  mounted() {
    store.$customizationEmojis.loadAllReactions();
  },

  methods: {
    // --> EVENT LISTENERS <--
    toggleAddEmojiModalVisible() {
      this.isAddEmojiModalVisible = !this.isAddEmojiModalVisible;
    },

    onInvitePeopleClick(): void {
      this.toggleAddEmojiModalVisible();
    },

    onChangePage(type: string) {
      if (type === "forth") {
        this.pageNumber += 1;
      } else if (type === "back") {
        if (this.pageNumber === 1) {
          return;
        } else {
          this.pageNumber -= 1;
        }
      }

      return;
    }
  }
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
