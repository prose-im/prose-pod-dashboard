<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
  .c-sidebar-footer
    .c-sidebar-footer__left
      base-avatar(
        avatarDataUrl="https://avatars.githubusercontent.com/u/1451907?v=4"
      )

    .c-sidebar-footer__center
      p Valerian Saliou

      base-badge

    .c-sidebar-footer__right
      base-button(
        tint="light"
        size="medium"
      )
        | Logout

</template>
    
<!-- **********************************************************************
  SCRIPT
  ********************************************************************** -->
  
<script lang="ts">
//COMPINENTS
import BaseAvatar from '../base/BaseAvatar.vue';
import BaseButton from '../base/BaseButton.vue';
import BaseBadge from '../base/BaseBadge.vue';
import FormSelect from '../form/FormSelect.vue';

export default {
name: "SidebarAccordion",

components: {
  BaseAvatar,
  BaseBadge,
  BaseButton,
  FormSelect
},

props: {
},

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
$c: ".c-sidebar-footer";

#{$c} {
  display: flex;
  align-items: center;

  #{$c}__left {
    margin-right: 13px;
  }

  #{$c}__center {
    text-align:left;
    margin-right:51px;
    p {
      margin-top: 0px;
      margin-bottom: 5.5px;
      font-weight: $font-weight-medium;
      font-size: ($font-size-baseline - 1.5px);
      font-family: $font-family-default;
      line-height:11px;
    }
  }
}

</style>