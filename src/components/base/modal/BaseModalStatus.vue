<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->
 <template lang="pug">
  .c-base-modal-status
    base-icon(
      :name="iconName"
      :fill="iconColor"
      class="c-base-modal-status__icon"
    )

    p(
      :style=`{
        color: iconColor,
      }`
    )
      | {{ label }}
</template>
 
 <!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->
 
<script lang="ts">
import BaseIcon from '../BaseIcon.vue';

export default {
  name: "Modal",

  components:{
    BaseIcon
  },

  props: {
    status:{
      type: String,
      default:"checking",

      validator(x: string) {
        return ["cheking", "verified", "warning", "issue"].includes(x);
      }
    },
  },

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    iconName(){
      switch (this.status) {
        case "checking":
          return "";
        case "verified":
          return "check.circle";
        case "warning":
          return "exclamation.circle";
        case "issue":
          return "warning";
        default:
          break;
      }
    },

    iconColor(){
      switch (this.status) {
        case "checking":
          return "#2490f0";
        case "verified":
          return "#05c02b";
        case "warning":
          return "#fc8227";
        case "issue":
          return "#dd2f2f";
        default:
          break;
      }
    },

    label(x:string){
      if (this.status === 'checking') {
        const result = this.capitalizeFirst(this.status) + '...';
        return result;

      } else {
        const result = this.capitalizeFirst(this.status);
        return result;
      }

    }
  },

  watch: {

  },

  methods: {
    // <-- HELPERS -->
    capitalizeFirst(word: string){
      return word.charAt(0).toUpperCase() + word.slice(1)
    }  
    }
  }
 
 </script>
 
 <!-- **********************************************************************
   STYLE
   ********************************************************************** -->
 
<style lang="scss">
$c: ".c-base-modal-status";

#{$c} {
  display: flex;

  #{$c}__icon {
    margin-inline-end: 5px;
  }
}
</style>
 