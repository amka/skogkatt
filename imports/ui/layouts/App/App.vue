<template>
  <div class="app">

      <connection-alert v-model="showConnectionIssue"></connection-alert>

      <verify-email-alert
        v-if="!emailVerified"
        :userId="userId"
        :emailAddress="emailAddress"
        :emailVerified="emailVerified">
      </verify-email-alert>
      
      <v-app light transition="slide-y-transition">
        
        <navigation
          :isAuthenticated="isAuthenticated"
          :isLogging="isLogginIn">
        </navigation>
        
        <v-content>
          <v-container fluid fill-height>
            <transition name="fade-transition" mode="out-in">
              <loading v-if="loading"></loading>
              <router-view v-else></router-view>
            </transition>
          </v-container>
        </v-content>
        
      </v-app>
    </transition-group>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Loading from "/imports/ui/components/Loading";
import Navigation from "/imports/ui/components/Navigation";
import ConnectionAlert from "/imports/ui/components/ConnectionAlert";
import VerifyEmailAlert from "/imports/ui/components/VerifyEmailAlert";

export default {
  data: () => ({
    showConnectionIssue: false
  }),
  components: {
    Loading,
    Navigation,
    ConnectionAlert,
    VerifyEmailAlert,
  },
  created() {
    Meteor.setTimeout(() => {
      this.showConnectionIssue = true
      console.log(`Begin monitor connection -> ${this.showConnectionIssue}`)
    }, 5000)
  },
  computed: {
    isAuthenticated() {
      return Meteor.userId();
    },
    isLogginIn() {
      return Meteor.loggingIn();
    },
    loading() {
      return !this.$subscriptionsReady;
    },
    user() {
      return Meteor.user()
    },
    userId() {
      return Meteor.userId()
    },
    emailAddress() {
      return this.user && this.user.emails && this.user.emails[0].address
    },
    emailVerified() {
      return this.user && this.user.emails ? this.user && this.user.emails && this.user.emails[0].verified : true
    },
  }
};
</script>