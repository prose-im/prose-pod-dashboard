<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

  <template lang="pug">
    .c-base-subsection
      .c-base-subsection__label 
        h2 {{ title}}
        .c-base-subsection__restore 
          base-icon(
            class="c-base-subsection__restore--icon"
            name="restore"
            size="8px"
            fill="#2490f0"
          )
          | Restore defaults

      base-subsection-item(
        class="c-base-subsection__list"
        v-for="item in items"
        :item="item"
        :type="item.type"
      )

  </template>
    
  <!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->
  
  <script lang="ts">
  // PROJECT: COMPONENTS
  import BaseIcon from './BaseIcon.vue';
  import BaseSubsectionItem from './BaseSubsectionItem.vue';
  
  export default {
    name: "BaseSubsection",
  
    components: {
      BaseIcon,
      BaseSubsectionItem
    },
  
    props: {
      title:{
        type: String,
        required:true
      },
      items:{
        type: Array,
        required: true
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
  $c: ".c-base-subsection";
  
  #{$c} {
    font-family:$font-family-default;
    margin-top: 34.5px;
    margin-left: 38px;
    margin-right: 39px;

    #{$c}__label {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      margin-inline: 11px;
      margin-bottom: 16px;
      border-bottom: 1px solid $color-border-secondary;

      h2{
        font-size: $font-size-baseline + 6px;
        font-weight: $font-weight-bolder;
        padding-left: 10px;
        margin-block:0;


      }

      p{
        margin: 0;
      }

    }

    #{$c}__restore {
      height: fit-content;
      color:$color-base-blue-normal;
      font-size: $font-size-baseline - 1px;
      font-weight: $font-weight-medium;
      padding-top: 6px;
      padding-bottom: 3px;
      padding-right: 14.5px;

      &--icon{
        margin-right: 5px;
      }
    }

    #{$c}__list {
      &:nth-child(even) {
        background-color: $color-base-purple-ultra-light;
      }
    }
  }
  </style>
  

  <!--          -->