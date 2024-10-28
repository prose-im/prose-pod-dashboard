<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.c-base-identity-badge 
  base-icon(
    name="fake.logo"
    size="44px"
  )

  .c-base-identity-badge__server
    .c-base-identity-badge__server-title
      p(
        :class=`[
          "c-base-identity-badge__server-name",
          "c-base-identity-badge--semibold"
        ]`
      ) Crisp 
      
      p(
        :class=`[
          "c-base-identity-badge__server-description",
          "c-base-identity-badge--light"
        ]`
      ) &nbsp; | &nbsp;crisp.chat
      
    .c-base-identity-badge__details
      span 
        | Server 
        
      span.c-base-identity-badge--light 
        | v0.12.1 

      span 
        | + Pod 

      span.c-base-identity-badge--light 
        | v0.1.3
  
</template>
      
  <!-- **********************************************************************
    SCRIPT
    ********************************************************************** -->
    
  <script lang="ts">
  //COMPINENTS
  import BaseIcon from '../base/BaseIcon.vue'
  
  export default {
  name: "BaseIdentityBagde",
  
  components: {
    BaseIcon 
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
$c: ".c-base-identity-badge";

#{$c} {
  display:flex;
  align-items:center;
  font-family: $font-family-default;
  padding-inline-start: 6px;
  padding-inline-end: 31px;
  padding-block:6px;
  margin-top: 28px;
  margin-left: -6.5px;
  border-radius: 30px;
  border: solid 1px $color-border-secondary;
  box-shadow: 0 4px 4px 0 rgba($color-black, 0.01);

  #{$c}__server {
    height: fit-content;
    margin-left: 12px;

    &-title{
      display: flex;
      align-items: center;
    }

    &-name{
      font-size: $font-size-baseline + 1px,
    }

    &-description{
      color: $color-text-secondary;
      font-size: $font-size-baseline - 2px,
    }

    p{
      margin: 0px
    }

    span{
      font-size: $font-size-baseline - 1.5px,
    }

  }
  // --> WEIGHTS <--
  &--extra-light{
    font-weight: $font-weight-extra-light;
  }

    &--light{
    font-weight: $font-weight-light;
  }

  &--semibold{
    font-weight:$font-weight-medium;
  }
}

</style>