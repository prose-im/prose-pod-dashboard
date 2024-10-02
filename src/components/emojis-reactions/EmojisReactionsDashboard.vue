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
    search-bar(
      buttonLabel="Add Custom Emoji"
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

</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import EmojisReactionsRow from './EmojisReactionsRow.vue';
import SearchBar from '@/components/search/SearchBar.vue';

export default {
  name: "MembersInvitesDashboard",

  components: {
    EmojisReactionsRow,
    SearchBar
  },

  props: {

  },

  emits: [],

  data() {
    return {
      // --> STATE <--

      
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
    // --> HELPERS <--
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-emojis-reactions-dashboard";

#{$c} {

  #{$c}__users {

    &:nth-child(even) {
      background-color: $color-base-purple-ultra-light;
    }
  }
}
</style>
