<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
  .c-sidebar-header 
    base-icon(
      name="logo"
      size="20.8px"
      width="77px"
      :rectangular="true"
    )

    base-identity-badge

</template>
    
<!-- **********************************************************************
  SCRIPT
  ********************************************************************** -->
  
<script lang="ts">
//COMPINENTS
import BaseIcon from '../base/BaseIcon.vue'
import BaseIdentityBadge from '../base/BaseIdentityBadge.vue';

export default {
name: "SidebarHeader",

components: {
  BaseIcon,
  BaseIdentityBadge
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
$c: ".c-sidebar-header";

#{$c} {
  margin-bottom: 45px;


}

</style>