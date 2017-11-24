<template>
  <v-alert :value="value && !connected" color="warning"
        class="mt-0 mb-0 pa-2"
        icon="priority_high"
        transition="slide-y-transition">
        {{ $t('messages.connectionIssue') }}
        <span class="custom-loader d-inline-block">
            <v-icon light>cached</v-icon>
        </span>
    </v-alert>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  props: ["value"],
  computed: {
    connected() {
      return this.value & Meteor.status().connected;
    }
  }
};
</script>
