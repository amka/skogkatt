<template>
  <v-layout justify-center row wrap>
      <v-flex xs12 sm6 md4>
          <h1 class="headline">{{ $t('resetPassword.title') }}</h1>

          <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field @keyup.native.enter="submit"
                :label="$t('auth.newPassword')"
                v-model="newPassword"
                :rules="rules.newPassword"
                type="password"
                required>
              </v-text-field>

              <v-text-field @keyup.native.enter="submit"
                :label="$t('auth.repeatPassword')"
                v-model="repeatNewPassword"
                :rules="rules.repeatNewPassword.concat([() => repeatNewPassword == newPassword || $t('auth.messages.passwordNotMatch')])"
                type="password"
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
    newPassword: '',
    repeatNewPassword: '',
    valid: false,
    rules: {
      newPassword: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Use at least six characters, please"
      ],
      repeatNewPassword: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Use at least six characters, please",
        //  => v == newPassword || "Hmm, your passwords don\'t match. Try again?",
      ],
    }
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate() && this.newPassword == this.repeatNewPassword) {
        
        Accounts.resetPassword(this.$route.params.token, this.newPassword, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert(this.$t('auth.messages.passwordUpdated'), 'success');
            this.$router.push({name: 'dashboard'});
          }
        });
      }
    }
  }
};
</script>

