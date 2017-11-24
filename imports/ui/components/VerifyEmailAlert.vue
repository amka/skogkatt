<template>
    <v-alert :value="showVerifyEmailAlert"
        class="mt-0 mb-0 pa-2"
        color="info" 
        icon="priority_high"
        transition="slide-y-transition">
        <div>
          <span v-html="$t('auth.messages.verifyEmailAlert', {emailAddress})"></span>
          <v-btn flat small dark
            :disabled="resending"
            :loading="resending"
            @click.native="resendVerificationEmail">
            {{ $t('auth.resendVerificationEmail') }}
            <span slot="loader" class="custom-loader">
              <v-icon dark>cached</v-icon>
            </span>
          </v-btn>
        </div>
    </v-alert>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Bert } from "meteor/themeteorchef:bert";

export default {
  props: ["emailAddress", "emailVerified", "userId"],
  data: () => ({
    resending: false
  }),
  computed: {
    showVerifyEmailAlert() {
      return this.userId && !this.emailVerified;
    }
  },
  methods: {
    resendVerificationEmail() {
      this.resending = true
      Meteor.call("users.sendVerificationEmail", error => {
        if (error) {
          Bert.alert(error.reason, "danger");
        } else {
          Bert.alert(
            this.$t("auth.messages.verifyEmailCheck", {
              emailAddress: this.emailAddress
            }),
            "success"
          );
        }
        this.resending = false
      });
    }
  }
};
</script>
