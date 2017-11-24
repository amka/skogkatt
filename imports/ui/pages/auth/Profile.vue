<template>
  <v-layout justify-center row wrap>
      <v-flex xs12 sm6 md4>
          <h1 class="headline">{{ $t('profile.title') }}</h1>

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs6 class="pr-2">
                <v-text-field @keyup.native.enter="submit"
                  :label="$t('auth.firstName')"
                  v-model="userProfile.firstName"
                  :rules="rules.firstName"
                  required>
                </v-text-field>
              </v-flex>

              <v-flex xs6 class="pl-2">
                <v-text-field @keyup.native.enter="submit"
                  :label="$t('auth.lastName')"
                  v-model="userProfile.lastName"
                  :rules="rules.lastName"
                  required>
                </v-text-field>
              </v-flex>
            </v-layout>

            <v-text-field @keyup.native.enter="submit"
              :label="$t('auth.email')"
              v-model="userProfile.email"
              :rules="rules.email"
              required>
            </v-text-field>

            <v-text-field @keyup.native.enter="submit"
              :label="$t('auth.oldPassword')"
              v-model="userProfile.currentPassword"
              :rules="rules.currentPassword"
              type="password" required>
            </v-text-field>

            <v-text-field @keyup.native.enter="submit"
              :label="$t('auth.newPassword')"
              v-model="userProfile.newPassword"
              :rules="rules.newPassword"
              type="password" required>
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
import { Meteor } from "meteor/meteor"
import { Accounts } from 'meteor/accounts-base'

const emptyProfile = {
  firstName: "",
  lastName: "",
  email: "",
  currentPassword: "",
  newPassword: ""
};

export default {
  data: () => ({
    subHandle: null,

    valid: false,
    rules: {
      email: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      firstName: [],
      lastName: [],
      currentPassword: [
        v => (v ? v.length >= 6 : true) || "Password must be more than 5 characters"
      ],
      newPassword: [
        v => (v ? v.length >= 6 : true) || "Password must be more than 5 characters"
      ]
    }
  }),
  created() {
    // You can define autorun's computation which runs for the life-span of the component.
    this.$autorun(computation => {
      // You can subscribe in the same way you would do in Blaze.
      // You can use this.$subscriptionsReady to have a reactive value which
      // is set to true once all subscriptions are ready.
      this.subHandle = this.$subscribe("users.editProfile", this.visibility);
    });
  },
  computed: {
    userProfile() {
      // This defines a reactive dependency on "subHandle" as well.
      if (!this.subHandle || !Meteor.user())
        return Object.assign({}, emptyProfile);
        
      // You can return Minimongo cursors directly. Make sure you use ":key" to _id in v-for directive.
      // In our case, we set ":key" to "todo._id".
      // "scopeQuery" is provided by peerlibrary:subscription-scope package.
      let user = Meteor.user();

      const userProfile = Object.assign({}, emptyProfile);
      userProfile.email = user.emails[0].address;
      userProfile.emailVerified = user.emails[0].verified;
      userProfile.firstName = user.profile.name.first;
      userProfile.lastName = user.profile.name.last;

      return userProfile;
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const payload = {
          emailAddress: this.userProfile.email,
          profile: {
            name: {
              first: this.userProfile.firstName,
              last: this.userProfile.lastName
            }
          }
        };

        Meteor.call("users.editProfile", payload, error => {
          if (error) {
            Bert.alert(error.reason, "danger");
          } else {
            Bert.alert("Profile updated!", "success");
          }
        });

        if (this.userProfile.newPassword) {
          Accounts.changePassword(
            this.userProfile.currentPassword,
            this.userProfile.newPassword,
            error => {
              if (error) {
                Bert.alert(error.reason, "danger");
              } else {
                this.userProfile.currentPassword = "";
                this.userProfile.newPassword = "";
              }
            }
          );
        }
      }
    }
  }
};
</script>
