<template>
  <v-layout justify-center align-start row wrap>
    <v-flex xs12 sm4 lg4 class="text-xs-center mt2">
      <p class=" mt-4">
      <img src="/static/skogkatt_logo_white.svg" :alt="appTitle" width="128" />
      </p>
      <h2 class="headline mb-4">Stay safe out there.</h2>
      <p>Don't forget to like and follow Skogkatt elsewhere on the web:</p>
      <ul>
        <li><a href="https://facebook.com/skogkatt"><img src="/facebook.svg" width="24" /></a></li>
        <li><a href="https://twitter.com/skogkatt"><img src="/google.svg" width="24" /></a></li>
        <li><a href="https://github.com/skogkatt"><img src="/github.svg" width="24" /></a></li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
import { Meteor } from "meteor/meteor";
export default {
  data: () => ({
    appTitle: Meteor.settings.public.appTitle
  }),
  mounted() {
    Meteor.logout();
  }
};
</script>

<style scoped>
ul {
  display: inline-flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
}

ul li {
  list-style-type: none;
}
</style>

