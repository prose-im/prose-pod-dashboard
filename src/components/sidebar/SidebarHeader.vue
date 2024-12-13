<!--
 * This file is part of prose-pod-dashboard
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
    size="20.5px"
    width="77px"
    :rectangular="true"
  )

  base-identity-badge

</template>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-sidebar-header";

#{$c} {
  margin-bottom: 45px;
}
</style>
