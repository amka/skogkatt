<template>
  <v-layout justify-center align-center row wrap>
      <v-flex xs12 class="text-xs-center">
            <transition-group mode="out-in" name="fade-transition">
                <div v-if="isVerifying" key="isVerifying">
                    <h1 class="headline" >{{verifyIconTitle}}</h1>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
                <div v-else key="vElse">
                    <h1 class="headline">{{verifyIconTitle}}</h1>
                    <v-icon :color="verifyIconColor" large>{{verifyIconCode}}</v-icon>
                </div>
            </transition-group>
      </v-flex>
  </v-layout>
</template>

<script>
import { Accounts } from "meteor/accounts-base";
import { Bert } from "meteor/themeteorchef:bert";

export default {
  data: () => ({
    error: "",
    isVerifying: true
  }),
  computed: {
    verifyIconCode() {
      return !this.isVerifying && this.error ? "clear" : "done";
    },
    verifyIconTitle() {
      return !this.isVerifying && this.error
        ? this.error
        : this.$t("auth.messages.verifyEmailSuccess");
    },
    verifyIconColor() {
      return !this.isVerifying && this.error ? "error" : "success";
    }
  },
  created() {
    Accounts.verifyEmail(this.$route.params.token, error => {
      this.isVerifying = false;
      if (error) {
        Bert.alert(error.reason, "danger");
        this.error = this.$t("auth.messages.verifyEmailError", {
          error: error.reason
        });
      } else {
        setTimeout(() => {
          Bert.alert(this.$t("auth.messages.verifyEmailSuccess"), "success");
          this.$router.push({ name: "dashboard" });
        }, 1500);
      }
    });
  }
};
</script>
