<template>
  <v-layout justify-center align-start row wrap>
    <v-flex xs12 sm4 lg4>
      <h1 class="headline">Sign In</h1>

      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field label="Email" v-model="email"
          @keyup.native.enter="submit"
          :rules="emailRules" required>
        </v-text-field>

        <v-text-field label="Password" v-model="password"
          @keyup.native.enter="submit"
          type="password"
          :rules="passwordRules" required>
        </v-text-field>

        <v-btn @click="submit" :disabled="!valid" block color="primary">
          Proceed <v-icon>arrow_right</v-icon>
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
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
    ]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        Meteor.loginWithPassword(this.email, this.password, error => {
          if (error) {
            Bert.alert(error.reason, "danger");
          } else {
            Bert.alert("Welcome back!", "success");

            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push({ name: "dashboard" });
            }
          }
        });
      }
    }
  }
};
</script>

