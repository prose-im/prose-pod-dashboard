<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-base-modal-information
  base-icon(
    class="c-base-modal-information--icon"
    name="info.circle"
    height="20px"
    width="21.5px"
  )

  p
    | {{ text }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseModalInformation",

  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal-information";

#{$c} {
  display: flex;
  align-items: center;
  font-weight: $font-weight-light;
  margin-top: 28px;
  margin-bottom: 42px;
  margin-left: 9px;
  font-size: ($font-size-baseline - 1px);

  p {
    margin: 0;
  }

  &--icon {
    flex: none;
    margin-right: 13px;
  }
}
</style>
