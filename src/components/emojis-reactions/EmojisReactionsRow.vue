<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-emojis-reactions-row(
  :class=`[
    {
      "c-emojis-reactions-row--header" : tableHeaders
    }
  ]`
)
    <!--  1st column -->
    form-checkbox(
      :class=`[
        "c-emojis-reactions-row__checkbox",
        {
          "c-emojis-reactions-row--hidden" : !emojiData.imageUrl
        }
      ]`
    )

    <!-- 2nd column -->
    base-avatar(
      v-if="!tableHeaders"
      class="c-emojis-reactions-row__image"
      :avatar-data-url="emojiData.imageUrl"
      size="30px"
      border-radius="0px"
    )
    p(
      v-else
      class="c-emojis-reactions-row__image"
    )
      | {{ tableHeaders[0] }}

    <!-- 3rd column -->
    .c-emojis-reactions-row__shortcut
        p.c-emojis-reactions-row--medium-bold {{ emojiData.shortcut }}

        p(
          v-if="tableHeaders"
        )
          | {{ tableHeaders[1] }}

    <!-- 4th column -->
    .c-emojis-reactions-row__date
      p(
        v-if="!tableHeaders"
        :class=`[
          "c-emojis-reactions-row--grey",
        ]`
      )
        | {{ emojiData.date }}

      p(
        v-else
        :class=`[
          "c-emojis-reactions-row__date--header"
        ]`
      )
        | {{ tableHeaders[2] }}

    <!-- 5th column -->
    .c-emojis-reactions-row__contributor(
      v-if="!tableHeaders"
    )
      base-avatar(
        :class=`[
          "c-emojis-reactions-row__contributor--avatar",
        ]`
        :avatar-data-url="emojiData.contributorAvatar"
        size="22px"
      )

      p
        | {{ emojiData.contributor }}

    p(
      v-else
    )
      | {{ tableHeaders[3] }}

    <!-- 6th column -->
    .c-emojis-reactions-row__parameters
      base-button(
        v-if="!tableHeaders"
        size="medium"
        tint="white"
        :square="true"
      )
        base-icon(
          name="gearshape.fill"
          size="10px"
          fill="#949EB1"
        )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import FormCheckbox from "@/components/form/FormCheckbox.vue";

export default {
  name: "EmojisReactionsRow",

  components: {
    BaseAvatar,
    BaseButton,
    BaseIcon,
    FormCheckbox,
  },

  props: {
    emojiData: {
      type: Object,
      required: true,
    },

    tableHeaders: {
      type: Array,
      default: null,
    },
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-emojis-reactions-row";

#{$c} {
  display: flex;
  align-items: center;
  padding-inline: 29px;
  padding-block: 14.5px;
  font-family: $font-family-default;
  font-size: ($font-size-baseline - 1.5px);

  #{$c}__checkbox {
    margin-right: 28px;
  }

  #{$c}__image {
    margin-right: 67px;
    min-width: 30px;
  }

  #{$c}__shortcut {
    min-width: 152px;
  }

  #{$c}__date {
    min-width: 210px;
    font-weight: $font-weight-light;

    &--header {
      font-weight: $font-weight-regular;
      min-width: 210px;
    }
  }

  #{$c}__contributor {
    display: flex;
    align-items: center;
    min-width: 27%;
    margin-right: 10%;

    &--avatar {
      margin-right: 9px;
    }
  }

  #{$c}__parameters {
    margin-bottom: 1px;

    &--button {
      margin: 0;
      padding-inline: 18px;
    }
  }

  p {
    margin-block: 0;
  }

  //STYLE
  &--medium-bold {
    color: $color-text-primary;
    font-weight: $font-weight-medium;
    font-size: ($font-size-baseline - 1px);
    margin-top: 0;
    margin-bottom: 5.5px;
  }

  &--grey {
    color: $color-text-secondary;
  }

  &--header {
    color: $color-text-secondary;
    font-size: ($font-size-baseline - 1px);
    font-weight: $font-weight-mid;
    border-block: 1px solid $color-border-primary;
    padding-block: 0;

    p {
      line-height: 13px;
      margin-block: 11px;
    }
  }

  //<!-- COLORS -->
  &--yellow {
    background-color: $color-base-yellow-light;
    padding-block: 11.5px;
  }

  //<!-- DISPLAYS -->
  &--hidden {
    visibility: hidden;
    height: 0;
  }

  &--none {
    display: none;
  }
}
</style>
