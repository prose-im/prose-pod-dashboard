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
      .c-search-bar__left
        base-icon(
          size="14px"
          name="magnifying.glass"
          fill="#949eb1"
          class="c-search-bar__magnifying"
        )
        form-field(
          type="text"
          :placeholder="'Search for' + ' ' + placeholderText"
          align="left"
          class="c-search-bar__field"
        )

      .c-search-bar__right
        base-button(
          tint="purple"
          size="large"
          @click="clickHandle"
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
            fill="#949EB1"
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
    },

    clickHandle:{
      type: Function,
      required:true
    },

    placeholderText: {
      type: String,
      default: ''
    },
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

  #{$c}__left {
    position: relative;
  }

  #{$c}__magnifying{
    position: absolute;
    left: 21px;
    top:35.5%;
    z-index: 10;
  }

  #{$c}__field {
    position: relative;
    z-index: 0;
  }

  #{$c}__right {
    display: flex;
  }

  #{$c}__more {
    margin-left:8px ;
  }


}
</style>