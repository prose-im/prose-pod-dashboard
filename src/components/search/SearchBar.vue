<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
  .c-search-bar
    .c-search-bar__content
      form-field(
        type="text"
        placeholder="Search for"
        align="left"
      )

      .c-search-bar__right
        base-button(
          tint="purple"
          size="large"
        )
          | {{buttonLabel}}

        base-button(
          class="c-search-bar__more"
          tint="grey"
          size="large"
          :square="true"
        )
          base-icon(
            name="more.dots"
          )


</template>
    
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import BaseButton from '../base/BaseButton.vue';
import BaseIcon from '../base/BaseIcon.vue';
import FormField from '../form/FormField.vue';

export default {
  name: "SearchBar",

  components: {
    BaseButton,
    BaseIcon,
    FormField
  },

  props: {
    buttonLabel:{
      type:String,
      required:true
    }
  },

  emits: ["addContact"],

  data() {
    return {
      // --> STATE <--

    };
  },

  computed: {

  },

  watch: {

  },

  created() {
    
  },

  methods: {
    // --> HELPERS <--
  }
};
</script>
    
<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-search-bar";

#{$c} {
  #{$c}__content {
    font-family: $font-family-default;
    display: flex;
    justify-content: space-between;
    padding: 22px 29px;
  }

  #{$c}__right {
    display: flex;
  }

  #{$c}__more {
    margin-left:8px ;
  }
}
</style>