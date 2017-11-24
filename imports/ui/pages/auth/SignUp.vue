<template>
  <v-layout justify-center align-start row wrap>
    <v-flex xs12 sm4 md6 lg4>
      <h1 class="headline">Sign Up</h1>

      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field label="Email" v-model="email"
          @keyup.native.enter="submit"
          :rules="emailRules" required>
        </v-text-field>

        <v-text-field label="Password" v-model="password"
          @keyup.native.enter="submit"
          type="password" :rules="passwordRules" required>
        </v-text-field>

        <v-checkbox v-model="agreement" :rules="agreementRules"required>
          <template slot="label">
            Accept 
            <router-link to='/terms'>Terms of Service</router-link> and
            <router-link to='/agreement'>Agreement</router-link>
          </template>
        </v-checkbox>

        <v-btn @click="submit" :disabled="!valid" block color="primary">
          Proceed <v-icon>arrow_right</v-icon>
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Bert } from "meteor/themeteorchef:bert";

export default {
  data: () => ({
    valid: false,
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must be more than 5 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    agreement: false,
    agreementRules: [v => !!v || "You must agree Terms of Service"]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        console.log({
          password: this.password,
          email: this.email,
          agreement: this.agreement
        });

        Accounts.createUser(
          {
            email: this.email,
            password: this.password,
            profile: {
            }
          },
          error => {
            if (error) {
              Bert.alert(error.reason, "danger");
            } else {
              Meteor.call("users.sendVerificationEmail");
              Bert.alert("Welcome!", "success");
              this.$router.push({ name: "index" });
            }
          }
        );
      }
    }
  }
};
</script>

