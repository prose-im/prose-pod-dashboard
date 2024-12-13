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
    .c-emojis-reactions-row__image
      base-avatar(
        v-if="!tableHeaders"
        :avatar-data-url="emojiData.imageUrl"
        size="30px"
        border-radius="0px"
      )

      p(
        v-else
      )
        | {{ tableHeaders[0] }}

    <!-- 3rd column -->
    .c-emojis-reactions-row__shortcut
      p.c-emojis-reactions-row--medium-bold(
        v-if="!tableHeaders"
      )
        | {{ emojiData.shortcut }}

      p(
        v-else
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
    )

      base-avatar(
        v-if="!tableHeaders"
        :class=`[
          "c-emojis-reactions-row__contributor--avatar",
        ]`
        :avatar-data-url="emojiData.contributorAvatar"
        size="22px"
      )

      p(
        v-if="!tableHeaders"
      )
        | {{ emojiData.contributor }}

      p(
        v-else
        class="c-emojis-reactions-row__contributor"
      )
        | {{ tableHeaders[3] }}

    <!-- 6th column -->
    .c-emojis-reactions-row__parameters
      base-button(
        :class=`[
          {
            "c-emojis-reactions-row--hidden" : tableHeaders
          }
        ]`
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
import FormCheckbox from "@/components/form/FormCheckbox.vue";

export default {
  name: "EmojisReactionsRow",

  components: {
    FormCheckbox
  },

  props: {
    emojiData: {
      type: Object,
      required: true
    },

    tableHeaders: {
      type: Array,
      default: null
    }
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
  }
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
  font-size: ($font-size-baseline - 1.5px);

  #{$c}__checkbox {
    border: 1px solid red;
    min-width: 24px;
    max-width: 46px;
    margin-right: 10px;
    flex: 1 1 0;
  }

  #{$c}__image {
    border: 1px solid red;
    min-width: 30px;
    max-width: 82px;
    margin-right: 10px;
    flex: 1 1 0;
    overflow: hidden;
    text-overflow: ellipsis;

    p {
      margin-block: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  #{$c}__shortcut {
    border: 1px solid red;
    min-width: 70px;
    max-width: 142px;
    margin-right: 10px;
    flex: 1 1 0;

    p {
      margin-block: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  #{$c}__date {
    border: 1px solid red;
    min-width: 50px;
    max-width: 193px;
    margin-right: 10px;
    white-space: nowrap;
    flex: 1 1 0;
    font-weight: $font-weight-light;
    overflow: hidden;

    &--header {
      font-weight: $font-weight-regular;
    }

    p {
      margin-block: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  #{$c}__contributor {
    border: 1px solid red;

    display: flex;
    align-items: center;
    min-width: 100px;
    max-width: 36%;
    margin-right: 10px;
    flex: 1 1 0;
    white-space: nowrap;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--avatar {
      margin-right: 9px;
      flex: none;
    }
  }

  #{$c}__parameters {
    border: 1px solid red;
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
      width: fit-content;
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
