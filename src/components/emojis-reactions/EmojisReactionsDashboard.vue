<!--
* This file is part of prose-app-web
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
      buttonLabel="Add Custom Emoji"
      :clickHandle="onInvitePeopleClick"
      placeholderText="a custom emoji..."
    )

    emojis-reactions-row(
      :emojiData="{}"
      :tableHeaders="['Image', 'Shortcut', 'Date added', 'Added by']"
    )

    emojis-reactions-row(
      v-for="(emoji, index) in emojis"
      :key="emoji.shortcut"
      :emojiData="emoji"
      class="c-emojis-reactions-dashboard__users"
    )

  base-navigation-footer

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
import AddCustomEmoji from '@/assemblies/modals/customization/AddCustomEmoji.vue';
import BaseNavigationFooter from '@/components/base/BaseNavigationFooter.vue';
import EmojisReactionsRow from '@/components/emojis-reactions/EmojisReactionsRow.vue';
import SearchBar from '@/components/search/SearchBar.vue';

export default {
  name: "EmojisReactionDashboard",

  components: {
    AddCustomEmoji,
    BaseNavigationFooter,
    EmojisReactionsRow,
    SearchBar
  },

  props: {
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      isModalVisible:false,
      
      emojis:[
        {
          imageUrl:"https://i.pinimg.com/736x/24/0d/22/240d22bf3aeda750fca5c00d2dfbf72a.jpg",
          shortcut:":excellent:",
          date:"11 November 2012",
          contributor: "Valerian Saliou",
          contributorAvatar: "https://avatars.githubusercontent.com/u/1451907?v=4"
        },
        {
          imageUrl:"Baptiste Jamin",
          shortcut:":excellent:",
          date:"11 November 2012",
          contributor: "Valerian Saliou",
          contributorAvatar: "https://avatars.githubusercontent.com/u/1451907?v=4"
        },
        {
          imageUrl:"Baptiste Jamin",
          shortcut:":excellent:",
          date:"11 November 2012",
          contributor: "Valerian Saliou",
          contributorAvatar: "https://avatars.githubusercontent.com/u/1451907?v=4"
        },
      ],
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> EVENT LISTENERS <--
    toggleModalVisible(){
      this.isModalVisible = !this.isModalVisible;
    },

    onInvitePeopleClick(event: Event): void {
      this.toggleModalVisible()
    },
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
