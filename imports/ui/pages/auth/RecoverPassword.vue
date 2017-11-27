<template>
  <v-layout justify-center row wrap>
      <v-flex xs12 sm6 md4>
          <h1 class="headline">{{ $t('recoverPassword.title') }}</h1>

          <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field @keyup.native.enter="submit"
              :label="$t('auth.email')"
              v-model="email"
              :rules="rules.email"
              required>
            </v-text-field>

            <v-btn @click="submit" block color="primary">
              {{ $t('messages.save') }}
              <v-icon>arrow_right</v-icon>
            </v-btn>
          </v-form>
      </v-flex>
  </v-layout>  
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
export default {
  data: () => ({
    email: '',
    valid: false,
    rules: {
      email: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    }
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let payload = {
          email: this.email
        };
        Accounts.forgotPassword(payload, error => {
          if (error) {
            Bert.alert(error.reason, "danger");
          } else {
            Bert.alert(
              this.$t("auth.messages.checkEmailForReset", payload),
              "success"
            );
            this.$router.push({ name: "auth.signin" });
          }
        });
      }
    }
  }
};
</script>

