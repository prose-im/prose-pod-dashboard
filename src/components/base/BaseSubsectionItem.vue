<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
div(
  :class=`[
    "c-base-subsection-item",
    "c-base-subsection-item--" + color
  ]`
)
  .c-base-subsection-item__left
    h3(
      :class=`[
        "c-base-subsection-item__subtitle",
        {
          "c-base-subsection-item__subtitle--restore": item.restoreSubtitle,
        }
      ]`
    )
      | {{ item.subtitle }}

      base-icon(
        v-if="item.restoreSubtitle"
        class="c-base-subsection-item__subtitle--icon"
        name="restore"
        size="8px"
        fill="#2490f0"
      )

    p.c-base-subsection-item__description 
      | {{ item.description}}

  p(
    v-if="item.slot === 'text'"
    class="c-base-subsection-item__slot"
  )
    | {{ item.slotData }}

  base-avatar(
    v-if="item.slot === 'avatar'"
    :avatarDataUrl="item.slotData"
    size="40px"
    borderRadius="20px"
    :class=`[
      "c-base-subsection-item__slot",
      "c-base-subsection-item__slot--avatar"
    ]`
  )

  form-toggle(
    v-if="type === 'toggle'"
    v-model="state"
  )

  base-button(
    v-if="type === 'button'"
    :size="item.typeProps?.size"
    :tint="buttonColor"
    @click="$emit('click')"
  )  
    | {{item.typeProps?.label}}

  form-select(
    v-if="(type === 'select') || type === 'doubleSelect'"
    :search="false"
    size="medium"
    :options="item.typeProps?.options"
    position="bottom"
  )

  form-select(
    v-if="type === 'doubleSelect'"
    :search="false"
    size="medium"
    :options="item.typeProps?.secondOptions"
    position="bottom"
  )
    
</template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAvatar from "./BaseAvatar.vue";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import FormSelect from "../form/FormSelect.vue";
import FormToggle from "../form/FormToggle.vue";

export default {
  name: "BaseSubsectionItem",

  components: {
    BaseAvatar,
    BaseButton,
    BaseIcon,
    FormSelect,
    FormToggle,
  },

  props: {
    modelValue: {
      type: String || Boolean,
      default: null
    },

    item: {
      type: Object,
      required: true,
    },

    type: {
      type: String,
      required:true,

      validator(x: string) {
        return ["toggle", "button", "select"].includes(x);
      }
    },

    color: {
      type: String,
      default: "bw",

      validator(x: string) {
        return ["bw", "redShell", "redBackground", "bwPurple"].includes(x);
      }
    },
  },

  emits: ["click", "update:modelValue"],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    buttonColor() {
      switch (this.color) {
        case 'bw':
          return 'white';
        case 'bwPurple':
          return 'purple';
        case 'redBackground':
          return 'red';
        case 'redShell':
          return 'red';
        default:
          return 'white';
      }
    },

    state: {
      get() {
        return this.modelValue;
      },

      set(nextValue: string) {
        console.log(this.modelValue)
        this.$emit("update:modelValue", nextValue);
      },
    }

  },

  watch: {

  },

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
$c: ".c-base-subsection-item";

#{$c} {
  display: flex;
  align-items: center;
  font-family: $font-family-default;
  padding-inline: 22px;
  padding-block: 11.5px;

  #{$c}__left {
    width: 100%;
  }

  #{$c}__subtitle {
    margin: 0;
    margin-bottom: 8px;
    font-size: $font-size-baseline;
    font-weight: $font-weight-medium;

    &--restore {
      color:$color-base-blue-normal;
    }

    &--icon {
      margin-left: 3.5px;
    }
  }

  #{$c}__description {
    max-width: 78%;
    margin: 0;
    color: $color-text-secondary;
    font-size: $font-size-baseline - 1px;
  }

  #{$c}__slot { 
    font-size: ($font-size-baseline - 4px);
    font-weight: $font-weight-medium;
    margin-inline-end: 20px;

    &--avatar{
      outline: 1px solid $color-border-primary;
      outline-offset: 1px;
    }
  }  

  // <!-- COLORS -->
  &--redBackground {
    background-color: rgba($color-base-red-normal, 0.06);
    #{$c}__subtitle {
      color: $color-base-red-normal;
    }
  }

  &--redShell {
    color: $color-base-red-normal;

    #{$c}__description {
      color: $color-base-red-normal;
    }
  }


}
</style>
