<template>
  <v-toolbar color="primary" dark app>
    <!-- <v-toolbar-side-icon v-if="isAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
  
    <v-toolbar-title>
      <router-link :to="{name: 'index'}">
        <v-icon>dashboard</v-icon>
        <!-- <img src="/static/skogkatt_white_logo.svg" height="30" :alt="appTitle" /> -->
      </router-link>
      {{appTitle}}
    </v-toolbar-title>
   
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'example-page'}">{{ $t('examplePage.title') }}</v-btn>
    </v-toolbar-items>

    <authenticated-navigation v-if="isAuthenticated" :isLogging="isLogging"></authenticated-navigation>
    <public-navigation v-else :isLogging="isLogging"></public-navigation>
  </v-toolbar>
</template>

<script>
import { Meteor } from "meteor/meteor";
import AuthenticatedNavigation from "./AuthenticatedNavigation";
import PublicNavigation from "./PublicNavigation";

export default {
  props: ["isAuthenticated", "isLogging"],
  data: () => ({
    appTitle: Meteor.settings.public.appTitle
  }),
  components: {
    PublicNavigation,
    AuthenticatedNavigation
  }
};
</script>

<style>
.toolbar__title {
  font-weight: 400;
  margin-right: 10px;
}
.toolbar__title img {
  vertical-align: bottom;
}

.navigation {
  height: inherit;
  display: flex;
  flex: 1;
}
</style>
