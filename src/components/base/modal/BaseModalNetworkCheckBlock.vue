<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->
 <template lang="pug">
.c-base-modal-network-check-block
  .c-base-modal-network-check-block__top
    .c-base-modal-network-check-block__top--left
      .c-base-modal-network-check-block__label
        | {{ label.toUpperCase() }}

      .c-base-modal-network-check-block__header
        h4(
          :class=`[
            {
              "c-base-modal-network-check-block--blue": status === 'pending',
              "c-base-modal-network-check-block--green": status === 'sucess',
              "c-base-modal-network-check-block--yellow": status === 'warning',
              "c-base-modal-network-check-block--red": status === 'failed',

            }
          ]`
        )
          | {{ subtitle }}

        p
          | {{ description }}
    
    base-modal-status(
      status="sucess"
      :color="globalIconColor"
      :iconName="globalIconName"
    )

  .c-base-modal-network-check-block__details
    .c-base-modal-network-check-block__details--row(
      v-for="row in checkList"
      :class=`[
        "c-base-modal-network-check-block--" + colorCode(row.status, true)
      ]`
    )
      .c-base-modal-network-check-block__left(
        class="c-base-modal-network-check-block--flex"
      )
        base-icon(
          :name="getIconName(row.status)"
          class="c-base-modal-network-check-block__icon"
          :fill="colorCode(row.status)"
        )

        p
          | {{ row['checkpoint'] }}

      p
        | {{ getStatusDisplay(row.status) }}

</template>
 
 <!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->
 
<script lang="ts">
import BaseIcon from '../BaseIcon.vue';
import BaseModalStatus from './BaseModalStatus.vue';

export default {
  name: "Modal",

  components:{
    BaseIcon,
    BaseModalStatus
  },

  props: {
    status:{
      type: String,
      default:"sucess",

      validator(x: string) {
        return ["sucess", "pending", "failed", "warning"].includes(x);
      }
    },

    label: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    checkList: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    globalIconColor(){
      return this.colorCode(this.status)
    },

    globalIconName(){
      console.log('icon name', this.getIconName(this.status))
      return this.getIconName(this.status)
    },


  },

  watch: {

  },

  methods: {
    // <-- HELPERS -->
    capitalizeFirst(word: string){
      return word.charAt(0).toUpperCase() + word.slice(1)
    },
    
    colorCode(status: string, isString = false){
      let result = "";

      switch (status) {
        case "pending":
          result = isString ? "blue" : "#2490f0";
          break;
        case "sucess":
          result = isString ? "green" : "#05c02b";
          break;
        case "failed":
          result = isString ? "red" : "#dd2f2f";
          break;
        case "warning":
          result = isString ? "orange" : "#fc8227";
          break;
      }
      return result;
    },

    getIconName(status: string){
      let result = "";

      switch (status) {
        case "pending":
          return result = "archive";
        case "sucess":
          return result = "check.circle";
        case "failed":
          return result = "warning";
        case "warning":
          return result = "exclamation.circle";
        default:
          break;
      }
      return result;

    },

    getStatusDisplay(status: string){
      switch (status) {
        case "pending":
          return "Pending";
          
        case "sucess":
          if(this.label === "dns") {
            return "Record is valid";
          } else if (this.label === "tcp") {
            return "Port is open";
          } else {
            return "Connectivity is OK"
          }

        case "failed":
          if(this.label === "dns") {
            return "Record is not valid";
          } else if (this.label === "tcp") {
            return "Port is closed";
          } 

        case "warning":
          return "No address available";
      }
    }
  }
  }
 
 </script>
 
 <!-- **********************************************************************
   STYLE
   ********************************************************************** -->
 
<style lang="scss">
$c: ".c-base-modal-network-check-block";

// VARIABLES
$badge-padding-block: 3.5px;
$badge-padding-inline: 7px;

#{$c} {
  p {
    margin: 0;
  }

  h4 {
    color: $color-base-blue-normal;
    font-weight: $font-weight-bolder;
    font-size: ($font-size-baseline + 2px);
    margin-left: 0;
    margin-block-start: 0;
    margin-block-end: 7px;
  }

  #{$c}__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: 17px;

    &--left {
      display: flex;
      align-items: center;
    }
  }

  #{$c}__label {
    color: $color-text-secondary;
    font-size: ($font-size-baseline - 2px);
    padding-block: 3.5px;
    padding-inline: 7.5px;
    border: 1px solid $color-text-secondary;
    border-radius: 4px;
    margin-right: 19px;
    height: fit-content;
  }

  #{$c}__details {

    border-radius: 2px;
    border: 1px solid $color-border-primary;
    padding-block-start: 11px;
    padding-block-end: 5px;
    padding-inline-start: 20.5px;
    padding-inline-end: 28.5px;
    margin-left: 58px;

    &--row {
      display: flex;
      justify-content: space-between;
      margin-block-end: 9px;
    }
  }

  #{$c}__icon {
    margin-right: 9px;
  }

  &--flex {
    display: flex;
  }

  //<!-- WEIGHTS -->


  //<!-- COLORS -->
  &--blue {
    color: $color-base-blue-normal;
    font-size: ($font-size-baseline - 2px);

    #{$c}__left {
      color: $color-text-secondary;
      font-size: $font-size-baseline;
    }
  }

  &--green {
    color: $color-base-green-normal;
    font-size: ($font-size-baseline - 2px);
    
    #{$c}__left {
      color: $color-black;
      font-size: $font-size-baseline;
      font-weight: $font-weight-medium;
    }
  }

  &--red {
    color: $color-base-red-normal;
    font-size: ($font-size-baseline - 2px);
    font-weight: $font-weight-medium;

    
    #{$c}__left {
      color: $color-base-red-normal;
      font-size: $font-size-baseline;

    }
  }

  &--orange {
    color: $color-base-orange-normal;
    font-size: ($font-size-baseline - 2px);

    #{$c}__left {
      color: $color-text-secondary;
      font-size: $font-size-baseline;

    }
  }

}
</style>
 